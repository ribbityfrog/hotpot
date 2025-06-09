<template>
    <UDrawer :ui="{ overlay: 'bg-transparent' }">
        <UButton label="Colors" color="info" trailing-icon="i-lucide-chevron-up" variant="subtle" />
        <template #content>
            <Flex center class="gap-6 px-4 py-8" wrap>
                <Flex
                    v-for="color in themeShadeEntries.filter((shade) => shade !== 'neutral')"
                    :key="color"
                    center>
                    <ColorSelector :color="color" />
                </Flex>
                <ThemeSavingColors />
            </Flex>
        </template>
    </UDrawer>
</template>
