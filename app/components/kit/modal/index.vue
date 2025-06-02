<script setup lang="ts">

const isOpened = defineModel<boolean>('open', { default: false })

const props = defineProps({
    button: {
        type: String,
        default: 'Open'
    },
    title: {
        type: String,
        default: 'Modal title'
    },
    description: {
        type: String,
        default: ''
    },
    contentStyle: {
        type: String,
        default: 'w-11/12'
    },
    dismissible: {
        type: Boolean,
        default: false
    }
})

</script>

<template>
    <UModal v-model:open="isOpened" :title="props.title" :description="props.description" :dismissible="props.dismissible">
        <slot name="opener" @click="isOpened = true">
            <KitButton @click="isOpened = true">{{ props.button }}</KitButton>
        </slot>
        <template #body>
            <Flex col center :class="`m-auto ${props.contentStyle}`">
                <slot />
            </Flex>
        </template>
    </UModal>
</template>
