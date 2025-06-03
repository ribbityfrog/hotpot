export default {
    primary:
        {
            bg: [
                'bg-primary-100',
                'bg-primary-200',
                'bg-primary-300',
                'bg-primary-400',
                'bg-primary-500',
                'bg-primary-600',
                'bg-primary-700',
                'bg-primary-800',
                'bg-primary-900',
                'bg-primary-950',
            ],
            text: [
                'text-primary-100',
                'text-primary-200',
                'text-primary-300',
                'text-primary-400',
                'text-primary-500',
                'text-primary-600',
                'text-primary-700',
                'text-primary-800',
                'text-primary-900',
                'text-primary-950',
            ],
        },
    secondary:
        {
            bg: [
                'bg-secondary-100',
                'bg-secondary-200',
                'bg-secondary-300',
                'bg-secondary-400',
                'bg-secondary-500',
                'bg-secondary-600',
                'bg-secondary-700',
                'bg-secondary-800',
                'bg-secondary-900',
                'bg-secondary-950',
            ],
            text: [
                'text-secondary-100',
                'text-secondary-200',
                'text-secondary-300',
                'text-secondary-400',
                'text-secondary-500',
                'text-secondary-600',
                'text-secondary-700',
                'text-secondary-800',
                'text-secondary-900',
                'text-secondary-950',
            ]
        },
} as const satisfies Record<string, { bg: string[], text: string[] }>
