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
        <Flex col center class="transform-color duration-150 ease-in-out size-7 sm:size-11 my-1 hover:bg-primary">
            <UIcon :name="props.name" class="transform duration-300 ease-in-out size-6 sm:size-10 hover:size-5 sm:hover:size-9 hover:cursor-pointer" />
        </Flex>
    </UTooltip>
</template>
