export const themeOriginalColors = {
    primary: new Color(getProperty('--ui-color-primary-500')),
    secondary: new Color(getProperty('--ui-color-secondary-600')),
    success: new Color(getProperty('--ui-color-success-500')),
    info: new Color(getProperty('--ui-color-info-500')),
    warning: new Color(getProperty('--ui-color-warning-500')),
    error: new Color(getProperty('--ui-color-error-500')),
    neutral: new Color(getProperty('--ui-color-neutral-500'))
}

export const themeOriginalDefaults = {
    primary: 'primary-500',
    secondary: 'secondary-500',
    success: 'success-500',
    info: 'info-500',
    warning: 'warning-500',
    error: 'error-500',
    neutral: 'neutral-500',
    bg: 'white',
    text: 'neutral-950',
    dimmed: 'neutral-400',
    muted: 'neutral-300',
    toned: 'neutral-200',
    highlighted: 'neutral-900',
    border: 'neutral-200',
    'border-accented': 'primary-600',
} satisfies Record<DefaultColor, string>

export const themeOriginalDefaultsDark = {
    primary: 'primary-400',
    secondary: 'secondary-400',
    success: 'success-400',
    info: 'info-400',
    warning: 'warning-400',
    error: 'error-400',
    neutral: 'neutral-400',
    bg: 'neutral-900',
    text: 'neutral-50',
    dimmed: 'neutral-600',
    muted: 'neutral-700',
    toned: 'neutral-800',
    highlighted: 'neutral-50',
    border: 'primary-500',
    'border-accented': 'primary-500',
}
