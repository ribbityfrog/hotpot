<script setup lang="ts">
import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui'

export type Menu = keyof typeof menus

const props = defineProps({
    menu: {
        type: String as PropType<Menu>,
        required: true
    },
    vertical: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: 'text-base'
    },
    mega: {
        type: Boolean,
        default: false
    },
    dropdown: {
        type: String,
        default: undefined
    }
})

const menus = {
    main: [{
        label: 'Home',
        to: '/',
    },
    {
        label: 'Colors',
        to: '/colors',
    },
    {
        label: 'Components',
        children: [
            {
                label: 'Buttons',
                to: '/component/buttons',
            },
        ],
    },
    {
        label: 'Samples',
        children: [
            {
                label: 'Articles',
                to: '/sample/articles',
            },
        ],
    },
    {
        label: 'Generate',
        to: '/generate',
    }],

} as const satisfies Record<string, NavigationMenuItem[] | DropdownMenuItem[]>

</script>

<template>
    <UDropdownMenu v-if="props.dropdown" :items="[...menus[props.menu]]">
        <UButton :label="props.dropdown"/>
    </UDropdownMenu>
    <UNavigationMenu
        v-else
        :content-orientation="props.mega ? 'horizontal' : 'vertical'"
        :orientation="props.vertical ? 'vertical' : 'horizontal'"
        :items="[...menus[props.menu]]" />
</template>
