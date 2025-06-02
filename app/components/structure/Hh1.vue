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
        default: 'mb-3'
    },
    noSpace: {
        type: Boolean,
        default: false
    }
})

const classH = `${props.center ? 'text-center' : ''} ${props.right ? 'text-right' : ''} ${props.noSpace ? '' : props.space}`

</script>

<template>
    <h1 :class="`font-title text-2xl sm:text-4xl font-bold !leading-tight ${classH}`">
        <slot>{{ props.title }}</slot>
    </h1>
</template>
