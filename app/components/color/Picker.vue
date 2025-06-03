<script setup lang="ts">

const props = defineProps({
    color: {
        type: String as PropType<ThemeColor>,
        required: true
    }
})

const picker = ref(theme.colors[props.color].hex3)
const input = ref(theme.colors[props.color].hex3)

watch(picker, (newcolor) => {
    input.value = picker.value
    theme.colors[props.color].update(newcolor, props.color)
})

</script>

<template>
    <UPopover>
        <UButton :label="props.color.charAt(0).toUpperCase() + props.color.slice(1)" color="neutral" variant="outline">
            <template #leading>
                <span :class="shades[props.color].bg[5]" class="size-3 rounded-full" />
            </template>
        </UButton>

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
