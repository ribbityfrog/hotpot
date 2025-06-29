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

</script>

<template>
    <Flex center wrap :class="`gap-x-8 ${props.tiny ? 'gap-y-4' : 'gap-y-6'}`">
        <Flex v-for="color in props.colors" :key="color" center :class="`${props.stretchWidth ? 'gap-1' : 'gap-2'}`">
            <Flex v-if="props.stretchWidth" start-center :class="`${props.stretchWidth} gap-2`">
                <p class="font-medium">{{ capitalize(color) }}</p>
                <div class="grow h-[1px] bg-inverted" />
            </Flex>
            <p v-else class="font-medium">{{ capitalize(color) }}</p>
            <ColorSelector :tiny="props.tiny" :color="color"/>
        </Flex>
    </Flex>
</template>
