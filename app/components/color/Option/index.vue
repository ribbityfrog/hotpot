<script setup lang="ts">

const selected = defineModel<ThemeColor>({ required: true })

const props = defineProps({
    colors: {
        type: Array as PropType<ThemeColor[]>,
        default: undefined
    }
})

const items = props.colors ?? themeColors

</script>

<template>
    <USelect
        v-model="selected"
        color="neutral"
        :items="items.map((color) => ({ label: capitalize(color), value: color }))"
        value-key="value" />
</template>
