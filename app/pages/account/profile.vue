<script setup lang="ts">

const profile = leFetch.get('/accounts/profile/get')

const isEditing = ref({
    email: false,
    password: false
})

const isDeletingAccount = ref(false)
function deleteAccount() {
    isDeletingAccount.value = true
    leFetch.delete('/accounts/profile/delete', {
        success: [() => leAuth.logout()],
        fail: [() => {
            isDeletingAccount.value = false
            toaster.error(toasterContents.internalError)
        }]
    })
}

</script>

<template>
    <Page>
        <Hh1 class="mb-12">Your profile</Hh1>
        <Section start class-content="gap-y-6">
            <Transition name="fade" mode="out-in">
                <p v-if="profile.isSuccessful">
                    Email: {{ profile.data.email }}
                </p>
                <USkeleton v-else class="h-6 w-48 rounded-full" />
            </Transition>
            <KitModal v-model:open="isEditing.email" title="Update your email" button="Update your email">
                <AccountUpdateEmail @success="isEditing.email = false" />
            </KitModal>
            <KitModal v-model:open="isEditing.password" title="Update your email" button="Update your password">
                <AccountUpdatePassword @success="isEditing.password = false" />
            </KitModal>
            <KitButtonConfirm color="cancel" @success="deleteAccount()">
                Delete your account
                <template #text>
                    <p class="text-center">
                        <span class="font-semibold text-cancel">
                            The deletion is immediate and definitive. <br>
                            You'll then be redirected to Home.
                        </span> <br>
                        Are you sure ?
                    </p>
                </template>
            </KitButtonConfirm>
        </Section>
    </Page>
</template>
