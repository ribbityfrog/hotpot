<script setup lang="ts">

const isOpened = defineModel<boolean>('open', { default: false })

const props = defineProps({
    text: {
        type: String,
        default: 'Are you sure ?'
    },
    confirm: {
        type: String,
        default: 'Yes'
    },
    cancel: {
        type: String,
        default: 'Cancel'
    }
})

const emit = defineEmits(['success', 'fail', 'anyway'])

function success() {
    emit('success')
    anyway({ success: true, fail: false })
}

function fail() {
    emit('fail')
    anyway({ success: false, fail: true })
}

function anyway(result: { success: boolean, fail: boolean }) {
    emit('anyway', result)
    isOpened.value = false
}

</script>

<template>
    <UPopover v-model:open="isOpened" overlay :content="{ side: 'bottom', align: 'start' }">
        <KitButton v-bind="$attrs" @click="isOpened = true">
            <slot>Button</slot>
        </KitButton>
        <template #content>
            <Flex col center class="px-5 py-3">
                <div class="mb-3">
                    <slot name="text">
                        {{ props.text }}
                    </slot>
                </div>
                <Flex center class="gap-8">
                    <KitButton base="light" color="confirm" @click="success">{{ props.confirm }}</KitButton>
                    <KitButton base="light" color="cancel" @click="fail">{{ props.cancel }}</KitButton>
                </Flex>
            </Flex>
        </template>
    </UPopover>
</template>
