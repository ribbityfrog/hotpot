<script setup lang="ts">

const props = defineProps({
    color: {
        type: String as PropType<ThemeColorBorder>,
        required: true
    }
})

</script>

<template>
    <div :class="`p-2 border-4 ${props.color} rounded-sm`">
        <div :class="`p-2 border-[1px] ${props.color} rounded-lg`">
            <div :class="`p-1 border-2 ${props.color} rounded-xl`">
                <UIcon name="i-mdi-sheep" class="size-4 sm:size-7" />
            </div>
        </div>
    </div>
</template>
