const modifiers = ['dark', ''] as const
const prefixs = ['bg', 'text', 'border'] as const
const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] as const
const tints = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const

const styles = modifiers.flatMap(modifier => prefixs.flatMap(prefix => colors.flatMap(color => tints.map(tint => `${modifier}${modifier.length > 0 ? ':' : ''}${prefix}-${color}-${tint}` as const))))
type Style = typeof styles[number]

export function findStyle(prefix: string, color: string, tint: string, modifier: string = ''): Style {
    return styles.find(s => s === `${modifier}${modifier.length > 0 ? ':' : ''}${prefix}-${color}-${tint}`) ?? 'bg-neutral-500'
}
