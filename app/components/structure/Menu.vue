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
        label: 'Styling',
        to: '/styling',
    },
    // {
    //     label: 'Components',
    //     children: [
    //         {
    //             label: 'Buttons',
    //             to: '/component/buttons',
    //         },
    //     ],
    // },
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

    drawOptions: [
        {
            label: 'Import theme (soon)',
        },    
        {
            label: 'Export theme (soon)',
        },    
        {
            label: 'Share theme (soon)',
        },
        {
            label: 'Reset theme',
            onSelect: () => theme.reset(true)
        },
    ]
} as const satisfies Record<string, NavigationMenuItem[] | DropdownMenuItem[]>

</script>

<template>
    <UDropdownMenu v-if="props.dropdown || $slots.default" :items="[...menus[props.menu]]" v-bind="$attrs">
        <slot><UButton :label="props.dropdown"/></slot>
    </UDropdownMenu>
    <UNavigationMenu
        v-else
        :content-orientation="props.mega ? 'horizontal' : 'vertical'"
        :orientation="props.vertical ? 'vertical' : 'horizontal'"
        :items="[...menus[props.menu]]"
        v-bind="$attrs" />
</template>
