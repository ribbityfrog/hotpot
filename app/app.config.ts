export default defineAppConfig({
    ui: {
        colors: {
            primary: 'slate',
            second: 'slateSecond',
            darkness: 'slateDark',
            confirm: 'slateConfirm',
            cancel: 'slateCancel',
            error: 'slateCancel',
        },
        navigationMenu: {
            slots: {
                link: 'text-lg'
            }
        },
        dropdownMenu: {
            slots: {
                item: 'cursor-pointer'
            }
        },
        modal: {
            slots: {
                overlay: 'fixed inset-0 bg-bg/85',
                title: 'text-lg text-text font-medium',
                close: 'absolute top-4 end-4 cursor-pointer'
            }
        },
        slideover: {
            slots: {
                content: '!w-fit',
            }
        },
        input: {
            slots: {
                base: 'placeholder:italic',
            }
        },
        table: {
            slots: {
                td: 'text-dimmed',
            }
        },
        accordion: {
            slots: {
                content: 'data-[state=open]:mb-6 data-[state=close]:mt-0',
                label: 'cursor-pointer text-lg transform-color duration-300 ease-in-out hover:text-second/85 group-data-[state=open]:text-second',
                trailingIcon: 'cursor-pointer text-confirm hover:text-second group-data-[state=open]:text-cancel'
            }
        }
        // horizontalNavigation: {
        //     base: 'px-2.5 py-2 text-lg',
        //     before: 'hover:before:bg-slate-hover',
        //     after: 'after:inset-y-6 after:inset-x-2'
        // },
        // formGroup: {
        //     label: {
        //         base: ''
        //     },
        //     error: 'text-red-400'
        // },
        // textarea: {
        //     base: 'placeholder:italic',
        //     // rounded: 'rounded-none',
        //     variant: {
        //         outline: 'bg-transparent dark:bg-transparent',
        //     }
        // }
    }
})
