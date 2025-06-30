<script setup lang="ts">

const props = defineProps({
    color: {
        type: String as PropType<ThemeColorText>,
        required: true
    }
})

</script>

<template>
    <Flex center class="gap-6" wrap>
        <Flex col center-start class="gap-y-1.5">
            <p :class="`${props.color} text-xs`">text-xs/font-normal</p>
            <p :class="`${props.color} text-sm`">text-sm/font-normal</p>
            <p :class="props.color">text-base/font-normal</p>
            <p :class="`${props.color} font-medium`">text-base/font-medium</p>
        </Flex>
        <Flex col center-start class="gap-y-3">
            <p :class="`${props.color} text-lg`">text-lg/font-normal</p>
            <p :class="`${props.color} text-lg font-medium`">text-lg/font-medium</p>
            <p :class="`${props.color} text-lg font-semibold`">text-lg/font-semibold</p>
        </Flex>
        <Flex col center-start class="gap-y-3">
            <p :class="`${props.color} text-xl`">text-xl/font-medium</p>
            <p :class="`${props.color} text-xl font-semibold`">text-xl/font-semibold</p>
            <p :class="`${props.color} text-xl font-bold`">text-xl/font-bold</p>
        </Flex>
    </Flex>
</template>
