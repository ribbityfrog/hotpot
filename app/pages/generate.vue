<script setup lang="ts">

const nuxtConfig = 
`export default defineNuxtConfig({
\tui: {
\t\ttheme: {
\t\t\tcolors: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral']
\t\t},
\t},
\tcss: ['~/assets/css/tailwind.css'],
}`

let appConfig =
`export default defineAppConfig({
\tui: {
\t\tcolors: {
\t\t\tprimary: 'slatePrimary',
\t\t\tsecondary: 'slateSecondary',
\t\t\tsuccess: 'slateSuccess',
\t\t\tinfo: 'slateInfo',
\t\t\twarning: 'slateWarning',
\t\t\terror: 'slateError',
\t\t\tneutral: 'slateNeutral'
\t\t},`

function fillAppConfig(config: object, depth: number = 1) {
    for (const [key, value] of Object.entries(config)) {
        if (typeof value === 'object')
        {
            appConfig += `\n${'\t'.repeat(depth + 2)}${key}: {`
            fillAppConfig(value, depth + 1)
        }
        else
            appConfig += `\n${'\t'.repeat(depth + 2)}${key}: '${value}',`
    }
    appConfig += `\n${'\t'.repeat(depth + 1)}},`
}

const configs = getStoragesStartWith('gen-comp-')

for (const config of configs)
{
    appConfig += `\n\t\t${config.name}{`
    delete config.name
    fillAppConfig(config)
}

appConfig += `
\t}
})
`

let cssConfig = 
`@import 'tailwindcss';
@import '@nuxt/ui';

theme static {`

for (const [key, value] of Object.entries(themeShades)) {
    cssConfig += '\n'
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
    <Page class="gap-y-6">
        <Section>
            <h1>Generate code</h1>
            <p>
                Add this minimum generated code in the corresping files
            </p>
            <p>
                This will work only if you have Nuxt UI correctly installed
            </p>
        </Section>
        <Section start>
            <ShikiBox :code="nuxtConfig" file="/nuxt.config.ts" />
        </Section>
        <Section start>
            <ShikiBox :code="appConfig" file="(/app)/app.config.ts" />
        </Section>
        <Section start>
            <ShikiBox lang="css" :code="cssConfig" file="(/app)/assets/css/tailwind.css" />
        </Section>
    </Page>
</template>

<style>

.prose pre, .shiki, pre.shiki {
    background: transparent !important;
}

</style>
