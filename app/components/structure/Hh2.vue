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
        default: 'mt-6 mb-2'
    },
    noSpace: {
        type: Boolean,
        default: false
    }
})

const classH = `${props.center ? 'text-center' : ''} ${props.right ? 'text-right' : ''} ${props.noSpace ? '' : props.space}`

</script>

<template>
    <h2 :class="`font-title text-xl sm:text-2xl font-bold !leading-tight ${classH}`">
        <slot>{{ props.title }}</slot>
    </h2>
</template>
