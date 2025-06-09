<script setup lang="ts">

const orig = {
    isGenerated: false,
    cursor: false,
    xs: {
        x: 2,
        y: 1,
        gap: 1.5
    },
    sm: {
        x: 2.5,
        y: 1.5,
        gap: 1.5
    },
    md: {
        x: 4,
        y: 1.5,
        gap: 1.5
    },
    lg: {
        x: 4,
        y: 2,
        gap: 1.5
    },
    xl: {
        x: 4,
        y: 2,
        gap: 1.5
    }
}

const rawStorage = localStorage.getItem('comp-buttons')
const storage: typeof orig = rawStorage ? JSON.parse(rawStorage) : orig

const config = ref(structuredClone(storage))

const slots = computed(() => ({
    base: config.value.cursor ? 'cursor-pointer' : 'cursor-default',
}))

const variants = computed(() => ({
    size: {
        xs: {
            base: `px-${config.value.xs.x} py-${config.value.xs.y} gap-${config.value.xs.gap}`
        },
        sm: {
            base: `px-${config.value.sm.x} py-${config.value.sm.y} gap-${config.value.sm.gap}`
        },
        md: {
            base: `px-${config.value.md.x} py-${config.value.md.y} gap-${config.value.md.gap}`
        },
        lg: {
            base: `px-${config.value.lg.x} py-${config.value.lg.y} gap-${config.value.lg.gap}`
        },
        xl: {
            base: `px-${config.value.xl.x} py-${config.value.xl.y} gap-${config.value.xl.gap}`
        },
    },
}))

watch([slots, variants], () => {
    if (config.value.isGenerated)
        localStorage.setItem('gen-comp-buttons', JSON.stringify({ slots: slots.value, variants: variants.value }))
})

watch(config.value, (newConfig) => {
    if (newConfig.isGenerated)
        localStorage.setItem('gen-comp-buttons', JSON.stringify({ name: 'button', slots: slots.value, variants: variants.value }))
    else if (!newConfig.isGenerated)
        localStorage.removeItem('gen-comp-buttons')

    localStorage.setItem('comp-buttons', JSON.stringify(newConfig))
})

function reset() {
    config.value = structuredClone(orig)
    localStorage.removeItem('comp-buttons')
    localStorage.removeItem('gen-comp-buttons')
    reloadNuxtApp()
}

</script>

<template>
    <Page class="gap-y-8">
        <Section class-content="gap-y-4">
            <Flex full between>
                <div class="w-1/4"/>
                <Flex col center class="gap-y-4 w-1/2">
                    <h1>Buttons</h1>
                    <UCheckbox v-model="config.isGenerated" label="Include in code generation" />
                </Flex>
                <Flex end class="w-1/4">
                    <UButton color="error" @click="reset">Reset</UButton>
                </Flex>
            </Flex>
        </Section>
        <Section class-content="gap-y-4">
            <UCheckbox v-model="config.cursor" label="Pointer cursor on hover" />
            <Flex end class="gap-6">
                <strong class="mb-1">X padding</strong>
                <UFormField v-for="size in variantSizes" :key="size" :label="size" class="w-26">
                    <UInputNumber
                        v-model="config[size].x"
                        size="sm"
                        :step="0.5"
                        :min="0"
                        :max="50" />
                </UFormField>
            </Flex>
            <Flex end class="gap-6">
                <strong class="mb-1">Y padding</strong>
                <UFormField v-for="size in variantSizes" :key="size" :label="size" class="w-26">
                    <UInputNumber
                        v-model="config[size].y"
                        size="sm"
                        :step="0.5"
                        :min="0"
                        :max="50" />
                </UFormField>
            </Flex>
            <Flex end class="gap-6">
                <strong class="mb-1">Icon gap</strong>
                <UFormField v-for="size in variantSizes" :key="size" :label="size" class="w-26">
                    <UInputNumber
                        v-model="config[size].gap"
                        size="sm"
                        :step="0.5"
                        :min="0"
                        :max="12" />
                </UFormField>
            </Flex>
        </Section>

        <Section class-content="gap-y-4">
            <Flex center row class="gap-4">
                <UButton
                    v-for="size in (['xs', 'sm', 'md', 'lg', 'xl'] as const)"
                    :key="size"
                    label="Button"
                    :size="size"
                    icon="i-lucide-bird"
                    :ui="slots"
                    :class="variants.size[size].base" />
            </Flex>
        </Section>

        <Section class-content="gap-y-4">
            <Flex v-for="shade in themeShadeEntries" :key="shade" row class="gap-4">
                <UButton :color="shade" label="Button" :ui="slots" :class="variants.size.md.base" />
                <UButton
                    :color="shade"
                    label="Button"
                    icon="i-lucide-bird"
                    :ui="slots"
                    :class="variants.size.md.base" />
                <UButton
                    :color="shade"
                    disabled
                    label="Button"
                    :ui="slots"
                    :class="variants.size.md.base" />
                <UButton
                    :color="shade"
                    variant="soft"
                    label="Button"
                    :ui="slots"
                    :class="variants.size.md.base" />
                <UButton
                    :color="shade"
                    variant="subtle"
                    label="Button"
                    :ui="slots"
                    :class="variants.size.md.base" />
                <UButton
                    :color="shade"
                    variant="ghost"
                    label="Button"
                    :ui="slots"
                    :class="variants.size.md.base" />
                <UButton
                    :color="shade"
                    variant="link"
                    label="Button"
                    :ui="slots"
                    :class="variants.size.md.base" />
            </Flex>
        </Section>
    </Page>
</template>
