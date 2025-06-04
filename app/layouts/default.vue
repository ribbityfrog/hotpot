<script setup lang="ts">

</script>

<template>
    <Layout>
        <Section full class="py-4">
            <HeaderMobile v-if="$device.isMobile" menu="main" />
            <HeaderDefault v-else menu="main" />
        </Section>
        <Section wide class="py-4" class-content="gap-y-4">
            <ColorList class="gap-4" />
            <Flex center wrap class="gap-x-6 gap-y-2">
                <UButton v-if="theme.isReloadable" label="Reload" color="neutral" @click="theme.reload()" />
                <UButton label="Save" color="success" @click="theme.save()" />
                <UButton label="Reset" color="error" variant="outline" @click="theme.reset()" />
            </Flex>
        </Section>
        <Section group full class="grow pt-4">
            <slot />
        </Section>
        <footer class="w-full">
            <Section wide class="bg-neutral-300 dark:bg-neutral-950 py-4">
                <FooterDefault />
            </Section>
        </footer>
    </Layout>
</template>
