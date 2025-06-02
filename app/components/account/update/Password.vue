<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { userPasswordSchema, type UserPasswordSchema } from '~/schemas/accounts/user'

const emits = defineEmits(['success'])

const password = reactive({
    password: '',
})

function update(event: FormSubmitEvent<UserPasswordSchema>) {
    isUpdating.value = true
    leFetch.patch(`/accounts/profile/update-password`, { password: event.data.password }, {
        success: [() => {
            emits('success')
            toaster.success(toasterContents.passwordUpdated)
        }],
        fail: [() => toaster.error(toasterContents.internalError)],
        anyway: [() => isUpdating.value = false]
    })
}

const isUpdating = ref(false)

</script>

<template>
    <UForm
        :schema="userPasswordSchema"
        :state="password"
        :validate-on="[]"
        type="submit"
        @submit="update">
        <Flex col center class="gap-y-3">
            <UFormField name="password" label="New password">
                <UInput v-model="password.password" :autofocus="true" type="password" placeholder="New password" />
            </UFormField>
            <KitButton base="light" type="submit" :loading="isUpdating" class="mt-2">Update password</KitButton>
        </Flex>
    </UForm>
</template>
