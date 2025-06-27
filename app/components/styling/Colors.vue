<template>
    <Flex col center class="gap-4">
        <div v-for="slate in theme.slates" :key="slate.name">
            <Flex center class="gap-4" wrap>
                <p class="w-22 font-medium">{{ capitalize(slate.name) }}</p>
                <UButton :color="slate.name" label="Button" />
                <UButton :color="slate.name" icon="i-lucide-bird" disabled label="Disabled" />
                <UButton :color="slate.name" variant="outline" label="Outlined" />
                <UChip :color="slate.name" size="lg">
                    <UBadge icon="i-lucide-check" :color="slate.name" size="md" label="Badge" />
                </UChip>
                <USlider :default-value="50" :color="slate.name" class="w-22" />
                <USwitch :default-value="true" :color="slate.name" />
            </Flex>
        </div>
    </Flex>
</template>
