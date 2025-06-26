<template>
    <UDrawer :overlay="false" :modal="false">
        <UButton label="Shades" color="info" trailing-icon="i-lucide-chevron-up" variant="subtle" />
        <template #content>
            <Flex col center class="gap-4 p-4">
                <DarkSwitch />
                <Flex
                    v-for="shade in themeShades"
                    :key="shade"
                    full
                    center>
                    <!-- <ColorPicker :shade="shade" class="w-32 mr-2 sm:mr-4" /> -->
                    <!-- <ColorPickerPopup :shade="shade">
                        <ColorShades :color="shade" class="transform duration-500 ease-in-out hover:shadow-element hover:dark:shadow-element-dark" />
                    </ColorPickerPopup> -->
                </Flex>
                <ThemeSavingShades />
            </Flex>
        </template>
    </UDrawer>
</template>
