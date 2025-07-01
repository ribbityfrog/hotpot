<script setup lang="ts">

const props = defineProps({
    tiny: {
        type: Boolean,
        default: false
    }
})

</script>

<template>
    <ColorList :colors="[...themeColorsBorder]" :stretch-width="props.tiny ? 'w-34' : 'w-38'" />
</template>
