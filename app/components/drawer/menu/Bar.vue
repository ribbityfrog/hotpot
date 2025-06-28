<script setup lang="ts">
import { DrawerSlates, DrawerBackgrounds, DrawerBorders, DrawerTexts } from '#components'

const tabItems: { icon: string, value: TabElement }[] = [
    { icon: 'i-mdi-color', value: 'colors' },
    { icon: 'i-mdi-format-paint', value: 'bg-colors' },
    { icon: 'i-mdi-border-all', value: 'border-colors' },
    { icon: 'i-mdi-writing-system-latin', value: 'text-colors' },
]

const elements = {
    colors: DrawerSlates,
    'bg-colors': DrawerBackgrounds,
    'border-colors': DrawerBorders,
    'text-colors': DrawerTexts
} as const
type TabElement = keyof typeof elements

const isStylingOpened = ref(false)
const tabSelected: Ref<TabElement> = ref('colors')

function openStyling(tab: TabElement) {
    tabSelected.value = tab
    isStylingOpened.value = true
}

</script>

<template>
    <div class="rounded-full bg-inverted text-inverted fixed bottom-4 z-20 px-4 sm:px-10 hadow-element dark:shadow-element-dark">
        <Flex center class="gap-3">
            <DrawerMenuIcon name="i-mdi-color" tooltip="Colors" @click="openStyling('colors')" />
            <DrawerMenuIcon name="i-mdi-format-paint" tooltip="Backgrounds colors" @click="openStyling('bg-colors')" />
            <DrawerMenuIcon name="i-mdi-border-all" tooltip="Borders colors" @click="openStyling('border-colors')" />
            <DrawerMenuIcon name="i-mdi-writing-system-latin" tooltip="Texts colors" @click="openStyling('text-colors')" />
        </Flex>
        <UDrawer v-model:open="isStylingOpened" :overlay="false" handle-only>
            <template #content>
                <Flex full col center class="gap-4 px-2 pb-6">
                    <Flex full between-start class="gap-2">
                        <div class="w-1/3">
                            <DarkSwitch />
                        </div>
                        <Flex center class="w-1/3">
                            <UTabs v-model="tabSelected" size="xl" variant="link" :items="tabItems"/>
                        </Flex>
                        <Flex end class="w-1/3">
                            <UButton
                                color="error"
                                icon="i-mdi-close"
                                variant="link"
                                @click="isStylingOpened = false"/>
                        </Flex>
                    </Flex>
                    <Transition name="slide-fade" mode="out-in">
                        <component :is="elements[tabSelected]" />
                    </Transition>
                </Flex>
            </template>
        </UDrawer>
    </div>
</template>
