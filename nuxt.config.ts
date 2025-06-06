// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    future: {
        compatibilityVersion: 4
    },
    // devtools: { enabled: true },
    ssr: false,
    nitro: {
        prerender: {
            autoSubfolderIndex: false
        }
    },
    routeRules: {
        // '/**': { static: true },
    },
    modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/color-mode', '@nuxt/icon', '@nuxtjs/device', 'nuxt-shiki'],
    components: [
        '~/components',
        {
            path: '~/components/structure',
            global: true,
            pathPrefix: false
        },
    ],
    css: ['~/assets/css/main.css', '~/assets/css/tailwind.css'],
    ui: {
        theme: {
            colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral']
        },
    },
    shiki: {
        bundledThemes: ['dracula-soft'],
        defaultTheme: 'dracula-soft',
        bundledLangs: ['ts', 'css'],
        defaultLang: 'ts',
    },
    app: {
        head: {
            title: 'Hotpot',
            link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
        },
        pageTransition: { name: 'page', mode: 'out-in' }
    },
    colorMode: {
        preference: 'light',
    },
})
