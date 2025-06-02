<script setup lang="ts">
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()

const props = defineProps({
    trailingIcon: {
        type: String,
        default: 'i-lucide-plus'
    }
})

</script>

<template>
    <UAccordion :trailing-icon="props.trailingIcon">
        <template v-for="(slotFn, slotName) in instance?.slots" #[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps || {}" />
        </template>
    </UAccordion>
</template>
