<script setup lang="ts">

const nuxtConfig = 
`
export default defineNuxtConfig({
\tui: {
\t\ttheme: {
\t\t\tcolors: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral']
\t\t},
\t},
\tcss: ['~/assets/css/tailwind.css'],
}
`

const appConfig =
`
export default defineAppConfig({
\tui: {
\t\tcolors: {
\t\t\tprimary: 'slatePrimary',
\t\t\tsecondary: 'slateSecondary',
\t\t\tsuccess: 'slateSuccess',
\t\t\tinfo: 'slateInfo',
\t\t\twarning: 'slateWarning',
\t\t\terror: 'slateError',
\t\t\tneutral: 'slateNeutral'
\t\t},
\t}
})
`

let cssConfig = 
`
@import 'tailwindcss';
@import '@nuxt/ui';

theme static {`

for (const [key, value] of Object.entries(themeShades)) {
    for (const [index, tint] of Object.values(themeTints).entries())
        cssConfig += `\n\t${value}${tint}: ${theme.shades[key as ThemeShade].shades[index]!.hex3};`
}

cssConfig += '}\n\n:root {\n'

for (const [key, value] of Object.entries(theme.colors)) {
    cssConfig += `\t--ui-color-${key}: ${value === 'black' || value === 'white' ? value : `var(--ui-${value})`};\n`
}

cssConfig += '}\n\n.dark {\n'

for (const [key, value] of Object.entries(theme.colorsDark)) {
    cssConfig += `\t--ui-color-${key}: ${value === 'black' || value === 'white' ? value : `var(--ui-${value})`};\n`
}

cssConfig += '}'

</script>

<template>
    <Page>
        <Section start>
            <Shiki lang="ts" :code="nuxtConfig" />
        </Section>
        <Section start>
            <Shiki lang="ts" :code="appConfig" />
        </Section>
        <Section start>
            <Shiki :code="cssConfig" />
        </Section>
    </Page>
</template>
