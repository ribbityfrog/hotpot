<script setup lang="ts">

import type { Menu } from '~/components/structure/Menu.vue'

// const { locale, setLocale } = useI18n()

const props = defineProps({
    menu: {
        type: String as PropType<Menu>,
        default: undefined,
    },
    noLang: {
        type: Boolean,
        default: false,
    },
    noDark: {
        type: Boolean,
        default: false
    },
    noAccount: {
        type: Boolean,
        default: false
    }
})

</script>

<template>
    <Flex full between class="px-8">
        <div>
            <!-- <NuxtLinkLocale to="/">
                <NuxtImg
                    src="/images/brand/logo.png"
                    width="350"
                    fit="inside"
                    alt="Logo Launchbase"
                    class="object-contain w-[200px]"/>
            </NuxtLinkLocale> -->
            <NuxtLink to="/">
                <NuxtImg
                    src="/img/brand/logo.png"
                    width="150"
                    fit="inside"
                    alt="Logo"
                    class="object-contain w-[150px]"/>
            </NuxtLink>
        </div>
        <!-- <span class="flex-grow"/> -->
        <Flex center class="gap-x-4">
            <Menu v-if="props.menu !== undefined" :menu="menu" />
            <ClientOnly v-if="!props.noAccount">
                <Flex v-if="leAuth.isAuthenticated" col center>
                    <Menu menu="account" dropdown="Account" />
                </Flex>
                <Flex v-else col center>
                    <AccountModalConnect />
                </Flex>
            </ClientOnly>
            <Flex center class="gap-x-3 ml-4">
                <!-- <div v-if="!props.noLang">
                    <UButton v-if="locale === 'fr'" variant="round" @click="setLocale('en')">En</UButton>
                    <UButton v-else variant="round" @click="setLocale('fr')">Fr</UButton>
                </div> -->
                <KitThemeDarkSwitch v-if="!props.noDark" />
            </Flex>
        </Flex>
    </Flex>
</template>
