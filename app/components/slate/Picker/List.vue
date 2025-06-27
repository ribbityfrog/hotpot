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
    <Flex full center wrap class="gap-4">
        <Flex
            v-for="slate in theme.slates"
            :key="slate.name"
            center>
            <SlatePicker v-model="theme.slates[slate.name]" :stretched="props.stretch" :tiny="props.tiny" />
        </Flex>
    </Flex>
</template>
