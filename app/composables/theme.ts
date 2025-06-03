class Theme {
    #colors!: Record<ThemeColor, Color>

    get colors() {
        return this.#colors
    }

    init() {
        this.#colors = {
            primary: new Color('#FF0000'),
            secondary: new Color('#00FF00'),
        }

        for (const entry of themeColorEntries) {
            const color = this.#colors[entry]
            color.shadeGen()
            color.shadeStyle(entry)
        }
    }
}

const theme = new Theme()
export { theme }
