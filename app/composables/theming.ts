class Theme {
    #shades!: Ref<Record<ThemeShade, Color>>
    #shadesDefault!: Record<ThemeShade, Color>
    #colors!: Ref<Record<ThemeColor, ThemeShadeTintExtended>>
    #colorsDark!: Ref<Record<ThemeColor, ThemeShadeTintExtended>>
    #isShadesReloadable!: Ref<boolean>
    #isColorsReloadable!: Ref<boolean>
    #lsShades = 'shades'
    #lsColors = 'colors'

    get shades() {
        return this.#shades.value
    }

    get shadesRef() {
        return this.#shades
    }

    get colors() {
        return this.#colors.value
    }

    get colorsDark() {
        return this.#colorsDark.value
    }

    get isShadesReloadable() {
        return this.#isShadesReloadable.value
    }

    get isColorsReloadable() {
        return this.#isColorsReloadable.value
    }

    init() {
        const storedShades = localStorage.getItem(this.#lsShades)
        const storedColors = localStorage.getItem(this.#lsColors)
        const shades: Record<ThemeShade, string> | null = storedShades ? JSON.parse(storedShades) : null
        const colors: Record<'light' | 'dark', Record<ThemeColor, ThemeShadeTintExtended>> | null = storedColors ? JSON.parse(storedColors) : null

        this.#shadesDefault = {
            primary: new Color(getProperty('--ui-color-primary-500')),
            secondary: new Color(getProperty('--ui-color-secondary-600')),
            success: new Color(getProperty('--ui-color-success-500')),
            info: new Color(getProperty('--ui-color-info-500')),
            warning: new Color(getProperty('--ui-color-warning-500')),
            error: new Color(getProperty('--ui-color-error-500')),
            neutral: new Color(getProperty('--ui-color-neutral-500'))
        }

        this.#colors = ref({ ...defaultColors })
        this.#colorsDark = ref({ ...defaultColorsDark })

        this.#isShadesReloadable = ref(false)
        this.#isColorsReloadable = ref(false)

        if (shades)
        {
            this.#isShadesReloadable = ref(true)
            this.#shades = ref(this.copyShadesStorage(shades))
        }
        else 
            this.#shades = ref(this.copyShadesDefault())

        if (colors)
        {
            this.#isColorsReloadable = ref(true)
            this.#colors.value = { ...colors.light }
            this.#colorsDark.value = { ...colors.dark }
        }
        else
        {
            this.#colors.value = { ...defaultColors }
            this.#colorsDark.value = { ...defaultColorsDark }
        }

        this.applyShades()
        this.applyColors()
    }

    applyShades() {
        for (const entry of themeShadeEntries) {
            const color = this.#shades.value[entry]
            color.shadeGen()
            color.shadeStyle(entry)
        }
    }

    applyColors(mode?: string) {
        const colorMode = mode === 'light' || mode === 'dark' ? mode : useColorMode().value

        for (const [key, value] of Object.entries(colorMode === 'dark' ? this.#colorsDark.value : this.#colors.value))
            setProperty(`--ui-${key}`, value == 'black' || value === 'white' ? value : `var(--ui-color-${value})`)
    }

    setColor(name: ThemeColor, color: ThemeShadeTintExtended, mode?: string) {
        const colorMode = mode === 'light' || mode === 'dark' ? mode : useColorMode().value
        const value = color === 'black' || color === 'white' ? color : `var(--ui-color-${color})`

        if (colorMode === 'dark') this.#colorsDark.value[name] = color
        else this.#colors.value[name] = color

        setProperty(`--ui-${name}`, value)
    }

    copyShadesDefault(): Record<ThemeShade, Color> {
        return { 
            primary: new Color(this.#shadesDefault.primary.hex3),
            secondary: new Color(this.#shadesDefault.secondary.hex3),
            success: new Color(this.#shadesDefault.success.hex3),
            info: new Color(this.#shadesDefault.info.hex3), 
            warning: new Color(this.#shadesDefault.warning.hex3),
            error: new Color(this.#shadesDefault.error.hex3),
            neutral: new Color(this.#shadesDefault.neutral.hex3)
        }
    }

    copyShadesStorage(storage: Record<ThemeShade, string>): Record<ThemeShade, Color> {
        return {
            primary: new Color(storage.primary),
            secondary: new Color(storage.secondary),
            success: new Color(storage.success),
            info: new Color(storage.info),
            warning: new Color(storage.warning),
            error: new Color(storage.error),
            neutral: new Color(storage.neutral)
        }
    }

    saveShades() {
        const colors: Record<ThemeShade, string> = {
            primary: this.#shades.value.primary.hex3,
            secondary: this.#shades.value.secondary.hex3,
            success: this.#shades.value.success.hex3,
            info: this.#shades.value.info.hex3,
            warning: this.#shades.value.warning.hex3,
            error: this.#shades.value.error.hex3,
            neutral: this.#shades.value.neutral.hex3
        }

        localStorage.setItem(this.#lsShades, JSON.stringify(colors))

        this.#isShadesReloadable.value = true

        const toaster = useToast()
        toaster.add({ title: 'Shades saved!', description: 'Theme shades saved into local storage.', color: 'success' })
    }

    resetShades() {
        this.#shades.value = this.copyShadesDefault()
        this.applyShades()

        const toaster = useToast()
        toaster.add({ title: 'Shades reseted!', description: 'Theme shades have been reseted.', color: 'success' })
    }

    reloadShades() {
        const storage = localStorage.getItem(this.#lsShades)

        if (storage)
        {
            this.#shades.value = this.copyShadesStorage(JSON.parse(storage))

            const toaster = useToast()
            toaster.add({ title: 'Shades reloaded!', description: 'Theme shades reloaded from last save.', color: 'success' })
        }
    }

    saveColors() {
        localStorage.setItem(this.#lsColors, JSON.stringify({ light: this.#colors.value, dark: this.#colorsDark.value }))

        const toaster = useToast()
        toaster.add({ title: 'Colors saved!', description: 'Theme colors saved into local storage.', color: 'success' })
    }

    resetColors() {
        this.#colors.value = { ...defaultColors }
        this.#colorsDark.value = { ...defaultColorsDark }
        this.applyColors()

        const nuxtApp = useNuxtApp()
        nuxtApp.callHook('colors:update')

        const toaster = useToast()
        toaster.add({ title: 'Colors reseted!', description: 'Theme colors have been reseted.', color: 'success' })
    }

    reloadColors() {
        const storage = localStorage.getItem(this.#lsColors)

        if (storage)
        {
            const colors = JSON.parse(storage)
            this.#colors.value = { ...colors.light }
            this.#colorsDark.value = { ...colors.dark }
            this.applyColors()
        }

        const nuxtApp = useNuxtApp()
        nuxtApp.callHook('colors:update')

        const toaster = useToast()
        toaster.add({ title: 'Colors reloaded!', description: 'Theme colors reloaded from last save.', color: 'success' })
    }
}

const theme = new Theme()
export { theme }
