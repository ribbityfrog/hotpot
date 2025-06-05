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
        <Section class-content="gap-y-2">
            <h1>Theming</h1>
            <p>Shades and Colors are saved/reloaded/reseted independently from each other</p>
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
            <ThemeSavingShades class="sm:self-start" />
        </Section>
        <Section start class="mt-8">
            <h2>Colors</h2>
            <p>Switch from dark to light mode on the top-right to define the defaults colors for both modes</p>
            <p>Main and Neutral are saved/reloaded/reseted together</p>
        </Section>
        <Section class-content="mt-8 gap-y-8 sm:gap-y-4">
            <h3 class="self-start">Main colors</h3>
            <ThemeColorSelection v-for="(color, index) in themeShadeEntries.filter((color) => color !== 'neutral')" :key="index" :label="color.charAt(0).toUpperCase() + color.slice(1)" :color="color" />
            <USeparator class="w-1/2 my-4" />
            <Flex full between>
                <Flex center class="gap-x-4">
                    <p class="font-medium">Background</p>
                    <ColorSelector color="bg" />
                    <img src="/img/monster.gif" class="h-16 scale-x-[-1]" >
                </Flex>
                <img src="/img/kermit.gif" class="h-16 scale-x-[-1]" >
            </Flex>
            <ThemeSavingColors class="sm:self-start" />
        </Section>
        <Section class="mt-8">
            <div class="self-start">
                <h3>Neutral</h3>
                <p>
                    Allows proper design and consistency and accessibility between modes, <ULink to="https://ui.nuxt.com/getting-started/theme#neutral">see more</ULink>
                </p>
            </div>
            <ThemeSavingColors class="sm:self-start" />
        </Section>
    </Page>
</template>
