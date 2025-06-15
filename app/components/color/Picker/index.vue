<script setup lang="ts">

const props = defineProps({
    shade: {
        type: String as PropType<ThemeShade>,
        required: true
    }
})

</script>

<template>
    <ColorPickerPopup :shade="props.shade">
        <UButton :label="capitalize(props.shade)" color="neutral" variant="outline">
            <template #leading>
                <span :class="`bg-${shade}-500`" class="size-3 rounded-full" />
            </template>
        </UButton>
    </ColorPickerPopup>
</template>
