<script setup lang="ts">

const toggle = defineModel({ type: Boolean, required: true })

</script>

<template>
    <USwitch v-model="toggle" />
</template>
