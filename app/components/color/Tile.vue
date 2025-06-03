<script setup lang="ts">

const props = defineProps({
    code: {
        type: Boolean,
        default: false
    },
    color: {
        type: String as PropType<ThemeColor>,
        required: true
    }
})

</script>

<template>
    <Flex
        v-for="(shade, idx) in shades[props.color].bg"
        :key="shade"
        col
        center
        :class="`w-1/13 sm:1/11 h-8 xl:h-12 ${shade}`">
        <p v-if="!$device.isMobile && props.code" class="text-xs px-0.5 bg-neutral-700/60 text-white">
            {{ theme.colors[props.color].shades[idx]?.hex3 ?? 'error' }}
        </p>
    </Flex>
</template>
