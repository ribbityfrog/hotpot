<template>
    <Flex center wrap class="gap-x-6 gap-y-2">
        <UButton label="Save colors" color="success" @click="theme.saveColors()" />
        <UButton v-if="theme.isColorsReloadable" label="Reload colors" color="neutral" @click="theme.reloadColors()" />
        <UButton label="Reset colors" color="error" variant="outline" @click="theme.resetColors()" />
    </Flex>
</template>
