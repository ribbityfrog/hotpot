<template>
    <UDrawer :ui="{ overlay: 'bg-transparent' }">
        <UButton label="Shades" color="info" trailing-icon="i-lucide-chevron-up" variant="subtle" />
        <template #content>
            <Flex col center class="gap-4 p-4">
                <Flex
                    v-for="shade in themeShadeEntries"
                    :key="shade"
                    full
                    center>
                    <ColorPicker :color="shade" class="w-32 mr-2 sm:mr-4" />
                    <ColorPickerPopup :color="shade">
                        <ColorShades :color="shade" class="transform duration-500 ease-in-out hover:shadow-element hover:dark:shadow-element-dark" />
                    </ColorPickerPopup>
                </Flex>
                <ThemeSavingShades />
            </Flex>
        </template>
    </UDrawer>
</template>
