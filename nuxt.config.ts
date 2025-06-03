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
    modules: [
        '@nuxt/eslint',
        '@nuxt/ui',
        '@nuxtjs/color-mode',
        '@nuxt/icon',
        '@nuxtjs/device'
    ],
    components: [
        '~/components',
        {
            path: '~/components/structure',
            global: true,
            pathPrefix: false
        },
    ],
    ui: {
        theme: {
            colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral']
        },
    },
    css: ['~/assets/css/main.css', '~/assets/css/tailwind.css'],
    app: {
        head: {
            title: 'Nuxtheme',
            link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
        },
        pageTransition: { name: 'page', mode: 'out-in' }
    },
    colorMode: {
        preference: 'light',
    },
})
