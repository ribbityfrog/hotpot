class Theme {
    #shades!: Ref<Record<ThemeShade, Color>>
    #shadesDefault!: Record<ThemeShade, Color>
    #colors!: Ref<Record<ThemeColor, ThemeShadeTintExtended>>
    #colorsDark!: Ref<Record<ThemeColor, ThemeShadeTintExtended>>
    #isReloadable!: Ref<boolean>

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

    get isReloadable() {
        return this.#isReloadable.value
    }

    init() {
        const storage = localStorage.getItem('shades')
        const colors: Record<ThemeShade, string> | null = storage ? JSON.parse(storage) : null

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

        this.applyColors()

        if (colors)
        {
            this.#isReloadable = ref(true)
            this.#shades = ref(this.copyStorage(colors))
        }
        else 
        {
            this.#isReloadable = ref(false)
            this.#shades = ref(this.copyOriginals())
        }

        this.applyShades()
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

    copyOriginals(): Record<ThemeShade, Color> {
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

    copyStorage(storage: Record<ThemeShade, string>): Record<ThemeShade, Color> {
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

    save() {
        const colors: Record<ThemeShade, string> = {
            primary: this.#shades.value.primary.hex3,
            secondary: this.#shades.value.secondary.hex3,
            success: this.#shades.value.success.hex3,
            info: this.#shades.value.info.hex3,
            warning: this.#shades.value.warning.hex3,
            error: this.#shades.value.error.hex3,
            neutral: this.#shades.value.neutral.hex3
        }

        localStorage.setItem('shades', JSON.stringify(colors))

        this.#isReloadable.value = true

        const toaster = useToast()
        toaster.add({ title: 'Saved!', description: 'Theme colors saved to local storage.', color: 'success' })
    }

    reset() {
        this.#shades.value = this.copyOriginals()
        this.applyShades()

        const toaster = useToast()
        toaster.add({ title: 'Reset!', description: 'Theme colors reset.', color: 'success' })
    }

    reload() {
        const storage = localStorage.getItem('shades')

        if (storage)
        {
            this.#shades.value = this.copyStorage(JSON.parse(storage))

            const toaster = useToast()
            toaster.add({ title: 'Reload!', description: 'Theme colors reloaded from last save.', color: 'success' })
        }
    }
}

const theme = new Theme()
export { theme }
