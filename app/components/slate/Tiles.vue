<script setup lang="ts">

const colorMode = useColorMode()

const slate = defineModel({
    type: Object as PropType<Slate>,
    required: true
})

const props = defineProps({
    tiny: {
        type: Boolean,
        default: false
    }
})

const isMouseDown = useState('isMouseDown')

const tints = Object.keys(slate.value.tints) as ThemeTint[]

const selected = computed(() => colorMode.value === 'dark' ? slate.value.darkTint : slate.value.lightTint)

function select(tint: ThemeTint, hovering: boolean = false) 
{
    if (hovering && !isMouseDown.value) return

    if (colorMode.value === 'dark')
        slate.value.darkTint = tint
    else
        slate.value.lightTint = tint
    slate.value.applyColor()
}

const defaultSize = props.tiny ? 'w-4 h-4' : 'w-8 h-6'
const selectedSize = props.tiny ? 'w-6 h-6' : 'w-10 h-8'
const defaultTile = `${props.tiny ? 'hover:h-5' : 'hover:h-7'} hover:cursor-pointer`
const selectedTile = `hover:cursor-grab active:cursor-grabbing  ${props.tiny ? 'rounded-sm' : 'rounded-md'}`

function defineTile(tint: ThemeTint) {
    // if (slate.value.name === 'neutral')
    //     return `${defaultSize} hover:cursor-default`
    if (selected.value === tint)
        return `${selectedSize} ${selectedTile}`
    else
        return `${defaultSize} ${defaultTile}`
}

</script>

<template>
    <Flex center>
        <div
            v-for="tint in tints"
            :key="tint"
            :class="`transform duration-200 ease-in-out ${defineTile(tint)} bg-${slate.name}-${tint}`"
            @click="select(tint)"
            @mouseenter="select(tint, true)" />
    </Flex>
</template>
