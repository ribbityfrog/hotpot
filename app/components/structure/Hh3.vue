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
        default: 'mt-4 mb-1.5'
    },
    noSpace: {
        type: Boolean,
        default: false
    }
})

const classH = `${props.center ? 'text-center' : ''} ${props.right ? 'text-right' : ''} ${props.noSpace ? '' : props.space}`

</script>

<template>
    <h3 :class="`font-title text-xl sm:text-xl font-semibold !leading-tight ${classH}`">
        <slot>{{ props.title }}</slot>
    </h3>
</template>
