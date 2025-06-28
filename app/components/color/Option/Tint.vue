<script setup lang="ts">

const tint = defineModel<ThemeTint>({
    type: String as PropType<ThemeTint>,
    required: true
})

const props = defineProps({
    shade: {
        type: String as PropType<ThemeShadeExtended>,
        required: true
    }
})

</script>

<template>
    <div>
        <USelect
            v-if="props.shade !== 'white' && props.shade !== 'black'"
            v-model="tint"
            color="neutral"
            :items="[...themeTints]"
            value-key="value"
            class="w-26">
            <template #leading="{ modelValue }">
                <div :class="`mt-0.5 h-3 w-5 rounded-full bg-${props.shade }-${modelValue}`" />
            </template>
            <template #item-leading="{ index }">
                <div :class="`mt-0.5 h-3 w-5 rounded-full bg-${props.shade }-${themeTints[index]}`" />
            </template>
        </USelect>
    </div>
</template>
