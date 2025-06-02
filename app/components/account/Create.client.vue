<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { userCredentialsSchema } from '~/schemas/accounts/user'
import { z } from 'zod'

const emits = defineEmits(['sent'])

const credentials = reactive({
    email: '',
    password: '',
    confirmEmail: '',
})

const createSchema = z.object({
    confirmEmail: z.string().email().refine((email) => email === credentials.email, 'Emails have to be identifical'),
}).merge(userCredentialsSchema)

type CreateSchema = z.infer<typeof createSchema>

function submit(event: FormSubmitEvent<CreateSchema>) {
    isLoading.value = true
    leFetch.post('/accounts/request/create', { email: event.data.email, password: event.data.password },
        {
            success: [() => {
                isLoading.value = false
                emits('sent')
            }],
            fail: [() => toaster.error(toasterContents.internalError)] 
        })
}

const isLoading = ref(false)

</script>

<template>
    <UForm
        :schema="createSchema"
        :state="credentials"
        :validate-on="[]"
        @submit="submit">
        <Flex col center class="gap-y-3">
            <p class="text-center font-medium text-cancel">
                You'll receive an email to confirm your account<br>
                You'll not be able to login with a fake email
            </p>
            <UFormField name="email" label="Email">
                <UInput v-model="credentials.email" :autofocus="true" placeholder="Email" />
            </UFormField>
            <UFormField name="confirmEmail" label="Confirm email">
                <UInput v-model="credentials.confirmEmail" placeholder="Confirm email" />
            </UFormField>
            <UFormField name="password" label="Password">
                <UInput v-model="credentials.password" type="password" placeholder="Password" />
            </UFormField>
            <KitButton base="light" type="submit" :loading="isLoading" class="mt-2">Create your account</KitButton>
        </Flex>
    </UForm>
</template>
