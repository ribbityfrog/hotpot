<script setup lang="ts">

const isSent = ref(false)
const hasAccount = ref(true)

</script>

<template>
    <Transition name="slide-fade" mode="out-in">
        <Transition v-if="!isSent" name="slide-fade" mode="out-in">
            <Flex v-if="hasAccount" col center class="gap-y-4">
                <KitButton short="link" @click="hasAccount = false">New around here ? Create an account</KitButton>
                <AccountLogin @sent="isSent = true" />
            </Flex>
            <Flex v-else col center class="gap-y-4">
                <KitButton short="link" @click="hasAccount = true">I have an account</KitButton>
                <AccountCreate @sent="isSent = true" />
            </Flex>
        </Transition>
        <div v-else class="text-center text-lg">
            <p v-if="hasAccount">
                Follow the link you received by email to login <br >
                If you didn't receive an email, be sure you have an account and you entered the right email
            </p>
            <p v-else>
                Follow the link you received by email to login <br >
                The first connection by email will validate your account, you will then be able to login using your password
            </p>
        </div>
    </Transition>
</template>
