export class Slate {
    name: ThemeShade
    tints!: Record<ThemeTint, Color>
    darkTint: ThemeTint = '400'
    lightTint: ThemeTint = '500'

    constructor(color: Color, shade: ThemeShade) {
        this.name = shade
        color.attachSlate(this)
        this.tintsGen(color)
    }

    get color(): Color { return this.tints['500'] }
    get shades(): Record<ThemeTint, Color> { return this.tints }

    update(color?: Color) { 
        if (color) {
            color.attachSlate(this)
            this.tintsGen(color)
        }
        else this.tintsGen(this.color)
        this.applyStyle()
        this.applyColor()
    }

    tintsGen(color: Color): void {
        this.tints = {
            50: color.mix(new Color(255, 255, 255, 0.85)),
            100: color.mix(new Color(255, 255, 255, 0.7)),
            200: color.mix(new Color(255, 255, 255, 0.55)),
            300: color.mix(new Color(255, 255, 255, 0.35)),
            400: color.mix(new Color(255, 255, 255, 0.15)),
            500: color,
            600: color.mix(new Color(0, 0, 0, 0.3)),
            700: color.mix(new Color(0, 0, 0, 0.5)),
            800: color.mix(new Color(0, 0, 0, 0.7)),
            900: color.mix(new Color(0, 0, 0, 0.85)),
            950: color.mix(new Color(0, 0, 0, 0.92)),
        }
    }

    applyStyle() {
        for (const tint of themeTints)
            setProperty(getSlateStyled(this.name, tint), this.shades[tint].hex3)
    }

    applyColor() {
        const mode = useColorMode().value
        setProperty(`--ui-${this.name}`, `var(--ui-color-${this.name}-${mode === 'dark' ? this.darkTint : this.lightTint})`)
    }
}
