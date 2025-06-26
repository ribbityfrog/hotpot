<script setup lang="ts">

const colorMode = useColorMode()

const slate = defineModel({
    type: Object as PropType<Slate>,
    required: true
})

const tints = Object.keys(slate.value.tints) as ThemeTint[]

const selected = computed(() => colorMode.value === 'dark' ? slate.value.darkTint : slate.value.lightTint)

function select(tint: ThemeTint) 
{
    if (colorMode.value === 'dark')
        slate.value.darkTint = tint
    else
        slate.value.lightTint = tint
    slate.value.applyColor()
}

const defaultSize = 'w-8 h-6'
const selectedSize = 'w-10 h-8'
const defaultTile = 'hover:h-7 hover:cursor-pointer'
const selectedTile = 'hover:cursor-default rounded-md'

function defineTile(tint: ThemeTint) {
    if (slate.value.name === 'neutral')
        return `${defaultSize} hover:cursor-default`
    else if (selected.value === tint)
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
            @click="select(tint)" />
    </Flex>
</template>
