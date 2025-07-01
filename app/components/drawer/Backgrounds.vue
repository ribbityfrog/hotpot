<script setup lang="ts">

const props = defineProps({
    tiny: {
        type: Boolean,
        default: false
    }
})

</script>

<template>
    <ColorList :colors="[...themeColorsBackground]" :stretch-width="props.tiny ? 'w-26' : 'w-30'" />
</template>
