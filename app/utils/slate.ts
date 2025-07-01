export type SlateJSON = Record<ThemeShade, { shade: string, light: ThemeTint, dark: ThemeTint }>

export class Slate {
    name: ThemeShade
    tints!: Record<ThemeTint, Color>
    _lightTint: ThemeTint = '500'
    _darkTint: ThemeTint = '400'

    constructor(color: Color, shade: ThemeShade, light?: ThemeTint, dark?: ThemeTint) {
        this.name = shade
        color.attachSlate(this)

        if (light) this._lightTint = light
        if (dark) this._darkTint = dark

        this.tintsGen(color)
    }

    get color(): Color { return this.tints['500'] }
    get shades(): Record<ThemeTint, Color> { return this.tints }

    get lightTint(): ThemeTint { return this._lightTint }
    get darkTint(): ThemeTint { return this._darkTint }
    set lightTint(tint: ThemeTint) { 
        this._lightTint = tint
        this.applyColor()
        theme.save()
    }
    set darkTint(tint: ThemeTint) { 
        this._darkTint = tint
        this.applyColor()
        theme.save()
    }

    update(color?: Color) { 
        if (color) {
            color.attachSlate(this)
            this.tintsGen(color)
        }
        else this.tintsGen(this.color)
        this.applyStyle()
        this.applyColor()
        theme.save()
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

    toJSON() {
        return {
            shade: this.color.hex3,
            light: this.lightTint,
            dark: this.darkTint
        }
    }
}
