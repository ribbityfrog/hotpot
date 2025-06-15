export class Slate {
    #color: Color
    #shades!: Record<ThemeTint, Color>

    constructor(color: Color) {
        this.#color = color
        this.shadeGen()
    }

    get color(): Color { return this.#color }
    get shades(): Record<ThemeTint, Color> { return this.#shades }

    shadeGen(): void {
        this.#shades = {
            50: this.#color.mix(new Color(255, 255, 255, 0.85)),
            100: this.#color.mix(new Color(255, 255, 255, 0.7)),
            200: this.#color.mix(new Color(255, 255, 255, 0.55)),
            300: this.#color.mix(new Color(255, 255, 255, 0.35)),
            400: this.#color.mix(new Color(255, 255, 255, 0.15)),
            500: this.#color,
            600: this.#color.mix(new Color(0, 0, 0, 0.3)),
            700: this.#color.mix(new Color(0, 0, 0, 0.5)),
            800: this.#color.mix(new Color(0, 0, 0, 0.7)),
            900: this.#color.mix(new Color(0, 0, 0, 0.85)),
            950: this.#color.mix(new Color(0, 0, 0, 0.92)),
        }
    }

    shadeStyle(themeShade: ThemeShade) {
        for (const tint of themeTints)
            setProperty(getSlateStyled(themeShade, tint), this.shades[tint].hex3)
    }
}
