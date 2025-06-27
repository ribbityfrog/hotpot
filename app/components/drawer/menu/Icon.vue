<script setup lang="ts">

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    tooltip: {
        type: String,
        required: true
    }
})

</script>

<template>
    <UTooltip :delay-duration="0" :text="props.tooltip">
        <UIcon :name="props.name" class="transform duration-150 ease-in-out size-10 hover:size-9 hover:text-primary hover:cursor-pointer" />
    </UTooltip>
</template>
