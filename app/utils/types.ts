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

export const themeShadeEntries = Object.keys(themeShades) as Readonly<ThemeShade[]>

export const themeColors = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral', 'bg', 'text', 'dimmed', 'muted', 'toned', 'highlighted', 'border', 'border-accented'] as const
export type ThemeColor = typeof themeColors[number]
