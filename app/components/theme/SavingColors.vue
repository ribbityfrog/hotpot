<template>
    <Flex center wrap class="gap-x-6 gap-y-2">
        <UButton label="Save" color="success" @click="theme.saveColors()" />
        <UButton v-if="theme.isColorsReloadable" label="Reload" color="neutral" @click="theme.reloadColors()" />
        <UButton label="Reset" color="error" variant="outline" @click="theme.resetColors()" />
    </Flex>
</template>
