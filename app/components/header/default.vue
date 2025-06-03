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
            <NuxtLink to="/">
                <img
                    src="/img/brand/logo.png"
                    alt="Logo"
                    class="object-contain w-[80px]">
            </NuxtLink>
        </div>
        <Flex center class="gap-x-4">
            <Menu v-if="props.menu !== undefined" :menu="menu" />
            <DarkSwitch v-if="!props.noDark" />
        </Flex>
    </Flex>
</template>
