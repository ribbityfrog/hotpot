export default function (shade: ThemeShade, tint: ThemeTint) {
    return `--color-${themeSlates[shade]}-${tint}`
}
