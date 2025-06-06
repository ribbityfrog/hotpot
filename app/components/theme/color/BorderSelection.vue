<script setup lang="ts">

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    color: {
        type: String as PropType<ThemeColor>,
        required: true
    }
})

const colorStyle = props.color === 'border' || !props.color.includes('border') ? 'border' : props.color

</script>

<template>
    <Flex center class="gap-x-4" wrap>
        <p class="font-medium w-36">{{ props.label }}</p>
        <ColorSelector :color="colorStyle" />
        <Flex col center class="gap-y-2">
            <div :class="`w-72 border-t border-[1px] ${colorStyle}`" />
            <div :class="`w-72 border-t border-2 ${colorStyle}`" />
            <div :class="`w-72 border-t border-4 ${colorStyle}`" />
        </Flex>
    </Flex>
</template>
