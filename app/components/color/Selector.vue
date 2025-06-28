<script setup lang="ts">

const nuxtApp = useNuxtApp()
const colorMode = useColorMode()

const props = defineProps({
    color: {
        type: String as PropType<ThemeColor>,
        required: true
    },
    tiny: {
        type: Boolean,
        default: false
    }
})

const itemShades: Ref<{ label: string, value: ThemeShadeExtended }[]> = ref(
    themeShadesExtended.map(shade => ({ label: capitalize(shade), value: shade }))
)

function defineSelection(mode: string) {
    const colors = mode === 'dark' ? theme.colorsDark : theme.colors
    const shadeTint = colors[props.color].split('-')
    return {
        shade: shadeTint[0] as ThemeShadeExtended,
        tint: (shadeTint[1] ? shadeTint[1] : '500') as ThemeTint
    }
}

const selected: Ref<{ shade: ThemeShadeExtended, tint: ThemeTint }> = ref(defineSelection(colorMode.value))

function updateColor() {
    const color: ThemeShadeTint = (selected.value.shade === 'white' || selected.value.shade === 'black' ? selected.value.shade : `${selected.value.shade}-${selected.value.tint}`) as ThemeShadeTint
    theme.setColor(props.color, color, colorMode.value)
}

watch(colorMode, (newMode) => {
    selected.value = defineSelection(newMode.value)
})

nuxtApp.hook('colors:update', () => {
    selected.value = defineSelection(colorMode.value)
})

const size = props.tiny ? 'sm' : 'md'

</script>

<template>
    <Flex center class="gap-2">
        <USelect
            v-model="selected.shade"
            :size="size"
            color="neutral"
            :items="genItems(themeShadesExtended)"
            value-key="value"
            class="w-38"
            @change="updateColor">
            <template #leading="{ modelValue }">
                <div :class="`mt-0.5 h-3 w-5 rounded-full ${getChipColor(modelValue)}`" />
            </template>
            <template #item-leading="{ index }">
                <div :class="`mt-0.5 h-3 w-5 rounded-full ${getChipColor(itemShades![index]!.value)}`" />
            </template>
        </USelect>
        <USelect
            v-model="selected.tint"
            :size="size"
            :disabled="!isThemeShade(selected.shade)"
            color="neutral"
            :items="genItems(themeTints)"
            value-key="value"
            class="w-26"
            @change="updateColor">
            <template #leading="{ modelValue }">
                <div :class="`mt-0.5 h-3 w-5 rounded-full bg-${selected.shade}-${modelValue}`" />
            </template>
            <template #item-leading="{ index }">
                <div :class="`mt-0.5 h-3 w-5 rounded-full bg-${selected.shade}-${themeTints![index]}`" />
            </template>
        </USelect>
    </Flex>
</template>
