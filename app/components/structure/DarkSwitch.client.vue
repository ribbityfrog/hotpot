<script setup lang="ts">

const colorMode = useColorMode()

const selected = computed({
    get: () => colorMode.preference === 'dark',
    set: (val) => { colorMode.preference = val ? 'dark' : 'light' }
})

const ui = {
    base: 'data-[state=checked]:bg-blue-300 data-[state=checked]:dark:bg-blue-300 data-[state=unchecked]:bg-yellow-400 data-[state=unchecked]:dark:bg-yellow-400',
    icon: 'group-data-[state=unchecked]:text-blue-500 group-data-[state=unchecked]:dark:text-blue-500 group-data-[state=checked]:text-yellow-500 group-data-[state=checked]:dark:text-yellow-500',
}

onMounted(() => {
    if (colorMode.value !== 'system')
        selected.value = colorMode.value === 'dark'
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches)
        selected.value = true
})

</script>

<template>
    <USwitch
        v-model="selected"
        size="xl"
        unchecked-icon="i-lucide-moon"
        checked-icon="i-lucide-sun"
        :ui="ui"
        @update:model-value="colorMode.preference = $event ? 'dark' : 'light'"
    />
</template>
