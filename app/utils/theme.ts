export const themeSlates = {
    primary: 'slatePrimary',
    secondary: 'slateSecondary',
    success: 'slateSuccess',
    info: 'slateInfo',
    warning: 'slateWarning',
    error: 'slateError',
    neutral: 'slateNeutral'
} as const

export type ThemeShade = keyof typeof themeSlates
export type ThemeShadeStrict = Exclude<ThemeShade, 'neutral'>
export type ThemeShadeExtended = ThemeShade | 'white' | 'black'

export function isThemeShade (shade: string): shade is ThemeShade {
    return Object.keys(themeSlates).includes(shade)
}

export const themeShades = Object.keys(themeSlates) as Readonly<ThemeShade[]>
export const themeShadesStrict = themeShades.filter(v => v !== 'neutral') as Readonly<ThemeShadeStrict[]>
export const themeShadesExtended = [...themeShades, 'white', 'black'] as Readonly<ThemeShadeExtended[]>

export const themeTints = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const
export type ThemeTint = typeof themeTints[number]

export type ThemeShadeTint = `${ThemeShade}-${ThemeTint}`
export type ThemeShadeTintExtended = `${ThemeShade}-${ThemeTint}` | 'white' | 'black'

export const themeColorsText = [
    'text-default',
    'text-inverted',
    'text-dimmed',
    'text-muted',
    'text-toned',
    'text-highlighted',
] as const

export const themeColorsBackground = [
    'bg-default',
    'bg-inverted',
    'bg-muted',
    'bg-elevated',
    'bg-accented',
] as const

export const themeColorsBorder = [
    'border-default',
    'border-inverted',
    'border-muted',
    'border-accented',
] as const

export const themeColors = [ ...themeColorsText, ...themeColorsBackground, ...themeColorsBorder] as const

export type ThemeColorText = typeof themeColorsText[number]
export type ThemeColorBackground = typeof themeColorsBackground[number]
export type ThemeColorBorder = typeof themeColorsBorder[number]
export type ThemeColor = typeof themeColors[number]
