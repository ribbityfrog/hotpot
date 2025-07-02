<script setup lang="ts">

const selectedBg: Ref<ThemeColorBackground> = ref('bg-default')
const selectedText: Ref<ThemeColorText> = ref('text-default')

const tabs = [{
    label: 'Text variants',
    value: 'text' as const
}, {
    label: 'Background variants',
    value: 'bg' as const
}]

const selectedTab = ref('text')

</script>

<template>
    <Flex col center class="gap-y-6">
        <UTabs v-model="selectedTab" :items="tabs" value-key="value" variant="link" />
        <Flex v-if="selectedTab === 'text'" col center class="gap-6">
            <ColorOption v-model="selectedBg" :colors="[...themeColorsBackground]" class="w-34" />
            <Flex center class="gap-6" wrap>
                <div v-for="color in themeColorsText" :key="color" :class="`${selectedBg} border-2 p-4 space-y-4 rounded-lg`" >
                    <ColorSelector :color="color" labeled :label-inverted="selectedBg === 'bg-inverted'" />
                    <StylingTextsSample :color="color" />
                </div>
            </Flex>
        </Flex>
        <Flex v-else col center class="gap-6">
            <ColorOption v-model="selectedText" :colors="[...themeColorsText]" class="w-34" />
            <Flex center class="gap-6" wrap>
                <div v-for="color in themeColorsBackground" :key="color" :class="`${color} border-2 p-4 space-y-4 rounded-lg`" >
                    <ColorSelector :color="selectedText" labeled :label-inverted="color === 'bg-inverted'" />
                    <StylingTextsSample :color="selectedText" />
                </div>
            </Flex>
        </Flex>
    </Flex>
</template>
