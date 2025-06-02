<script setup lang="ts">

const props = defineProps({
    to: {
        type: String,
        required: true
    },
    tab: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: 'Link'
    },
    arrow: {
        type: Boolean,
        default: false
    },
    uppercase: {
        type: Boolean,
        default: false
    },
    medium: {
        type: Boolean,
        default: false
    },
    offsetLine: {
        type: Boolean,
        default: false
    },
    strong: {
        type: Boolean,
        default: false
    }
})

const classLink = `transition-all ease-in-out duration-300 ${props.medium || props.strong ? 'font-medium hover:font-semibold' : 'hover:font-medium'} ${props.offsetLine || props.strong ? 'underline-offset-4 hover:underline-offset-8' : 'underline-offset-2 hover:underline-offset-4'} ${props.uppercase || props.strong ? 'uppercase' : ''} text-primary underline`

</script>

<template>
    <NuxtLink :to="props.to" :target="props.tab ? '_blank' : '_self'" :class="classLink">
        <span class="font-medium">{{ props.arrow ? '→ ' : '' }}</span><slot>{{ props.label }}</slot>
    </NuxtLink>
</template>
