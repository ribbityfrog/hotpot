export const defaultColors = {
    'text-default': 'neutral-800',
    'text-dimmed': 'neutral-400',
    'text-muted': 'neutral-600',
    'text-toned': 'neutral-700',
    'text-highlighted': 'neutral-900',
    'text-inverted': 'white',
    'bg-default': 'white',
    'bg-muted': 'neutral-50',
    'bg-elevated': 'neutral-100',
    'bg-accented': 'neutral-200',
    'bg-inverted': 'neutral-800',
    'border-default': 'neutral-400',
    'border-muted': 'neutral-300',
    'border-accented': 'primary-600',
    'border-inverted': 'neutral-800',
} satisfies Record<ThemeColor, ThemeShadeTintExtended>

export const defaultColorsDark = {
    'text-default': 'neutral-100',
    'text-dimmed': 'neutral-500',
    'text-muted': 'neutral-400',
    'text-toned': 'neutral-300',
    'text-highlighted': 'neutral-50',
    'text-inverted': 'neutral-800',
    'bg-default': 'neutral-900',
    'bg-muted': 'neutral-600',
    'bg-elevated': 'neutral-700',
    'bg-accented': 'neutral-800',
    'bg-inverted': 'white',
    'border-default': 'neutral-700',
    'border-muted': 'neutral-800',
    'border-accented': 'primary-700',
    'border-inverted': 'white',
} satisfies Record<ThemeColor, ThemeShadeTintExtended>

export const defaultNuxtShades = {
    primary: '#00c950',
    secondary: '#A685FF',
    success: '#00c950',
    info: '#2b7fff',
    warning: '#f0b100',
    error: '#fb2c36',
    neutral: '#737373'
}

export const defaultSlates: Record<ThemeShade, { shade: string, light: ThemeTint, dark: ThemeTint }> = {
    primary: {
        shade: '#76ac5d',
        light: '500',
        dark: '400'
    },
    secondary: {
        shade: '#a684ff',
        light: '500',
        dark: '400'
    },
    success: {
        shade: '#25bb87',
        light: '500',
        dark: '400'
    },
    info: {
        shade: '#2b7fff',
        light: '500',
        dark: '400'
    },
    warning: {
        shade: '#f0b100',
        light: '500',
        dark: '400'
    },
    error: {
        shade: '#e9453e',
        light: '500',
        dark: '400'
    },
    neutral: {
        shade: '#90a1b9',
        light: '200',
        dark: '800'
    }
}

export const defaultOthers = {
    'radius': 0.5,
    'spacing': 0.25
}
