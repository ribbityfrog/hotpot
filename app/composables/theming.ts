export class Theme {
    #shades!: Ref<Record<ThemeShade, Color>>
    #shadesDefault!: Record<ThemeShade, string>
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
            primary: getProperty('--ui-color-primary-500'),
            secondary: getProperty('--ui-color-secondary-500'),
            success: getProperty('--ui-color-success-500'),
            info: getProperty('--ui-color-info-500'),
            warning: getProperty('--ui-color-warning-500'),
            error: getProperty('--ui-color-error-500'),
            neutral: getProperty('--ui-color-neutral-500')
        }

        this.#colors = ref({ ...defaultColors })
        this.#colorsDark = ref({ ...defaultColorsDark })

        this.#isShadesReloadable = ref(false)
        this.#isColorsReloadable = ref(false)

        if (shades) {
            this.#isShadesReloadable = ref(true)
            this.#shades = ref(this.copyShades(shades))
        }
        else
            this.#shades = ref(this.copyShades(this.#shadesDefault))

        if (colors) {
            this.#isColorsReloadable = ref(true)
            this.#colors.value = { ...colors.light }
            this.#colorsDark.value = { ...colors.dark }
        }
        else {
            this.#colors.value = { ...defaultColors }
            this.#colorsDark.value = { ...defaultColorsDark }
        }

        this.applyShades()
        this.applyColors()
    }

    applyShades() {
        for (const shade of themeShades) {
            const color = this.#shades.value[shade]
            color.shadeGen()
            color.shadeStyle(shade)
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

    copyShades(shades: Record<ThemeShade, string>): Record<ThemeShade, Color> {
        return {
            primary: new Color(shades.primary),
            secondary: new Color(shades.secondary),
            success: new Color(shades.success),
            info: new Color(shades.info),
            warning: new Color(shades.warning),
            error: new Color(shades.error),
            neutral: new Color(shades.neutral)
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

    resetShades(delet: boolean = false) {
        if (delet) {
            localStorage.removeItem(this.#lsShades)
            this.#isShadesReloadable.value = false
        }

        this.#shades.value = this.copyShades(this.#shadesDefault)
        this.applyShades()

        const toaster = useToast()
        toaster.add({ title: 'Shades reseted!', description: 'Theme shades have been reseted.', color: 'success' })
    }

    resetToNuxtShades() {
        this.#shades.value = this.copyShades(defaultNuxtShades)
        this.applyShades()

        const toaster = useToast()
        toaster.add({ title: 'Shades reseted!', description: 'Theme shades have been reseted to Nuxt UI default.', color: 'success' })
    }

    reloadShades() {
        const storage = localStorage.getItem(this.#lsShades)

        if (storage) {
            this.#shades.value = this.copyShades(JSON.parse(storage))

            const toaster = useToast()
            toaster.add({ title: 'Shades reloaded!', description: 'Theme shades reloaded from last save.', color: 'success' })
        }
    }

    saveColors() {
        localStorage.setItem(this.#lsColors, JSON.stringify({ light: this.#colors.value, dark: this.#colorsDark.value }))

        this.#isColorsReloadable.value = true

        const toaster = useToast()
        toaster.add({ title: 'Colors saved!', description: 'Theme colors saved into local storage.', color: 'success' })
    }

    resetColors(delet: boolean = false) {
        if (delet) {
            localStorage.removeItem(this.#lsColors)
            this.#isColorsReloadable.value = false
        }

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

        if (storage) {
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
