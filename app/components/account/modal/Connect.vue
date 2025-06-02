<script setup lang="ts">

const isOpened = ref(false)

</script>

<template>
    <KitModal
        v-model:open="isOpened"
        title="Login"
        description="Login or create an account">
        <template #opener>
            <KitButton short="link">Login</KitButton>
        </template>
        <AccountConnect v-if="isOpened" />
    </KitModal>
</template>
