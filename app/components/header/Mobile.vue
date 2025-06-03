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
    },
    white: {
        type: Boolean,
        default: false
    }
})

const textColor = props.white ? 'text-white' : ''

const isMenuOpen = ref(false)

const route = useRoute()

watch(() => route.path, () => {
    isMenuOpen.value = false
})

</script>

<template>
    <Flex full between :class="`px-2 ${textColor}`">
        <NuxtLink to="/">
            <img
                src="/img/brand/logo.png"
                alt="Logo"
                class="object-contain w-[50px]">
        </NuxtLink>
        <USlideover
            v-model:open="isMenuOpen"
            title="Menu"
            side="right" >
            <UIcon name="i-lucide-menu" aria="burger menu" size="32" />
            <template #body>
                <Flex col end class="gap-y-4">
                    <Menu v-if="props.menu !== undefined" :menu="props.menu" vertical />
                    <DarkSwitch v-if="!props.noDark" />
                </Flex>
            </template>
        </USlideover>
    </Flex>
</template>
