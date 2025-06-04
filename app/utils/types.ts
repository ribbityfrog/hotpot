export const themeColors = {
    primary: '--color-slatePrimary-',
    secondary: '--color-slateSecondary-',
    success: '--color-slateSuccess-',
    info: '--color-slateInfo-',
    warning: '--color-slateWarning-',
    error: '--color-slateError-',
    neutral: '--color-slateNeutral-'
} as const

export type ThemeColor = keyof typeof themeColors

export const themeColorEntries = Object.keys(themeColors) as Readonly<ThemeColor[]>

export const defaultColors = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral', 'bg', 'text', 'dimmed', 'muted', 'toned', 'highlighted', 'border', 'border-accented'] as const
export type DefaultColor = typeof defaultColors[number]
