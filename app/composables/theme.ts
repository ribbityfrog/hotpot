class Theme {
    #colors!: Ref<Record<ThemeColor, Color>>
    #originals!: Record<ThemeColor, Color>

    get colors() {
        return this.#colors.value
    }

    get colorsRef() {
        return this.#colors
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

        if (!colors)
            this.#colors = ref({ ...this.#originals })
        else
            this.#colors = ref({
                primary: new Color(colors.primary),
                secondary: new Color(colors.secondary),
                success: new Color(colors.success),
                info: new Color(colors.info),
                warning: new Color(colors.warning),
                error: new Color(colors.error),
                neutral: new Color(colors.neutral)
            })

        this.shadeAll()
    }

    shadeAll() {
        for (const entry of themeColorEntries) {
            const color = this.#colors.value[entry]
            color.shadeGen()
            color.shadeStyle(entry)
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

        const toaster = useToast()
        toaster.add({ title: 'Saved!', description: 'Theme colors saved to local storage.', color: 'success' })
    }

    reset() {
        localStorage.removeItem('colors')
        this.#colors.value = { ...this.#originals }
        this.shadeAll()

        const toaster = useToast()
        toaster.add({ title: 'Reset!', description: 'Theme colors reseted.', color: 'success' })
    }
}

const theme = new Theme()
export { theme }
