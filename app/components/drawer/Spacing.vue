<script setup lang="ts">

const spacing = ref<number>(theme.others.spacing as number)
const radius = ref<number>(theme.others.radius as number)

</script>

<template>
    <Flex center-start class="gap-12">
        <Flex col center class="gap-4">
            <UInputNumber v-model="spacing" @change="theme.setOther('spacing', spacing)" />
            <p class="text-xs">Used for <span class="text-info">rounded</span> utility</p>
        </Flex>
        <Flex col center class="gap-4">
            <UInputNumber v-model="radius" @change="theme.setOther('radius', radius)" />
            <p class="text-xs">Used as a multiplicator for utilities <br> like <span class="text-info">width, height, margins, paddings</span></p>
        </Flex>
    </Flex>
</template>
