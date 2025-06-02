<script setup lang="ts">

const toggle = defineModel({ type: Boolean, required: true })

const props = defineProps({
    api: {
        type: Object as PropType<AutoPatchConfig>,
        required: true
    }
})

watch(toggle, (newState) => {
    autoPatch(props.api.ep, {
        id: props.api.id,
        [props.api.key]: newState,
    })
})

</script>

<template>
    <KitSwitch v-model="toggle"/>
</template>
