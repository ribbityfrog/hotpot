<template>
    <Flex center wrap class="gap-x-6 gap-y-2">
        <UButton label="Save" color="success" @click="theme.saveShades()" />
        <UButton v-if="theme.isShadesReloadable" label="Reload" color="neutral" @click="theme.reloadShades()" />
        <UButton label="Reset" color="error" variant="outline" @click="theme.resetShades()" />
    </Flex>
</template>
