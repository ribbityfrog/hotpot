<script setup lang="ts">
import { StylingColors } from '#components'

const tabItems: { label: string, value: TabElements }[] = [
    { label: 'Colors', value: 'colors' },
    { label: 'Backgrounds', value: 'backgrounds' },
    { label: 'Borders', value: 'borders' },
    { label: 'Texts', value: 'texts' },
]

const tabSelected: Ref<TabElements> = ref(tabItems[0]!.value)

const elements = {
    colors: StylingColors,
    backgrounds: StylingColors,
    borders: StylingColors,
    texts: StylingColors
} as const
type TabElements = keyof typeof elements

</script>

<template>
    <Page class="gap-y-8">
        <Section>
            <h1>Styling</h1>
            <h3>Preview your configuration with various components and situations</h3>
        </Section>
        <Section tight>
            <UTabs v-model="tabSelected" :items="tabItems" class="w-full sm:w-2/3"/>
        </Section>
        <Section class-content="gap-y-4">
            <component :is="elements[tabSelected]" />
        </Section>
    </Page>
</template>
