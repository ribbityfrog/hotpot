<script setup lang="ts">

const props = defineProps({
    code: {
        type: Boolean,
        default: false
    },
    color: {
        type: String as PropType<ThemeColor>,
        required: true
    },
    text: {
        type: Boolean,
        default: false
    },
    class: {
        type: String,
        default: ''
    }
})

</script>

<template>
    <Flex
        v-for="(shade, idx) in shades[props.color][props.text ? 'text' : 'bg']"
        :key="shade"
        col
        center
        :class="`${idx === 5 ? 'h-10 xl:h-14 rounded-md' : 'h-8 xl:h-12'} w-5 sm:w-1/13 ${props.text ? '' : shade} ${props.class}`">
        <p v-if="!$device.isMobile && props.code" :class="`${props.text ? `font-medium sm:font-semibold xl:font-extrabold ${shade}` : 'text-xs px-0.5 bg-neutral-700/60 text-white'}`">
            {{ theme.colors[props.color].shades[idx]?.hex3 ?? 'error' }}
        </p>
    </Flex>
</template>
