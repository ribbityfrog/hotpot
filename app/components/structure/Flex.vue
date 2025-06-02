<script setup lang="ts">

const props = defineProps({
    inline: {
        type: Boolean,
        default: false
    },
    col: {
        type: Boolean,
        default: false
    },
    direction: {
        type: String,
        default: undefined
    },
    wrap: {
        type: Boolean,
        default: false
    },
    tight: {
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
    center: {
        type: Boolean,
        default: false
    },
    start: {
        type: Boolean,
        default: false
    },
    end: {
        type: Boolean,
        default: false
    },
    around: {
        type: Boolean,
        default: false
    },
    evenly: {
        type: Boolean,
        default: false
    },
    between: {
        type: Boolean,
        default: false
    },
    centerStart: {
        type: Boolean,
        default: false
    },
    centerEnd: {
        type: Boolean,
        default: false
    },
    aroundStart: {
        type: Boolean,
        default: false
    },
    evenlyStart: {
        type: Boolean,
        default: false
    },
    betweenStart: {
        type: Boolean,
        default: false
    },
    betweenEnd: {
        type: Boolean,
        default: false
    },
    startCenter: {
        type: Boolean,
        default: false
    },
    startEnd: {
        type: Boolean,
        default: false
    },
    endCenter: {
        type: Boolean,
        default: false
    },
    w: {
        type: String,
        default: undefined
    },
    debug: {
        type: Boolean,
        default: false
    }
})

let debugDisplay = '' 
if (props.debug) {
    if(props.col)
        debugDisplay = 'bg-blue-200 border-2 border-blue-500 text-black'
    else if (props.inline)
        debugDisplay = 'bg-yellow-200 border-2 border-yellow-500 text-black'
    else
        debugDisplay = 'bg-purple-200 border-2 border-purple-500 text-black'
}

let width = ''
if (props.w)
    width = props.w
else if (props.tight)
    width = 'w-full max-w-laptop'
else if (props.wide)
    width = 'w-full max-w-desktop'
else if (props.full)
    width = 'w-full'

const direction = (props.direction !== undefined ? props.direction : (props.col ? 'flex-col' : `flex-row ${props.wrap ? 'flex-wrap' : ''}`))

let justifyAlign = ''
if (props.center) 
    justifyAlign = 'justify-center items-center content-center'
else if (props.start)
    justifyAlign = 'justify-start items-start content-start'
else if (props.end)
    justifyAlign = 'justify-end items-end content-end'
else if (props.around)
    justifyAlign = 'justify-around items-center content-center'
else if (props.evenly)
    justifyAlign = 'justify-evenly items-center content-center'
else if (props.between)
    justifyAlign = 'justify-between items-center content-center'
else if (props.centerStart)
    justifyAlign = 'justify-center items-start content-center'
else if (props.centerEnd)
    justifyAlign = 'justify-center items-end content-center'
else if (props.aroundStart)
    justifyAlign = 'justify-around items-start content-center'
else if (props.evenlyStart)
    justifyAlign = 'justify-evenly items-start content-center'
else if (props.betweenStart)
    justifyAlign = 'justify-between items-start content-center'
else if (props.betweenEnd)
    justifyAlign = 'justify-between items-end content-center'
else if (props.startCenter)
    justifyAlign = 'justify-start items-center content-center'
else if (props.startEnd)
    justifyAlign = 'justify-start items-end content-center'
else if (props.endCenter)
    justifyAlign = 'justify-end items-center content-center'

const classFlex = `${props.inline ? 'inline-flex' : `${width} flex ${direction}`} ${justifyAlign} ${debugDisplay}`

</script>

<template>
    <div :class="classFlex">
        <slot />
    </div>
</template>
