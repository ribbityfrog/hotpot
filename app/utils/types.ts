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

