<script setup lang="ts">

const props = defineProps({
    colors: {
        type: Array as PropType<ThemeColor[]>,
        required: true
    }
})

</script>

<template>
    <Flex full center wrap class="gap-x-8 gap-y-6">
        <Flex v-for="color in props.colors" :key="color" center class="gap-1">
            <Flex start-center class="w-30 gap-2">
                <p class="font-medium">{{ capitalize(color) }}</p>
                <div class="grow h-[1px] bg-inverted" />
            </Flex>
            <ColorSelector :color="color"/>
        </Flex>
    </Flex>
</template>
