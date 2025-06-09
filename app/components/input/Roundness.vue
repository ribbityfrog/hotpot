<script setup lang="ts">

const roundness = defineModel({
    type: String,
    default: 'rounded-md'
})

</script>

<template>
    <USelect
        v-model="roundness"
        color="neutral"
        :items="['none', ...variantSizesExtended, 'full'].map((size) => ({ label: `rounded-${size}`, value: `rounded-${size}` }))"
        value-key="value"
        class="w-26"/>
</template>
