<script setup lang="ts">

const props = defineProps({
    color: {
        type: String as PropType<ThemeColor>,
        required: true
    }
})

const picker = ref(theme.colors[props.color].hex3)

watch(picker, (newcolor) => {
    const c = new Color(newcolor)
    c.shadeGen()
    c.shadeStyle(props.color)
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
            <UColorPicker v-model="picker" class="p-2" />
        </template>
    </UPopover>
</template>
