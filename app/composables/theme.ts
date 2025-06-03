class Theme {
    #colors!: Ref<Record<ThemeColor, Color>>

    get colors() {
        return this.#colors.value
    }

    get colorsRef() {
        return this.#colors
    }

    init() {
        this.#colors = ref({
            primary: new Color(getProperty('--ui-color-primary-500')),
            secondary: new Color(getProperty('--ui-color-secondary-500')),
            success: new Color(getProperty('--ui-color-success-500')),
            info: new Color(getProperty('--ui-color-info-500')),
            warning: new Color(getProperty('--ui-color-warning-500')),
            error: new Color(getProperty('--ui-color-error-500')),
            neutral: new Color(getProperty('--ui-color-neutral-500'))
        })

        for (const entry of themeColorEntries) {
            const color = this.#colors.value[entry]
            color.shadeGen()
            color.shadeStyle(entry)
        }
    }
}

const theme = new Theme()
export { theme }
