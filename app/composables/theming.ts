class Theme {
    #shades!: Ref<Record<ThemeShade, Color>>
    // #defaults!: Ref<Record<DefaultColor, string>>
    // #defaultsDark!: Ref<Record<DefaultColor, string>>
    #shadesDefault!: Record<ThemeShade, Color>
    // #originalDefaults!: Record<DefaultColor, string>
    // #originalDefaultsDark!: Record<DefaultColor, string>
    #isReloadable!: Ref<boolean>

    get shades() {
        return this.#shades.value
    }

    get shadesRef() {
        return this.#shades
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

        // this.#originalDefaults = { ...themeOriginalDefaults }
        // this.#originalDefaultsDark = { ...themeOriginalDefaultsDark }

        // this.applyDefaults()

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

        this.shadeAll()
    }

    shadeAll() {
        for (const entry of themeShadeEntries) {
            const color = this.#shades.value[entry]
            color.shadeGen()
            color.shadeStyle(entry)
        }
    }

    // applyDefaults() {
    //     for (const [key, value] of Object.entries(this.#originalDefaults))
    //         console.log(`--ui-${key}`, `var(--ui-color-${value})`)
    // }

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
        this.shadeAll()

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
