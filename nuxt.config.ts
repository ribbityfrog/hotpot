// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    experimental: {
        inlineRouteRules: true
    },
    future: {
        compatibilityVersion: 4
    },
    // devtools: { enabled: true },
    // ssr: false,
    nitro: {
        prerender: {
            autoSubfolderIndex: false
        }
    },
    runtimeConfig: {
        public: {
            apiScheme: 'http',
            apiHost: 'localhost',
            apiPort: '',
            imageProvider: 'https://images.preprod.tech',
        },
    },
    routeRules: {
        '*/account/**': { ssr: false },
        '*/login/**': { ssr: false },
        '/admin/**': { ssr: false },
        '/operation/**': { ssr: false },
    },
    modules: [
        '@nuxt/eslint',
        '@nuxt/ui',
        '@nuxtjs/color-mode',
        '@nuxt/image',
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
            colors: ['primary', 'second', 'darkness', 'third', 'confirm', 'cancel', 'neutral', 'info', 'success', 'warning', 'error']
        },
    },
    css: ['~/assets/css/main.css', '~/assets/css/tailwind.css'],
    image: {
        providers: {
            launchbase: {
                name: 'flare',
                provider: '~/providers/images/flare.ts',
                // options: {
                //     baseURL: process.env.NUXT_PUBLIC_IMAGE_PROVIDER,
                // }
            }
        }
    },
    app: {
        head: {
            title: 'LeX Page',
            link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
        },
        pageTransition: { name: 'page', mode: 'out-in' }
    },
    colorMode: {
        preference: 'system',
        fallback: 'light',
    },
})
