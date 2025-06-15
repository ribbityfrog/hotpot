<script setup lang="ts">

const shade = defineModel<ThemeShade>({
    type: String as PropType<ThemeShade>,
    required: true
})

</script>

<template>
    <USelectMenu
        v-model="shade"
        color="neutral"
        :items="genItems(themeShades)"
        value-key="value"
        class="w-38">
        <template #leading="{ modelValue }">
            <div :class="`mt-0.5 h-3 w-5 rounded-full ${getChipColor(modelValue)}`" />
        </template>
        <template #item-leading="{ index }">
            <div :class="`mt-0.5 h-3 w-5 rounded-full ${getChipColor(themeShades![index])}`" />
        </template>
    </USelectMenu>
</template>
