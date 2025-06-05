export const themeShades = {
    primary: '--color-slatePrimary-',
    secondary: '--color-slateSecondary-',
    success: '--color-slateSuccess-',
    info: '--color-slateInfo-',
    warning: '--color-slateWarning-',
    error: '--color-slateError-',
    neutral: '--color-slateNeutral-'
} as const

export type ThemeShade = keyof typeof themeShades
export type ThemeShadeExtended = ThemeShade | 'white' | 'black'

export const themeShadeEntries = Object.keys(themeShades) as Readonly<ThemeShade[]>

export const themeColors = [
    'primary',
    'secondary', 
    'success', 
    'info', 
    'warning',
    'error',
    'neutral',
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

export const themeTints = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const
export type ThemeTint = typeof themeTints[number]

export type ThemeShadeTint = `${ThemeShade}-${ThemeTint}`
export type ThemeShadeTintExtended = `${ThemeShade}-${ThemeTint}` | 'white' | 'black'
