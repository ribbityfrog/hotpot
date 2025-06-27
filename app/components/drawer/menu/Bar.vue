<script setup lang="ts">
import { DrawerSlates } from '#components'

const tabItems: { icon: string, value: TabItemValue }[] = [
    { icon: 'i-mdi-color', value: 'colors' },
    { icon: 'i-mdi-format-paint', value: 'bg-colors' },
    { icon: 'i-mdi-border-all', value: 'border-colors' },
    { icon: 'i-mdi-writing-system-latin', value: 'text-colors' },
]

const elements = {
    colors: DrawerSlates,
    'bg-colors': DrawerSlates,
    'border-colors': DrawerSlates,
    'text-colors': DrawerSlates
} as const
type TabItemValue = keyof typeof elements

const isOpened = ref(false)
const tabSelected: Ref<TabItemValue> = ref('colors')

</script>

<template>
    <div class="rounded-lg bg-inverted text-inverted fixed bottom-4 z-20 px-8 py-3 shadow-element dark:shadow-element-dark">
        <UDrawer v-model:open="isOpened" :overlay="false" :handle="false">
            <Flex center class="gap-3">
                <DrawerMenuIcon name="i-mdi-color" tooltip="Colors" @click="tabSelected = 'colors'" />
                <DrawerMenuIcon name="i-mdi-format-paint" tooltip="Backgrounds colors" @click="tabSelected = 'bg-colors'" />
                <DrawerMenuIcon name="i-mdi-border-all" tooltip="Borders colors" @click="tabSelected = 'border-colors'" />
                <DrawerMenuIcon name="i-mdi-writing-system-latin" tooltip="Texts colors" @click="tabSelected = 'text-colors'" />
            </Flex>
            <template #content>
                <Flex full col center class="gap-4 p-2">
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
                                @click="isOpened = false"/>
                        </Flex>
                    </Flex>
                    <component :is="elements[tabSelected]" />
                </Flex>
            </template>
        </UDrawer>
    </div>
</template>
