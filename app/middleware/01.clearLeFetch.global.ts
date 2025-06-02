export default defineNuxtRouteMiddleware(async (to, from) => {

    if (to.path != from.path)
    {
        const nuxtApp = useNuxtApp()
        return nuxtApp.runWithContext(() => leFetch.clean(to.path) )
    }

})
