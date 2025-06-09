<template>
    <UDrawer :overlay="false" :modal="false">
        <UButton label="Colors" color="info" trailing-icon="i-lucide-chevron-up" variant="subtle" />
        <template #content>
            <Flex center class="gap-8 px-4 py-8">
                <DarkSwitch />
                <Flex center class="gap-6" wrap>
                    <Flex
                        v-for="color in themeShadeEntries.filter((shade) => shade !== 'neutral')"
                        :key="color"
                        col
                        start>
                        <p>Default {{ color }}</p>
                        <ColorSelector :color="color" />
                    </Flex>
                </Flex>
                <ThemeSavingColors />
            </Flex>
        </template>
    </UDrawer>
</template>
