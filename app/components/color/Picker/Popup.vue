<script setup lang="ts">

const props = defineProps({
    shade: {
        type: String as PropType<ThemeShade>,
        required: true
    }
})

const picker = ref(theme.shades[props.shade].hex3)
const input = ref(theme.shades[props.shade].hex3)

watch(picker, (newcolor) => {
    input.value = picker.value
    theme.shades[props.shade].update(newcolor, props.shade)
})

watch(theme.shadesRef, (newColors) => {
    picker.value = newColors[props.shade].hex3
    input.value = newColors[props.shade].hex3
})

</script>

<template>
    <UPopover>
        <slot />
        <template #content>
            <Flex col center class="gap-4 p-2">
                <UColorPicker v-model="picker" />
                <Flex center class="gap-4">
                    <UInput v-model="input" class="w-24" color="neutral" :autofocus="false" />
                    <UButton :disabled="picker === input" square color="success" @click="picker = input">OK</UButton>
                </Flex>
            </Flex>
        </template>
    </UPopover>
</template>
