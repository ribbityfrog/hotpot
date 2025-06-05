<script setup lang="ts">

const nuxtApp = useNuxtApp()
const colorMode = useColorMode()

const props = defineProps({
    color: {
        type: String as PropType<ThemeColor>,
        required: true
    }
})

const itemShades: Ref<{ label: string, value: ThemeShadeExtended }[]> = ref([
    {
        label: 'Primary',
        value: 'primary'
    },    
    {
        label: 'Secondary',
        value: 'secondary'
    },
    {
        label: 'Success',
        value: 'success'
    },
    {
        label: 'Info',
        value: 'info'
    },
    {
        label: 'Warning',
        value: 'warning'
    },
    {
        label: 'Error',
        value: 'error'
    },
    {
        label: 'Neutral',
        value: 'neutral'
    }
])

const itemTints: Ref<{ label: string, value: ThemeTint }[]> = ref([
    {
        label: '50',
        value: '50'
    },    
    {
        label: '100',
        value: '100'
    },
    {
        label: '200',
        value: '200'
    },
    {
        label: '300',
        value: '300'
    },
    {
        label: '400',
        value: '400'
    },
    {
        label: '500',
        value: '500'
    },    
    {
        label: '600',
        value: '600'
    },
    {
        label: '700',
        value: '700'
    },
    {
        label: '800',
        value: '800'
    },
    {
        label: '900',
        value: '900'
    },
    {
        label: '950',
        value: '950'
    }
])

function defineSelection(mode: string) {
    const colors = mode === 'dark' ? theme.colorsDark : theme.colors
    const shadeTint = colors[props.color].split('-')
    return {
        shade: shadeTint[0] as ThemeShadeExtended,
        tint: (shadeTint[1] ? shadeTint[1] : '500') as ThemeTint
    }
}

const selected: Ref<{ shade: ThemeShadeExtended, tint: ThemeTint }> = ref(defineSelection(colorMode.value))

function updateColor() {
    const color: ThemeShadeTint = (selected.value.shade === 'white' || selected.value.shade === 'black' ? selected.value.shade : `${selected.value.shade}-${selected.value.tint}`) as ThemeShadeTint
    theme.setColor(props.color, color, colorMode.value)
}

watch(colorMode, (newMode) => {
    selected.value = defineSelection(newMode.value)
})

nuxtApp.hook('colors:update', () => {
    selected.value = defineSelection(colorMode.value)
})

</script>

<template>
    <Flex center class="gap-2">
        <USelect
            v-model="selected.shade"
            color="neutral"
            :items="itemShades"
            value-key="value"
            class="w-38"
            @change="updateColor">
            <template #leading="{ modelValue }">
                <div :class="`mt-0.5 h-3 w-5 rounded-full bg-${modelValue}-500`" />
            </template>
            <template #item-leading="{ index }">
                <div :class="`mt-0.5 h-3 w-5 rounded-full bg-${itemShades![index]!.value}-500`" />
            </template>
        </USelect>
        <USelect
            v-model="selected.tint"
            color="neutral"
            :items="itemTints"
            value-key="value"
            class="w-26"
            @change="updateColor">
            <template #leading="{ modelValue }">
                <div :class="`mt-0.5 h-3 w-5 rounded-full bg-${selected.shade}-${modelValue}`" />
            </template>
            <template #item-leading="{ index }">
                <div :class="`mt-0.5 h-3 w-5 rounded-full bg-${selected.shade}-${itemTints![index]!.value}`" />
            </template>
        </USelect>
    </Flex>
</template>
