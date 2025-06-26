export class Color {
    r!: number
    g!: number
    b!: number
    a!: number
    #slate?: Slate

    get hex3(): string {
        return `#${this.r.toString(16).padStart(2, '0')}${this.g.toString(16).padStart(2, '0')}${this.b.toString(16).padStart(2, '0')}`
    }

    get hex4(): string {
        return `#${this.r.toString(16).padStart(2, '0')}${this.g.toString(16).padStart(2, '0')}${this.b.toString(16).padStart(2, '0')}${(this.a * 255).toString(16).padStart(2, '0')}`
    }

    constructor(hexa: string, slate?: Slate);
    constructor(r: number, g: number, b: number, a?: number, slate?: Slate);
    constructor(rOrHexa: number | string, gOrSlate?: number | Slate, b?: number, a: number = 1, slate?: Slate) {
        if (typeof rOrHexa === 'string')
            this.init(rOrHexa, slate)
        else
            this.init(rOrHexa, gOrSlate as number, b!, a, slate)
    }

    init(hexa: string, slate?: Slate): void;
    init(r: number, g: number, b: number, a?: number, slate?: Slate): void;
    init(rOrHexa: number | string, gOrSlate?: number | Slate, b?: number, a: number = 1, slate?: Slate): void {
        if (typeof rOrHexa === 'number') {
            this.r = Color.clampColor(rOrHexa)
            this.g = Color.clampColor(gOrSlate as number)
            this.b = Color.clampColor(b!)
            this.a = Color.clampAlpha(a)
            this.#slate = slate
        } else {
            const hexa = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(rOrHexa) ? rOrHexa.slice(1) : 'FF0000'
            const hasAlpha = hexa.length === 8
            this.r = Color.clampColor(parseInt(hexa.slice(0, 2), 16))
            this.g = Color.clampColor(parseInt(hexa.slice(2, 4), 16))
            this.b = Color.clampColor(parseInt(hexa.slice(4, 6), 16))
            this.a = hasAlpha ? Color.clampAlpha(parseInt(hexa.slice(6, 8), 16) / 255) : 1
            this.#slate = gOrSlate ? gOrSlate as Slate : undefined
        }
    }

    update(hexa: string): void {
        this.init(hexa)
        this.#slate?.applyStyle()
    }

    mix(fg: Color): Color {
        return new Color(
            (fg.r * fg.a) + (this.r * (1 - fg.a)),
            (fg.g * fg.a) + (this.g * (1 - fg.a)),
            (fg.b * fg.a) + (this.b * (1 - fg.a))
        )
    }

    copy(): Color {
        return new Color(this.hex4)
    }

    static clampColor(value: number): number {
        return Math.min(Math.max(Math.trunc(value), 0), 255)
    }

    static clampAlpha(value: number): number {
        return Math.min(Math.max(value, 0), 1)
    }
}
