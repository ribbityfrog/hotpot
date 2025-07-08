<script setup lang="ts">

const props = defineProps({
    colors: {
        type: Array as PropType<ThemeColor[]>,
        required: true
    },
    stretchWidth: {
        type: String,
        default: undefined
    },
    tiny: {
        type: Boolean,
        default: false
    }
})

const isTiny = useDevice()?.isMobile ?? props.tiny

</script>

<template>
    <Flex center wrap :class="`gap-x-8 ${isTiny ? 'gap-y-4' : 'gap-y-6'}`">
        <Flex
            v-for="color in props.colors"
            :key="color"
            center
            :class="`${props.stretchWidth ? 'gap-1' : 'gap-2'}`"
            wrap>
            <Flex v-if="props.stretchWidth" start-center :class="`${props.stretchWidth} gap-2`">
                <p class="text-sm sm:text-base font-medium">{{ capitalize(color) }}</p>
                <div v-if="!$device.isMobile" class="grow h-[1px] bg-inverted" />
            </Flex>
            <p v-else class="font-medium">{{ capitalize(color) }}</p>
            <ColorSelector :tiny="isTiny" :color="color"/>
        </Flex>
    </Flex>
</template>
