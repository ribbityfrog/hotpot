<script setup lang="ts">

const props = defineProps({
    title: {
        type: String,
        default: 'Title'
    },
    center: {
        type: Boolean,
        default: false
    },
    right: {
        type: Boolean,
        default: false
    },
    space: {
        type: String,
        default: 'mt-2 mb-1'
    },
    noSpace: {
        type: Boolean,
        default: false
    }
})

const classH = `${props.center ? 'text-center' : ''} ${props.right ? 'text-right' : ''} ${props.noSpace ? '' : props.space}`

</script>

<template>
    <h4 :class="`font-title text-lg sm:text-lg font-semibold !leading-tight ${classH}`">
        <slot>{{ props.title }}</slot>
    </h4>
</template>
