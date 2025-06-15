export default function (shade: ThemeShade, style: 'bg' | 'text') {
    themeTints.map(v => `${style}-${shade}-${v}`)
}
