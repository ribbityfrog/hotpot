export class Slate {
    #color: Color
    #name: ThemeShade
    #tints!: Record<ThemeTint, Color>
    darkTint: ThemeTint = '400'
    lightTint: ThemeTint = '500'

    constructor(color: Color, shade: ThemeShade) {
        this.#color = color
        this.#name = shade
        this.#tintsGen()
    }

    get color(): Color { return this.#color }
    get shades(): Record<ThemeTint, Color> { return this.#tints }

    update(color: Color) { 
        this.#color = color
        this.applyStyle()
    }

    #tintsGen(): void {
        this.#tints = {
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

    applyStyle() {
        for (const tint of themeTints)
            setProperty(getSlateStyled(this.#name, tint), this.shades[tint].hex3)
    }
}
