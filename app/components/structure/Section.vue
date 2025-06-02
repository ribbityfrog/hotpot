<script setup lang="ts">

const props = defineProps({
    title: {
        type: String,
        default: undefined
    },
    titleCenter: {
        type: Boolean,
        default: false
    },
    titleSpace: {
        type: String,
        default: 'mb-6'
    },
    layout: {
        type: String,
        default: 'flex flex-col'
    },
    start: {
        type: Boolean,
        default: false
    },
    end: {
        type: Boolean,
        default: false
    },
    group: {
        type: Boolean,
        default: false
    },
    wide: {
        type: Boolean,
        default: false
    },
    full: {
        type: Boolean,
        default: false
    },
    w: {
        type: String,
        default: undefined
    },
    backgroundImage: {
        type: String,
        default: undefined
    },
    backgroundDisplay: {
        type: String,
        default: 'bg-cover bg-center'
    },
    classSection: {
        type: String,
        default: ''
    },
    classContent: {
        type: String,
        default: ''
    },
    shadow: {
        type: Boolean,
        default: false
    },
    debug: {
        type: Boolean,
        default: false
    },
})

const debugSection = props.debug ? 'bg-gray-200 border-2 border-orange-300' : ''
const debugContent = props.debug ? 'bg-gray-300 border-2 border-orange-400' : ''

let wideness = ''
if (props.w)
    wideness = props.w
else if (props.wide)
    wideness = 'max-w-screen-desktop'
else if (props.full)
    wideness = ''
else 
    wideness = 'max-w-screen-laptop'

const styleBlock = props.backgroundImage !== undefined ? `background-image: url('${props.backgroundImage}')` : ''
const classBlock = `w-full flex flex-col items-center ${props.group ? '' : 'px-4 sm:px-8 xl:px-12'} ${props.backgroundImage !== undefined ? props.backgroundDisplay : ''} bg-no-repeat ${props.shadow ? 'shadow-section z-10' : ''}`

const classSection = `w-full flex flex-col items-center ${wideness} ${props.classSection} ${debugSection}`

const classTitle = `w-full ${props.titleSpace}`

let contentPosition = 'items-center justify-start'
if (props.start)
    contentPosition = 'items-start justify-start'
else if (props.end)
    contentPosition = 'items-end justify-start'

const classContent = `w-full ${props.layout} ${contentPosition} ${props.classContent} ${debugContent}`

</script>

<template>
    <section :class="classBlock" :style="styleBlock">
        <div :class="classSection">
            <h2 v-if="props.title !== undefined || $slots.title !== undefined" :class="classTitle" :center="props.titleCenter">
                <slot name="title">{{ props.title }}</slot>
            </h2>
            <div :class="classContent">
                <slot />
            </div>
        </div>
    </section>
</template>
