<script setup lang="ts">

import type { Menu } from '~/components/structure/Menu.vue'

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
    <Flex full between class="px-4">
        <div>
            <NuxtLink to="/">
                <img
                    src="/img/brand/logo.png"
                    alt="Logo"
                    class="object-contain w-[60px]">
            </NuxtLink>
        </div>
        <Flex start class="gap-4">
            <DrawerShades />
            <DrawerColors />
        </Flex>
        <Flex center class="gap-x-4">
            <Menu v-if="props.menu !== undefined" :menu="menu" />
            <DarkSwitch v-if="!props.noDark" />
        </Flex>
    </Flex>
</template>
