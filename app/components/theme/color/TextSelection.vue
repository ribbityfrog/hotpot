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

const colorStyle = props.color === 'text' || !props.color.includes('text') ? 'text' : props.color

</script>

<template>
    <Flex start-center class="gap-x-4">
        <p class="font-medium w-42">{{ props.label }}</p>
        <ColorSelector :color="colorStyle" />
        <Flex start-center :class="`gap-6 ${colorStyle === 'text-inverted' ? 'bg-inverted rounded-md p-2' : ''}`" wrap>
            <Flex col center-start class="gap-y-3">
                <p :class="`${colorStyle} text-sm`">text-sm/font-normal</p>
                <p :class="colorStyle">text-base/font-normal</p>
                <p :class="`${colorStyle} font-medium`">text-base/font-medium</p>
            </Flex>
            <Flex col center-start class="gap-y-3">
                <p :class="`${colorStyle} text-lg`">text-lg/font-normal</p>
                <p :class="`${colorStyle} text-lg font-medium`">text-lg/font-medium</p>
                <p :class="`${colorStyle} text-lg font-semibold`">text-lg/font-semibold</p>
            </Flex>
            <Flex col center-start class="gap-y-3">
                <p :class="`${colorStyle} text-xl`">text-xl/font-medium</p>
                <p :class="`${colorStyle} text-xl font-semibold`">text-xl/font-semibold</p>
                <p :class="`${colorStyle} text-xl font-bold`">text-xl/font-bold</p>
            </Flex>
        </Flex>
    </Flex>
</template>
