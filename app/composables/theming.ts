export class Theme {
    #slates!: Ref<Record<ThemeShade, Slate>>
    #colors!: Ref<Record<ThemeColor, ThemeShadeTintExtended>>
    #colorsDark!: Ref<Record<ThemeColor, ThemeShadeTintExtended>>
    #others!: Ref<Record<ThemeOther, string | number>>
    #lsSlates = 'hotpot-slates'
    #lsColors = 'hotpot-colors'
    #lsOthers = 'hotpot-others'

    get slates() {
        return this.#slates.value
    }

    get slatesRef() {
        return this.#slates
    }

    get colors() {
        return this.#colors.value
    }

    get colorsDark() {
        return this.#colorsDark.value
    }

    get others() {
        return this.#others.value
    }

    init() {
        const storedShades = localStorage.getItem(this.#lsSlates)
        const storedColors = localStorage.getItem(this.#lsColors)
        const storedOthers = localStorage.getItem(this.#lsOthers)

        const slates: SlateJSON = storedShades ? JSON.parse(storedShades) : defaultSlates
        const colors: Record<'light' | 'dark', Record<ThemeColor, ThemeShadeTintExtended>> = storedColors ? JSON.parse(storedColors) : { light: { ...defaultColors }, dark: { ...defaultColorsDark } }
        const others: Record<ThemeOther, string | number> = storedOthers ? JSON.parse(storedOthers) : { ...defaultOthers }

        this.#slates = ref(this.copySlates(slates))

        this.#colors = ref(colors.light)
        this.#colorsDark = ref(colors.dark)

        this.#others = ref(others)

        this.applySlates()
        this.applyColors()
        this.applyOthers()
    }

    setOther(key: ThemeOther, value: string | number) {
        console.log(key, value)
        this.#others.value[key] = value
        this.applyOthers(key)
        localStorage.setItem(this.#lsOthers, JSON.stringify(this.#others.value))
    }

    applySlates() {
        for (const slate of Object.values(this.#slates.value)) {
            slate.applyStyle()
            slate.applyColor()
        }
    }

    applyColors(mode?: string) {
        const colorMode = mode === 'light' || mode === 'dark' ? mode : useColorMode().value

        for (const [key, value] of Object.entries(colorMode === 'dark' ? this.#colorsDark.value : this.#colors.value))
            setProperty(`--ui-${key}`, value == 'black' || value === 'white' ? value : `var(--ui-color-${value})`)
    }

    applyOthers(specific?: ThemeOther ) {
        if (specific) {
            const val = this.#others.value[specific]!
            setProperty(`--ui-${specific}`, typeof val === 'number' ? `${val}rem` : val)
        }
        else
            for (const [key, value] of Object.entries(this.#others.value))
                setProperty(`--ui-${key}`, typeof value === 'number' ? `${value}rem` : value)
    }

    setColor(name: ThemeColor, color: ThemeShadeTintExtended, mode?: string) {
        const colorMode = mode === 'light' || mode === 'dark' ? mode : useColorMode().value
        const value = color === 'black' || color === 'white' ? color : `var(--ui-color-${color})`

        if (colorMode === 'dark') this.#colorsDark.value[name] = color
        else this.#colors.value[name] = color

        setProperty(`--ui-${name}`, value)

        theme.save('colors')
    }

    copySlates(slates: SlateJSON): Record<ThemeShade, Slate> {
        return {
            primary: new Slate(new Color(slates.primary.shade), 'primary', slates.primary.light, slates.primary.dark),
            secondary: new Slate(new Color(slates.secondary.shade), 'secondary', slates.secondary.light, slates.secondary.dark),
            success: new Slate(new Color(slates.success.shade), 'success', slates.success.light, slates.success.dark),
            info: new Slate(new Color(slates.info.shade), 'info', slates.info.light, slates.info.dark),
            warning: new Slate(new Color(slates.warning.shade), 'warning', slates.warning.light, slates.warning.dark),
            error: new Slate(new Color(slates.error.shade), 'error', slates.error.light, slates.error.dark),
            neutral: new Slate(new Color(slates.neutral.shade), 'neutral', slates.neutral.light, slates.neutral.dark)
        }
    }

    save(which: 'slates' | 'colors' | 'others' | 'all' = 'all') {
        if (which === 'slates' || which === 'all') {
            const colors: SlateJSON = {
                primary: this.#slates.value.primary.toJSON(),
                secondary: this.#slates.value.secondary.toJSON(),
                success: this.#slates.value.success.toJSON(),
                info: this.#slates.value.info.toJSON(),
                warning: this.#slates.value.warning.toJSON(),
                error: this.#slates.value.error.toJSON(),
                neutral: this.#slates.value.neutral.toJSON(),
            }
            localStorage.setItem(this.#lsSlates, JSON.stringify(colors))
        }

        if (which === 'colors' || which === 'all')
            localStorage.setItem(this.#lsColors, JSON.stringify({ light: this.#colors.value, dark: this.#colorsDark.value }))

        if (which === 'others' || which === 'all')
            localStorage.setItem(this.#lsOthers, JSON.stringify(this.#others.value))

        // const toaster = useToast()
        // toaster.add({ title: 'Theme saved!', description: 'Theme has been saved into local storage.', color: 'success' })
    }

    reset(delet: boolean = false) {
        if (delet) {
            localStorage.removeItem(this.#lsSlates)
            localStorage.removeItem(this.#lsColors)
        }

        this.#slates.value = this.copySlates(defaultSlates)
        this.applySlates()
        
        this.#colors.value = { ...defaultColors }
        this.#colorsDark.value = { ...defaultColorsDark }
        this.applyColors()

        const nuxtApp = useNuxtApp()
        nuxtApp.callHook('colors:update')

        const toaster = useToast()
        toaster.add({ title: 'Theme reseted!', description: 'Theme has been reseted.', color: 'success' })
    }
}

const theme = new Theme()
export { theme }
