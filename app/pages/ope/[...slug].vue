<script setup lang="ts">
import { isOperationType, type OperationType } from '~/schemas/accounts/types'

// defineI18nRoute(false)

definePageMeta({
    layout: 'empty'
})

if (import.meta.client)
{
    // const localePath = useLocalePath()

    const keys = useRoute().params.slug

    if (Array.isArray(keys) && keys.length == 3 && isOperationType(keys[0]!))
        leFetch.post(`/accounts/operation/${keys[0]}`, { searchKey: keys[1], verificationKey: keys[2] },
            {
                success: [(p) => {
                    switch (keys[0] as OperationType)
                    {
                    case 'connect':
                        leAuth.login(p.data)
                        break
                    case 'update-email':
                        operation.value = 'update-email'
                        leAuth.logout(false)
                        break
                    }
                }],
                fail: [() => navigateTo('/')]
            }
        )
    else
        navigateTo('/')
}

const operation: Ref<OperationType | undefined> = ref(undefined)

</script>

<template>
    <Page middle>
        <Section>
            <Flex
                v-if="operation === 'update-email'"
                full
                col
                center
                class="gap-y-6">
                <p>
                    Your email has been changed and you have been automatically logged out<br>
                    Please login with your new email using the passwordless method to re-verify your account
                </p>
                <Flex full evenly>
                    <AccountLogin passwordless />
                    <KitButton color="second">Return to home</KitButton>
                </Flex>
            </Flex>
        </Section>
    </Page>
</template>
