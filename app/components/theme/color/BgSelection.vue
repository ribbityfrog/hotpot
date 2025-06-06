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
    <Flex between wrap class="min-w-180">
        <Flex start-center class="gap-x-4" wrap>
            <p class="font-medium w-28">{{ props.label }}</p>
            <ColorSelector :color="colorStyle" />
            <img v-if="colorStyle === 'bg'" src="/img/monster.gif" class="h-16 scale-x-[-1]" >
            <Flex v-else center class="gap-4">
                <div :class="`h-12 w-12 ${colorStyle}`" />
            </Flex>
        </Flex>
        <img v-if="colorStyle === 'bg'" src="/img/kermit.gif" class="h-16 scale-x-[-1]" >
    </Flex>
</template>
