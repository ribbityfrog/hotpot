<script setup lang="ts">

const slate = defineModel({
    type: Object as PropType<Slate>,
    required: true
})

const props = defineProps({
    reduced: {
        type: Boolean,
        default: false
    },
    class: {
        type: String,
        default: ''
    },
    classTiles: {
        type: String,
        default: ''
    },
})

</script>

<template>
    <Flex class="gap-y-2">
        <SlatePickerPopup v-model="slate" :class="props.class">
            <UButton :label="capitalize(slate.name)" color="neutral" variant="outline">
                <template #leading>
                    <span :class="`bg-${slate.name}-500`" class="size-3 rounded-full" />
                </template>
            </UButton>
        </SlatePickerPopup>
        <SlateTiles v-model="slate" :class="props.classTiles" />
    </Flex>
</template>
