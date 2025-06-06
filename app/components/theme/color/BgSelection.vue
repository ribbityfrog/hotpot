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
    <Flex center class="gap-4" wrap>
        <p class="font-medium w-28">{{ props.label }}</p>
        <ColorSelector :color="colorStyle" />
        <Flex v-if="colorStyle === 'bg'" between class="gap-4 w-92">
            <img src="/img/monster.gif" class="h-16 scale-x-[-1]" >
            <img src="/img/kermit.gif" class="h-16 scale-x-[-1]" >
        </Flex>
        <Flex v-else center class="gap-4" wrap>
            <div v-if="colorStyle !== 'bg-muted'" :class="`h-12 w-12 ${colorStyle}`" />
            <div v-else :class="`h-12 w-64 ${colorStyle}`" />
            <UProgress v-if="colorStyle === 'bg-accented'" :value="50" size="xl" class="w-52" />
            <UStepper v-if="colorStyle === 'bg-elevated'" :items="[{ icon: 'i-lucide-bird' }, { icon: 'i-lucide-egg' }, { icon: 'i-lucide-egg-fried' }]" class="w-52" />
            <UTabs v-if="colorStyle === 'bg-inverted'" :items="[{ label: 'Bird' }, { label: 'Egg' }]" color="neutral" class="w-52" />
        </Flex>
    </Flex>
</template>
