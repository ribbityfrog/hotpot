<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import type { UserCredentialsSchema, UserEmailSchema } from '~/schemas/accounts/user'
import { userCredentialsSchema, userEmailSchema } from '~/schemas/accounts/user'

const emits = defineEmits(['sent', 'connected'])

const props = defineProps({
    passwordless: {
        type: Boolean,
        default: false
    }
})

const credentials = reactive({
    email: '',
    password: '',
})

const credentialsPasswordless = reactive({
    email: '',
})

function submit(event: FormSubmitEvent<UserCredentialsSchema>) {
    isLoading.value = true
    leFetch.post('/accounts/request/login', event.data,
        {
            success: [(p) => {
                leAuth.login(p.data, false)
                emits('connected')
            }],
            fail: [() => {
                isLoading.value = false
                hasFailed.value = true
                toaster.error(toasterContents.loginFailed)
            }] 
        })
}

function submitPasswordless(event: FormSubmitEvent<UserEmailSchema>) {
    isLoading.value = true
    leFetch.post('/accounts/request/login-passwordless', event.data,
        {
            success: [() => {
                isLoading.value = false
                emits('sent')
            }],
            fail: [() => {
                isLoading.value = false
                toaster.error(toasterContents.internalError)
            }] 
        })
}

const passwordlessLogin = ref(props.passwordless)
const isLoading = ref(false)
const hasFailed = ref(false)

</script>

<template>
    <Transition name="slide-fade" mode="out-in">
        <Flex v-if="!passwordlessLogin" col center class="gap-y-3">
            <UForm
                :schema="userCredentialsSchema"
                :state="credentials"
                :validate-on="[]"
                @submit="submit">
                <Flex col center class="gap-y-4">
                    <div class="space-y-3" >
                        <UFormField name="email">
                            <UInput v-model="credentials.email" :autofocus="true" placeholder="Email" @change="credentialsPasswordless.email = credentials.email" />
                        </UFormField>
                        <UFormField name="password">
                            <UInput v-model="credentials.password" type="password" placeholder="Password" />
                        </UFormField>
                    </div>
                    <KitButton base="light" type="submit" :loading="isLoading">Login</KitButton>
                </Flex>
            </UForm>
            <p v-if="hasFailed" class="text-center text-error">
                Are you sure you have an account ? <br>
                First time ? Login without password to activate your account <br>
                If you have been banned, you'll received an email shortly
            </p>
            <KitButton variant="link" color="second" base="light" @click="passwordlessLogin = true">Login without password</KitButton>
        </Flex>
        <Flex v-else col center class="gap-y-3">
            <UForm
                :schema="userEmailSchema"
                :state="credentialsPasswordless"
                :validate-on="[]"
                @submit="submitPasswordless">
                <Flex col center class="gap-y-4">
                    <div class=space-y-3>
                        <UFormField name="email">
                            <UInput v-model="credentialsPasswordless.email" :autofocus="true" placeholder="Email" @change="credentials.email = credentialsPasswordless.email" />
                        </UFormField>
                    </div>
                    <KitButton base="light" type="submit" :loading="isLoading">Send connection link</KitButton>
                </Flex>
            </UForm>
            <KitButton
                v-if="!props.passwordless"
                variant="link"
                color="second"
                base="light"
                @click="passwordlessLogin = false">Login with password</KitButton>
        </Flex>
    </Transition>
</template>
