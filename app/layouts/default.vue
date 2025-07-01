<script setup lang="ts">

</script>

<template>
    <Layout class="relative">
        <DrawerMenuBar />
        <Section full class="py-3 bg-accented sticky top-0 z-50">
            <HeaderMobile v-if="$device.isMobile" menu="main" />
            <HeaderDefault v-else menu="main" />
        </Section>
        <Section group full class="grow py-4">
            <slot />
        </Section>
        <footer class="w-full">
            <Section wide class="bg-muted py-4">
                <FooterDefault />
            </Section>
        </footer>
    </Layout>
</template>
