<script setup lang="ts">
const props = defineProps({
    name: {
        type: String,
        required: true
    }
})
</script>

<template>
    <UDrawer :overlay="false">
        <UIcon :name="props.name" class="transform duration-150 ease-in-out size-8 hover:size-9 hover:text-primary hover:cursor-pointer" />
        <template #content>
            <slot />
        </template>
    </UDrawer>
</template>
