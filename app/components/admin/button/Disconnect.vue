<script setup lang="ts">

const props = defineProps({
    uid: {
        type: String,
        required: true
    }
})

const isDisconnecting = ref(false)

function disconnect() {
    isDisconnecting.value = true
    leFetch.delete(`/admin/users/disconnect/${props.uid}`, {
        success: [() => toaster.success({ title: 'Disconnection successful', description: `${props.uid} has been successfuly disconnected` })],
        fail: [() => toaster.error({ title: 'Disconnection failed', description: 'The user has not been disconnected' })],
        anyway: [() => isDisconnecting.value = false ]
    })
}

</script>

<template>
    <KitButtonConfirm base="light" :loading="isDisconnecting" color="cancel" @success="disconnect()">Disconnect</KitButtonConfirm>
</template>
