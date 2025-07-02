<script setup lang="ts">

const spacing = ref<number>(theme.others.spacing as number)
const radius = ref<number>(theme.others.radius as number)

</script>

<template>
    <Flex center-start class="gap-12">
        <Flex col center class="gap-2">
            <p class="font-medium">Radius <span class="text-sm">(in rem)</span></p>
            <UInputNumber
                v-model="radius"
                :max="2"
                :min="0.1"
                :step="0.1"
                size="sm"
                @change="theme.setOther('radius', radius)" />
            <p class="text-xs">Used for <span class="text-info">rounded</span> utility</p>
        </Flex>
        <Flex col center class="gap-2">
            <p class="font-medium">Spacing <span class="text-sm">(in rem)</span></p>
            <UInputNumber
                v-model="spacing"
                :max="0.5"
                :min="0.01"
                :step="0.01"
                size="sm"
                @change="theme.setOther('spacing', spacing)" />
            <p class="text-xs">Used as a multiplicator for utilities <br> like <span class="text-info">width, height, margins, paddings...</span></p>
        </Flex>
    </Flex>
</template>
