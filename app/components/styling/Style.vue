<script setup lang="ts">

const isSpread = ref(false)

</script>

<template>
    <Flex col center>
        <p class="font-medium mb-8">This is a condensed version of all the available options in the bottom styling bar, enjoy</p>
        <USwitch v-model="isSpread" class="mb-4" label="Spread" />
        <Flex full center-start class="gap-8" wrap>
            <DrawerSlates :key="isSpread ? 1 : 0" :col="!isSpread" class="border-2 rounded-xl p-4" />
            <DrawerBackgrounds :key="isSpread ? 0 : 1" :col="!isSpread" class="border-2 rounded-xl p-4" />
            <DrawerTexts :key="isSpread ? 1 : 0" :col="!isSpread" class="border-2 rounded-xl p-4" />
            <DrawerBorders :key="isSpread ? 0 : 1" :col="!isSpread" class="border-2 rounded-xl p-4" />
        </Flex>
    </Flex>
</template>
