<template>
    <Flex center wrap class="gap-x-6 gap-y-2">
        <UButton v-if="theme.isReloadable" label="Reload" color="neutral" @click="theme.reload()" />
        <UButton label="Save" color="success" @click="theme.save()" />
        <UButton label="Reset" color="error" variant="outline" @click="theme.reset()" />
    </Flex>
</template>
