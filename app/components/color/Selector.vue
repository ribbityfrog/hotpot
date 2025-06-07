<script setup lang="ts">

const nuxtApp = useNuxtApp()
const colorMode = useColorMode()

const props = defineProps({
    color: {
        type: String as PropType<ThemeColor>,
        required: true
    }
})

const itemShades: Ref<{ label: string, value: ThemeShadeExtended }[]> = ref([
    {
        label: 'Primary',
        value: 'primary'
    },    
    {
        label: 'Secondary',
        value: 'secondary'
    },
    {
        label: 'Success',
        value: 'success'
    },
    {
        label: 'Info',
        value: 'info'
    },
    {
        label: 'Warning',
        value: 'warning'
    },
    {
        label: 'Error',
        value: 'error'
    },
    {
        label: 'Neutral',
        value: 'neutral'
    },
    {
        label: 'White',
        value: 'white'
    },
    {
        label: 'Black',
        value: 'black'
    },

])

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

</script>

<template>
    <Flex center class="gap-2">
        <USelectMenu
            v-model="selected.shade"
            color="neutral"
            :items="itemShadesExtended"
            value-key="value"
            class="w-38"
            @change="updateColor">
            <template #leading="{ modelValue }">
                <div :class="`mt-0.5 h-3 w-5 rounded-full ${getChipColor(modelValue)}`" />
            </template>
            <template #item-leading="{ index }">
                <div :class="`mt-0.5 h-3 w-5 rounded-full ${getChipColor(itemShades![index]!.value)}`" />
            </template>
        </USelectMenu>
        <USelect
            v-if="selected.shade !== 'white' && selected.shade !== 'black'"
            v-model="selected.tint"
            color="neutral"
            :items="itemTints"
            value-key="value"
            class="w-26"
            @change="updateColor">
            <template #leading="{ modelValue }">
                <div :class="`mt-0.5 h-3 w-5 rounded-full bg-${selected.shade}-${modelValue}`" />
            </template>
            <template #item-leading="{ index }">
                <div :class="`mt-0.5 h-3 w-5 rounded-full bg-${selected.shade}-${itemTints![index]!.value}`" />
            </template>
        </USelect>
    </Flex>
</template>
