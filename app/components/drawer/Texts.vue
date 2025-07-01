<script setup lang="ts">

const props = defineProps({
    tiny: {
        type: Boolean,
        default: false
    }
})

</script>

<template>
    <ColorList :colors="[...themeColorsText]" :stretch-width="props.tiny ? 'w-32' : 'w-38'" />
</template>
