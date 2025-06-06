<script setup lang="ts">

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    color: {
        type: String as PropType<Exclude<ThemeShade, 'neutral'>>,
        required: true
    }
})

</script>

<template>
    <Flex center class="gap-4" wrap>
        <p class="w-22 font-medium">{{ props.label }}</p>
        <ColorSelector :color="props.color" />
        <UButton :color="props.color" label="Button" />
        <UButton :color="props.color" icon="i-lucide-bird" disabled label="Disabled" />
        <UButton :color="props.color" variant="outline" label="Outlined" />
        <UChip :color="props.color" size="lg">
            <UBadge icon="i-lucide-check" :color="props.color" size="md" label="Badge" />
        </UChip>
        <USlider :default-value="50" :color="props.color" class="w-22" />
        <USwitch :default-value="true" :color="props.color" />
    </Flex>
</template>
