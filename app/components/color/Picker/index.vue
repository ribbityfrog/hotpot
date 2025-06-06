<script setup lang="ts">

const props = defineProps({
    color: {
        type: String as PropType<ThemeShade>,
        required: true
    }
})

</script>

<template>
    <ColorPickerPopup :color="props.color">
        <UButton :label="capitalize(props.color)" color="neutral" variant="outline">
            <template #leading>
                <span :class="shades[props.color].bg[5]" class="size-3 rounded-full" />
            </template>
        </UButton>
    </ColorPickerPopup>
</template>
