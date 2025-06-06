<template>
    <Flex center wrap class="gap-x-6 gap-y-2">
        <UButton label="Save shades" color="success" @click="theme.saveShades()" />
        <UButton v-if="theme.isShadesReloadable" label="Reload shades" color="neutral" @click="theme.reloadShades()" />
        <UButton label="Reset shades" color="error" variant="outline" @click="theme.resetShades()" />
        <UButton label="Nuxt UI Shades" @click="theme.resetToNuxtShades()" />
    </Flex>
</template>
