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
    stretch: {
        type: Boolean,
        default: false
    },
    tiny: {
        type: Boolean,
        default: false
    },
    neutral: {
        type: Boolean,
        default: false
    },
    outline: {
        type: Boolean,
        default: false
    }
})

let classButton = ''
if (props.stretch) classButton += props.tiny ? 'w-22' : 'w-26'

</script>

<template>
    <Flex class="gap-y-2">
        <SlatePickerPopup v-model="slate" :class="props.class">
            <UButton
                :label="capitalize(slate.name)"
                :color="props.neutral ? 'neutral' : slate.name"
                :variant="props.outline ? 'outline' : 'solid'"
                :size="`${props.tiny ? 'xs' : 'md'}`"
                :class="classButton">
                <template #leading>
                    <span :class="`bg-${slate.name}-500`" class="size-3 rounded-full" />
                </template>
            </UButton>
        </SlatePickerPopup>
        <SlateTiles v-model="slate" :class="props.classTiles" :tiny="props.tiny" />
    </Flex>
</template>
