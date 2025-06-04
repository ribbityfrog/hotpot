<script setup lang="ts">

const props = defineProps({
    color: {
        type: String as PropType<ThemeColor>,
        required: true
    }
})

const itemColors = ref([
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

const itemShades = ref([
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

const selected = reactive({
    color: itemColors.value[0]?.value,
    shade: itemShades.value[0]?.value
})

watch(selected, (newSelection) => 
    // setProperty(`--ui-${props.color}`, `var(--ui-color-${newSelection.color}-${newSelection.shade})`, colorMode.value === 'dark' ? computedDarkEl.value : undefined)
    setProperty(`--ui-${props.color}`, `var(--ui-color-${newSelection.color}-${newSelection.shade})`)
)

</script>

<template>
    <Flex center class="gap-2">
        <USelect v-model="selected.color" :items="itemColors" value-key="value" class="w-38">
            <template #leading="{ modelValue }">
                <div :class="`mt-0.5 h-3 w-5 rounded-full bg-${modelValue}-500`" />
            </template>
            <template #item-leading="{ index }">
                <div :class="`mt-0.5 h-3 w-5 rounded-full bg-${itemColors![index]!.value}-500`" />
            </template>
        </USelect>
        <USelect v-model="selected.shade" :items="itemShades" value-key="value" class="w-26">
            <template #leading="{ modelValue }">
                <div :class="`mt-0.5 h-3 w-5 rounded-full bg-${selected.color}-${modelValue}`" />
            </template>
            <template #item-leading="{ index }">
                <div :class="`mt-0.5 h-3 w-5 rounded-full bg-${selected.color}-${itemShades![index]!.value}`" />
            </template>
        </USelect>
    </Flex>
</template>
