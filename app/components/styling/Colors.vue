<template>
    <Flex full center class="gap-6" wrap>
        <Flex
            v-for="slate in theme.slates"
            :key="slate.name"
            col
            center
            :class="`border-2 border-${slate.name} rounded-xl p-4 gap-4`">
            <p class="font-medium">{{ capitalize(slate.name) }}</p>
            <Flex center class="gap-4" wrap>
                <UButton :color="slate.name" label="Button" />
                <UButton :color="slate.name" icon="i-lucide-bird" disabled label="Disabled" />
                <UButton :color="slate.name" icon="i-lucide-bird" variant="outline" label="Outlined" />
            </Flex>
            
            <Flex center class="gap-4" wrap>
                <UButton :color="slate.name" variant="soft" label="Soft" />
                <UButton :color="slate.name" variant="subtle" label="Subtle" />
                <UButton :color="slate.name" variant="ghost" label="Ghost" />
                <UButton :color="slate.name" variant="link" label="Link" />
            </Flex>
                
            <Flex center class="gap-4" wrap>
                <UChip :color="slate.name" size="lg">
                    <UBadge icon="i-lucide-check" :color="slate.name" size="md" label="Badge" />
                </UChip>
                <USlider :default-value="50" :color="slate.name" class="w-32" />
                <USwitch :default-value="true" :color="slate.name" />
            </Flex>
            <UProgress :color="slate.name" animation="swing" class="w-full" />
        </Flex>
    </Flex>
</template>
