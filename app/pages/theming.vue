<script setup lang="ts">

const displayCodes = ref(false)
const tilesGap = ref(false)

const tab = ref('0')

const tilesGapComputed = computed(() => {
    if (tab.value === '1')
        return 'gap-x-2'
    return tilesGap.value ? 'gap-x-1.5' : ''
})

</script>

<template>
    <Page>
        <Section>
            <h1>Theming</h1>
        </Section>
        <Section class-content="gap-y-4" title="Shades">
            <Flex v-if="!$device.isMobile" full between class="gap-y-4">
                <UTabs
                    v-model="tab"
                    color="neutral"
                    :content="false"
                    :items="[{ label: 'Background' }, { label: 'Text' }]"
                    class="w-80" />
                <div v-if="tab !== '1'" class="space-y-2">
                    <Flex class="gap-x-1">
                        <UCheckbox v-model="displayCodes" color="neutral" />
                        <p class="text-sm">Display color codes</p>
                    </Flex>
                    <Flex class="gap-x-1">
                        <UCheckbox v-model="tilesGap" color="neutral" />
                        <p class="text-sm">Add a gap between tiles</p>
                    </Flex>
                </div>
            </Flex>
            <Flex
                v-for="themeShade in themeShadeEntries"
                :key="themeShade"
                full
                center
                :class="tilesGapComputed"
                wrap>
                <ColorPicker :color="themeShade" class="w-30 mr-2 sm:mr-4" />
                <ColorShades :code="displayCodes || tab === '1'" :color="themeShade" :text="tab === '1'" />
            </Flex>
            <ThemeSaving class="sm:self-start" />
        </Section>
        <Section title="Colors" :class="`mt-8`">
            <ColorSelector color="primary" />
        </Section>
        <UButton color="primary" label="Button" />
    </Page>
</template>
