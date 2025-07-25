<script setup lang="ts">
import { DrawerSlates, DrawerBackgrounds, DrawerBorders, DrawerTexts, DrawerSpacing } from '#components'

const tabItems: { icon: string, value: TabElement }[] = [
    { icon: 'i-mdi-color', value: 'colors' },
    { icon: 'i-mdi-format-paint', value: 'bg-colors' },
    { icon: 'i-mdi-border-all', value: 'border-colors' },
    { icon: 'i-mdi-writing-system-latin', value: 'text-colors' },
    { icon: 'i-mdi-border-radius', value: 'spacing' }
]

const elements = {
    colors: DrawerSlates,
    'bg-colors': DrawerBackgrounds,
    'border-colors': DrawerBorders,
    'text-colors': DrawerTexts,
    'spacing': DrawerSpacing
} as const
type TabElement = keyof typeof elements

const isStylingOpened = ref(false)
const tabSelected: Ref<TabElement> = ref('colors')

function openStyling(tab: TabElement) {
    tabSelected.value = tab
    isStylingOpened.value = true
}

const isSideOpen = ref(false)

</script>

<template>
    <div class="rounded-full bg-inverted text-inverted fixed bottom-4 z-20 px-4 sm:px-10 hadow-element dark:shadow-element-dark">
        <Flex center class="gap-3">
            <DrawerMenuIcon name="i-mdi-color" tooltip="Colors" @click="openStyling('colors')" />
            <DrawerMenuIcon name="i-mdi-format-paint" tooltip="Backgrounds colors" @click="openStyling('bg-colors')" />
            <DrawerMenuIcon name="i-mdi-border-all" tooltip="Borders colors" @click="openStyling('border-colors')" />
            <DrawerMenuIcon name="i-mdi-writing-system-latin" tooltip="Texts colors" @click="openStyling('text-colors')" />
            <DrawerMenuIcon name="i-mdi-border-radius" tooltip="Texts colors" @click="openStyling('spacing')" />
            <div class="w-[1px] h-10 bg-muted" />
            <Menu
                menu="drawOptions"
                color="primary"
                :ui="{ content: 'bg-inverted', item: 'text-inverted' }">
                <DrawerMenuIcon name="i-mdi-hamburger" tooltip="Options" />
            </Menu>
        </Flex>

        <UDrawer
            :key="+isSideOpen"
            v-model:open="isStylingOpened"
            :direction="isSideOpen ? 'left' : 'bottom'"
            :overlay="false"
            handle-only >
            <template #content>
                <Flex full col start-center :class="`gap-4 ${isSideOpen ? 'pl-4 py-4' : 'px-2 pb-6'}`">
                    <Flex full between-start class="gap-12">
                        <Flex start-center class="w-1/3">
                            <DarkSwitch />
                            <Flex v-if="!isSideOpen && !$device.isMobile" center class="w-full">
                                <UButton
                                    variant="outline"
                                    color="info"
                                    size="sm"
                                    label="dock on the left"
                                    @click="isSideOpen = true" />
                            </Flex>
                        </Flex>
                        <Flex v-if="!$device.isMobile" center class="w-1/3">
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
                    <Flex v-if="$device.isMobile" center class="w-1/3">
                        <UTabs v-model="tabSelected" size="xl" variant="link" :items="tabItems"/>
                    </Flex>
                    <Transition name="slide-fade" mode="out-in">
                        <component :is="elements[tabSelected]" :col="isSideOpen" tiny />
                    </Transition>
                    <div class="grow" />
                    <UButton
                        v-if="isSideOpen || $device.isMobile"
                        size="lg"
                        variant="outline"
                        color="info"
                        :label="isSideOpen ? 'dock on the bottom' : 'dock on the left'"
                        @click="isSideOpen = !isSideOpen" />
                </Flex>
            </template>
        </UDrawer>
    </div>
</template>
