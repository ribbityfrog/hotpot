<template>
    <Flex full center wrap class="gap-4">
        <Flex
            v-for="slate in theme.slates"
            :key="slate.name"
            center>
            <SlatePicker v-model="theme.slates[slate.name]" class="w-32 mr-2 sm:mr-4" />
        </Flex>
    </Flex>
</template>
