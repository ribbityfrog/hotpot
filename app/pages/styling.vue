<script setup lang="ts">
import { StylingStyle, StylingColors, StylingBackgrounds, StylingBorders, StylingTexts } from '#components'

let fragment = useRoute().hash
if (fragment.startsWith('#')) fragment = fragment.slice(1)

const tabItems: { label: string, value: TabElements }[] = [
    { label: 'Style', value: 'style' },
    { label: 'Colors', value: 'colors' },
    { label: 'Backgrounds', value: 'backgrounds' },
    { label: 'Borders', value: 'borders' },
    { label: 'Texts', value: 'texts' },
]

const elements = {
    style: StylingStyle,
    colors: StylingColors,
    backgrounds: StylingBackgrounds,
    borders: StylingBorders,
    texts: StylingTexts
} as const
type TabElements = keyof typeof elements

const tabSelected: Ref<TabElements> = ref(Object.keys(elements).includes(fragment) ? fragment as TabElements : 'style')

watch(tabSelected, (newTab) => {
    window.location.hash = newTab
})

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
        <Section full class-content="gap-y-4">
            <Transition name="slide-fade" mode="out-in">
                <component :is="elements[tabSelected]" />
            </Transition>
        </Section>
    </Page>
</template>
