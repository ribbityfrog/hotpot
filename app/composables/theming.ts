class Theme {
    #colors!: Ref<Record<ThemeColor, Color>>
    #originals!: Record<ThemeColor, Color>
    #isReloadable!: Ref<boolean>

    get colors() {
        return this.#colors.value
    }

    get colorsRef() {
        return this.#colors
    }

    get isReloadable() {
        return this.#isReloadable.value
    }

    init() {
        const storage = localStorage.getItem('colors')
        const colors: Record<ThemeColor, string> | null = storage ? JSON.parse(storage) : null

        this.#originals = {
            primary: new Color(getProperty('--ui-color-primary-500')),
            secondary: new Color(getProperty('--ui-color-secondary-600')),
            success: new Color(getProperty('--ui-color-success-500')),
            info: new Color(getProperty('--ui-color-info-500')),
            warning: new Color(getProperty('--ui-color-warning-500')),
            error: new Color(getProperty('--ui-color-error-500')),
            neutral: new Color(getProperty('--ui-color-neutral-500'))
        }

        if (colors)
        {
            this.#isReloadable = ref(true)
            this.#colors = ref(this.copyStorage(colors))
        }
        else 
        {
            this.#isReloadable = ref(false)
            this.#colors = ref(this.copyOriginals())
        }

        this.shadeAll()
    }

    shadeAll() {
        for (const entry of themeColorEntries) {
            const color = this.#colors.value[entry]
            color.shadeGen()
            color.shadeStyle(entry)
        }
    }

    copyOriginals(): Record<ThemeColor, Color> {
        return { 
            primary: new Color(this.#originals.primary.hex3),
            secondary: new Color(this.#originals.secondary.hex3),
            success: new Color(this.#originals.success.hex3),
            info: new Color(this.#originals.info.hex3), 
            warning: new Color(this.#originals.warning.hex3),
            error: new Color(this.#originals.error.hex3),
            neutral: new Color(this.#originals.neutral.hex3)
        }
    }

    copyStorage(storage: Record<ThemeColor, string>): Record<ThemeColor, Color> {
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
        const colors: Record<ThemeColor, string> = {
            primary: this.#colors.value.primary.hex3,
            secondary: this.#colors.value.secondary.hex3,
            success: this.#colors.value.success.hex3,
            info: this.#colors.value.info.hex3,
            warning: this.#colors.value.warning.hex3,
            error: this.#colors.value.error.hex3,
            neutral: this.#colors.value.neutral.hex3
        }

        localStorage.setItem('colors', JSON.stringify(colors))

        this.#isReloadable.value = true

        const toaster = useToast()
        toaster.add({ title: 'Saved!', description: 'Theme colors saved to local storage.', color: 'success' })
    }

    reset() {
        this.#colors.value = this.copyOriginals()
        this.shadeAll()

        const toaster = useToast()
        toaster.add({ title: 'Reset!', description: 'Theme colors reset.', color: 'success' })
    }

    reload() {
        const storage = localStorage.getItem('colors')

        if (storage)
        {
            this.#colors.value = this.copyStorage(JSON.parse(storage))

            const toaster = useToast()
            toaster.add({ title: 'Reload!', description: 'Theme colors reloaded from last save.', color: 'success' })
        }
    }
}

const theme = new Theme()
export { theme }
