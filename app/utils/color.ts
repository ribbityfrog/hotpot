export class Color {
    r!: number
    g!: number
    b!: number
    a!: number
    shades: Color[] = []

    get hex3(): string {
        return `#${this.r.toString(16).padStart(2, '0')}${this.g.toString(16).padStart(2, '0')}${this.b.toString(16).padStart(2, '0')}`
    }

    get hex4(): string {
        return `#${this.r.toString(16).padStart(2, '0')}${this.g.toString(16).padStart(2, '0')}${this.b.toString(16).padStart(2, '0')}${(this.a * 255).toString(16).padStart(2, '0')}`
    }

    constructor(hexa: string);
    constructor(r: number, g: number, b: number, a?: number);
    constructor(rOrHexa: number | string, g?: number, b?: number, a: number = 1)
    {
        if (typeof rOrHexa === 'string')
            this.init(rOrHexa)
        else
            this.init(rOrHexa, g!, b!, a)
    }

    init(hexa: string): void;
    init(r: number, g: number, b: number, a?: number): void;
    init(rOrHexa: number | string, g?: number, b?: number, a: number = 1): void {
        if(typeof rOrHexa === 'number')
        {
            this.r = Color.clampColor(rOrHexa)
            this.g = Color.clampColor(g!)
            this.b = Color.clampColor(b!)
            this.a = Color.clampAlpha(a)
        } else {
            const hexa = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(rOrHexa) ? rOrHexa.slice(1) : 'FF0000'
            const hasAlpha = hexa.length === 8
            this.r = Color.clampColor(parseInt(hexa.slice(0, 2), 16))
            this.g = Color.clampColor(parseInt(hexa.slice(2, 4), 16))
            this.b = Color.clampColor(parseInt(hexa.slice(4, 6), 16))
            this.a = hasAlpha ? Color.clampAlpha(parseInt(hexa.slice(6, 8), 16) / 255) : 1
        }
    }

    update(hexa: string, style?: ThemeShade): void {
        this.init(hexa)
        this.shadeGen()
        if (style)
            this.shadeStyle(style)
    }

    mix(fg: Color): Color {
        return new Color(
            (fg.r * fg.a) + (this.r * (1 - fg.a)),
            (fg.g * fg.a) + (this.g * (1 - fg.a)),
            (fg.b * fg.a) + (this.b * (1 - fg.a))
        )
    }

    shadeGen(): void {
        this.shades = [
            this.mix(new Color(255, 255, 255, 0.85)),
            this.mix(new Color(255, 255, 255, 0.7)),
            this.mix(new Color(255, 255, 255, 0.55)),
            this.mix(new Color(255, 255, 255, 0.35)),
            this.mix(new Color(255, 255, 255, 0.15)),
            this,
            this.mix(new Color(0, 0, 0, 0.3)),
            this.mix(new Color(0, 0, 0, 0.5)),
            this.mix(new Color(0, 0, 0, 0.7)),
            this.mix(new Color(0, 0, 0, 0.85)),
            this.mix(new Color(0, 0, 0, 0.92)),
        ]
    }

    shadeStyle(themeShade: ThemeShade) {
        if (this.shades.length !== 11)
            return

        const slate = themeShades[themeShade]

        let i = 0
        let shade = 50
        while (shade <= 950) {
            setProperty(`${slate}${shade}`, this.shades[i]!.hex3)
            shade = shade === 50 || shade === 900 ? shade + 50 : shade + 100
            i++
        }
    }

    static clampColor(value: number): number {
        return Math.min(Math.max(Math.trunc(value), 0), 255)
    }

    static clampAlpha(value: number): number {
        return Math.min(Math.max(value, 0), 1)
    }
}
