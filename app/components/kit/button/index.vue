<script setup lang="ts">
import type { Base, Variant, Color } from '~/utils/ui/button'
import { bases, variants, colors } from '~/utils/ui/button'

type Shortcut = 'link'

const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    base: {
        type: String as PropType<Base>,
        default: 'medium'
    },
    variant: {
        type: String as PropType<Variant>,
        default: 'default'
    },
    color: {
        type: String as PropType<Color>,
        default: 'primary'
    },
    short: {
        type: String as PropType<Shortcut>,
        default: undefined
    }
})

let variantStyle, colorStyle, baseStyle

if (props.short) {
    variantStyle = variants['link']
    colorStyle = colors['link']['second']
    baseStyle = bases['light']
}
else {
    variantStyle = variants[props.variant]
    colorStyle = colors[props.variant][props.color]
    baseStyle = bases[props.base]
}

baseStyle += ' cursor-pointer'

</script>

<template>
    <UButton :class="`${baseStyle} ${variantStyle} ${colorStyle}`">
        <slot>{{ props.label }}</slot>
    </UButton>
</template>
