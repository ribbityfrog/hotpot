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
    }
}

const theme = new Theme()
export { theme }
