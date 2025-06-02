<script setup lang="ts">

const props = defineProps({
    icon: {
        type: Object as PropType<{ name: string, aria: string }>,
        default: undefined
    },
    name: {
        type: String,
        default: undefined
    },
    aria: {
        type: String,
        default: undefined
    },
    size: {
        type: String,
        default: 'w-5 h-5'
    },
    bg: {
        type: String,
        default: undefined
    },
    interactable: {
        type: Boolean,
        default: false
    }
})

const iconName = computed(() => props.icon?.name ?? props.name ?? 'i-lucide-code-xml')
const iconAria = computed(() => (props.icon?.aria ?? props.aria))

let error: string | undefined = undefined

if (iconName.value === 'i-lucide-code-xml')
    error = 'text-red-400'

const iconClass = `${props.size} ${error !== undefined ? error : ''} ${props.interactable ? 'cursor-pointer transition hover:text-primary' : ''}`

</script>

<template>
    <Flex v-if="props.bg !== undefined" center :class="props.bg">
        <UIcon
            :name="iconName"
            :class="iconClass"
            :aria-hidden="!iconAria"
            :aria-label="iconAria ?? ''"
        />
    </Flex>
    <UIcon
        v-else
        :name="iconName"
        :class="iconClass"
        :aria-hidden="!iconAria"
        :aria-label="iconAria ?? ''"/>
</template>
