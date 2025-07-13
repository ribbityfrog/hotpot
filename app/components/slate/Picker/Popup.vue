<script setup lang="ts">

const slate = defineModel({
    type: Object as PropType<Slate>,
    required: true
})

const picker = ref(slate.value.color.hex3)
const input = ref(slate.value.color.hex3)

watch(picker, (newColor) => {
    if (newColor?.[0] !== '#') {
        picker.value = `#${newColor}`
        console.log('meh')
        return
    }
    if (newColor?.length < 7) {
        picker.value = newColor.padEnd(7, '0')
        console.log('meh')
        return
    }
    if (newColor?.length > 7) {
        picker.value = newColor.slice(0, 7)
        console.log('meh')
        return
    }

    input.value = picker.value
    slate.value.color.update(newColor)
})

watch(theme.slatesRef, (newColors) => {
    picker.value = newColors[slate.value.name].color.hex3
    input.value = newColors[slate.value.name].color.hex3
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
                    <UButton v-if="picker !== input" square color="success" @click="picker = input">OK</UButton>
                    <div v-else class="size-8" />
                </Flex>
            </Flex>
        </template>
    </UPopover>
</template>
