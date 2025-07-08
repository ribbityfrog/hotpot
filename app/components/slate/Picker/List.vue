<script setup lang="ts">

const props = defineProps({
    stretch: {
        type: Boolean,
        default: false
    },
    tiny: {
        type: Boolean,
        default: false
    }
})

</script>

<template>
    <Flex center wrap class="gap-4">
        <SlatePicker
            v-for="slate in theme.slates"
            :key="slate.name"
            v-model="theme.slates[slate.name]"
            :stretch="props.stretch"
            :tiny="props.tiny" />
    </Flex>
</template>
