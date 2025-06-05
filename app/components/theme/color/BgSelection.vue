<script setup lang="ts">

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    color: {
        type: String as PropType<ThemeColor>,
        required: true
    }
})

const colorStyle = props.color === 'bg' || !props.color.includes('bg') ? 'bg' : props.color

</script>

<template>
    <Flex full between wrap>
        <Flex start-center class="gap-x-4">
            <p class="font-medium w-28">{{ props.label }}</p>
            <ColorSelector :color="colorStyle" />
            <img v-if="colorStyle === 'bg'" src="/img/monster.gif" class="h-16 scale-x-[-1]" >
            <div v-else :class="`h-12 w-72 ${colorStyle}`" />
        </Flex>
        <img v-if="colorStyle === 'bg'" src="/img/kermit.gif" class="h-16 scale-x-[-1]" >
    </Flex>
</template>
