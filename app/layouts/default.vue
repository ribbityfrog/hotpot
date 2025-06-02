<script setup lang="ts">

</script>

<template>
    <Layout>
        <Section full class="py-4">
            <HeaderMobile v-if="$device.isMobile" menu="main" />
            <HeaderDefault v-else menu="main" />
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
