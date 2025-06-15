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

export const themeShades = Object.keys(themeSlates) as Readonly<ThemeShade[]>
export const themeShadesStrict = themeShades.filter(v => v !== 'neutral') as Readonly<ThemeShadeStrict[]>
export const themeShadesExtended = [...themeShades, 'white', 'black'] as Readonly<ThemeShadeExtended[]>

export const themeTints = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const
export type ThemeTint = typeof themeTints[number]

export type ThemeShadeTint = `${ThemeShade}-${ThemeTint}`
export type ThemeShadeTintExtended = `${ThemeShade}-${ThemeTint}` | 'white' | 'black'

export const themeColors = [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'error',
    'text',
    'text-dimmed',
    'text-muted',
    'text-toned',
    'text-highlighted',
    'text-inverted',
    'bg',
    'bg-muted',
    'bg-elevated',
    'bg-accented',
    'bg-inverted',
    'border',
    'border-muted',
    'border-accented',
    'border-inverted'
] as const
export type ThemeColor = typeof themeColors[number]

