<script setup lang="ts">

if (import.meta.client)
    if (leAuth.isAuthenticatedOrLogin(true))
        leFetch.getOnce('/admin/check', { fail: [() => leAuth.logout()] })

</script>

<template>
    <Layout>
        <Section full class="py-4 bg-second-400 dark:bg-second-700">
            <HeaderMobile v-if="$device.isMobile" menu="admin" />
            <HeaderDefault v-else menu="admin" />
        </Section>
        <Section group full class="grow pt-4">
            <slot />
        </Section>
        <footer class="w-full">
            <Section wide class="bg-darkness-50 dark:bg-darkness-700 py-4">
                <FooterDefault />
            </Section>
        </footer>
    </Layout>
</template>
