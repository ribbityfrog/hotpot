<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { userEmailSchema } from '~/schemas/accounts/user'

const emits = defineEmits(['success'])

const email = reactive({
    email: '',
    confirmEmail: ''
})

const updateEmailSchema = z.object({
    confirmEmail: z.string().refine((em) => em === email.email, 'Emails have to be identical'),
}).merge(userEmailSchema)

type UpdateEmailSchema = z.infer<typeof updateEmailSchema>

function update(event: FormSubmitEvent<UpdateEmailSchema>) {
    isUpdating.value = true
    leFetch.post(`/accounts/profile/update-email`, { email: event.data.email }, {
        success: [() => emits('success')],
        fail: [() => toaster.error(toasterContents.internalError)],
        anyway: [() => isUpdating.value = false]
    })
}

const isUpdating = ref(false)

</script>

<template>
    <UForm
        :schema="updateEmailSchema"
        :state="email"
        :validate-on="[]"
        type="submit"
        @submit="update">
        <Flex col center class="gap-y-3">
            <p class="text-center">
                As a security measure, <br>
                you'll receive an email to your current address to confirm
            </p>
            <p class="text-center">
                You'll then have to reconnect to verify the new address
            </p>
            <UFormField name="email" label="Email">
                <UInput v-model="email.email" :autofocus="true" placeholder="Email" />
            </UFormField>
            <UFormField name="confirmEmail" label="Confirm email">
                <UInput v-model="email.confirmEmail" placeholder="Confirm email" />
            </UFormField>
            <KitButton base="light" type="submit" :loading="isUpdating" class="mt-2">Update email</KitButton>
        </Flex>
    </UForm>
</template>
