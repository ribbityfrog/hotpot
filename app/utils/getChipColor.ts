export function getChipColor(color?: ThemeShadeExtended) {
    if (!color) return 'bg-pink-500'

    if (color === 'white')
        return 'bg-white'
    else if (color === 'black')
        return 'bg-black'
    else
        return `bg-${color}-500`
}
