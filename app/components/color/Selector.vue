<script setup lang="ts">

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

const selectedColor = ref(itemColors.value[0]?.value)
const selectedShade = ref(itemShades.value[0]?.value)

</script>

<template>
    <Flex center class="gap-2">
        <USelect v-model="selectedColor" :items="itemColors" value-key="value" class="w-38">
            <template #leading="{ modelValue }">
                <div :class="`mt-0.5 h-3 w-5 rounded-full bg-${modelValue}`" />
            </template>
            <template #item-leading="{ index }">
                <div :class="`mt-0.5 h-3 w-5 rounded-full bg-${itemColors![index]!.value}`" />
            </template>
        </USelect>
        <USelect v-model="selectedShade" :items="itemShades" value-key="value" class="w-26">
            <template #leading="{ modelValue }">
                <div :class="`mt-0.5 h-3 w-5 rounded-full bg-${selectedColor}-${modelValue}`" />
            </template>
            <template #item-leading="{ index }">
                <div :class="`mt-0.5 h-3 w-5 rounded-full bg-${selectedColor}-${itemShades![index]!.value}`" />
            </template>
        </USelect>
    </Flex>
</template>
