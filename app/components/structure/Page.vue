<script setup lang="ts">

const props = defineProps({
    debug: {
        type: Boolean,
        default: false
    },
    noGrow: {
        type: Boolean,
        default: false
    },
    middle: {
        type: Boolean,
        default: false
    }
})

const debugP = `${props.debug ? 'border-4 border-primary' : ''}`
const grow = `${props.noGrow ? '' : 'grow'}`

const center = props.middle ? 'h-full justify-center my-8' : ''

</script>

<template>
    <div :class="`flex flex-col ${grow} w-full items-center ${center} ${debugP}`">
        <slot />
    </div>
</template>
