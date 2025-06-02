export type Base = 'fat' | 'medium' | 'light'
export type Variant = 'default' | 'invert' | 'link'
export type Color = 'primary' | 'second' | 'confirm' | 'cancel'

export const bases = {
    light: 'text-lg font-medium py-0.5 px-2',
    medium: 'text-lg font-semibold py-1 px-3',
    fat: 'text-2xl font-bold py-1.5 px-4'
} satisfies Record<Base, string>

export const variants = {
    default: 'border-2 text-darkness disabled:text-darkness hover:bg-transparent',
    invert: 'border-2 bg-transparent disabled:text-darkness hover:text-darkness',
    link: 'm-0 p-0 bg-transparent hover:bg-transparent hover:underline'
} satisfies Record<Variant, string>

export const colors = {
    default: {
        primary: 'bg-primary border-primary hover:text-primary',
        second: 'bg-second border-second hover:text-second',
        confirm: 'bg-confirm border-confirm hover:text-confirm',
        cancel: 'bg-cancel border-cancel hover:text-cancel'
    },
    invert: {
        primary: 'hover:bg-primary border-primary text-primary',
        second: 'hover:bg-second border-second text-second',
        confirm: 'hover:bg-confirm border-confirm text-confirm',
        cancel: 'hover:bg-cancel border-cancel text-cancel'
    },
    link: {
        primary: 'text-primary',
        second: 'text-second',
        confirm: 'text-confirm',
        cancel: 'text-cancel'
    }
} satisfies Record<Variant, Record<Color, string>>
