<script setup lang="ts">

const shade: Ref<ThemeShade> = ref('primary')
const compShade: Ref<ThemeShade> = ref('primary')

</script>

<template>
    <Flex col center class="gap-6">
        <Flex center class="gap-4" wrap>
            <Flex
                v-for="bg in themeColorsBackground"
                :key="bg"
                col
                center
                :class="`${bg} px-6 pb-6 pt-4 border-2 border-default`">
                <ColorSelector col :color="bg" labeled :label-inverted="bg === 'bg-inverted'" />
            </Flex>
        </Flex>
        <Flex full center class="gap-6" wrap>
            <Flex col center class="gap-6">
                <Flex col end class="border-2 border-default p-4 rounded-xl">
                    <p class="font-medium self-center mb-4">Comparison</p>
                    <Flex v-for="bg in themeColorsBackground.filter(bg => bg !== 'bg-default')" :key="bg" center class="gap-4">
                        <p>{{ bg }}</p>
                        <div :class="`w-32 h-6 ${bg}`" />
                    </Flex>
                </Flex>
                <Flex col end class="border-2 border-default p-4 rounded-xl">
                    <p class="font-medium self-center">Comparison with text</p>
                    <p class="text-sm self-center mb-2">bg-inverted is used with text-inverted</p>
                    <Flex v-for="bg in themeColorsBackground" :key="bg" center class="gap-4">
                        <p>{{ bg }}</p>
                        <p :class="`px-4 py-2 ${bg} ${bg === 'bg-inverted' ? 'text-inverted' : ''}`">
                            Be kind to frogs
                        </p>
                    </Flex>
                </Flex>
            </Flex>
            <Flex col end class="border-2 border-default p-4 rounded-xl">
                <p class="font-medium self-center">Comparison with colors</p>
                <ColorOptionShade v-model="shade" class="self-center my-2" />
                <Flex v-for="bg in themeColorsBackground" :key="bg" center class="gap-4">
                    <p>{{ bg }}</p>
                    <Flex center :class="`px-6 py-4 gap-x-4 ${bg}`">
                        <UButton :color="shade" icon="i-lucide-cat" square />
                        <p :class="`text-${shade}`">Hello <span class="font-medium">kitty</span></p>
                    </Flex>
                </Flex>
            </Flex>
            <Flex col center class="border-2 border-default p-4 rounded-xl gap-y-4" wrap>
                <Flex col center class="mb-6">
                    <p class="font-medium">Some related components</p>
                    <ColorOptionShade v-model="compShade" class="mt-2" />
                </Flex>
                <UTabs :color="compShade" :items="[{ label: 'Frog' }, { label: 'Bird' }]" class="w-52" />
                <UStepper :color="compShade" :items="[{ icon: 'i-lucide-bird' }, { icon: 'i-lucide-egg' }, { icon: 'i-lucide-egg-fried' }]" size="xl" class="w-72 sm:w-82" />
                <UInput variant="soft" placeholder="Input, soft variant" :color="compShade" class="sm:w-92" />
                <UTextarea variant="subtle" placeholder="Textarea, subtle variant" :color="compShade" class="sm:w-92" />
                <UProgress :color="compShade" animation="swing" size="xl" class="sm:w-92" />
            </Flex>
        </Flex>
    </Flex>
</template>
