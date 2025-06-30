<script setup lang="ts">

const isSpread = ref(false)

</script>

<template>
    <Flex col center>
        <p class="font-medium mb-8">This is a condensed version of all the available options in the bottom styling bar, enjoy</p>
        <!-- <USwitch v-model="isSpread" class="mb-4" label="Spread" /> -->
        <Flex
            :hidden="!isSpread"
            full
            center-start
            class="gap-8"
            wrap>
            <DrawerSlates class="border-2 rounded-xl p-4" />
            <DrawerBackgrounds class="border-2 rounded-xl p-4" />
            <DrawerTexts class="border-2 rounded-xl p-4" />
            <DrawerBorders class="border-2 rounded-xl p-4" />
        </Flex>
        <Flex
            :hidden="isSpread"
            full
            center-start
            class="gap-8"
            wrap>
            <DrawerSlates col class="border-2 rounded-xl p-4" />
            <DrawerBackgrounds col class="border-2 rounded-xl p-4" />
            <DrawerTexts col class="border-2 rounded-xl p-4" />
            <DrawerBorders col class="border-2 rounded-xl p-4" />
        </Flex>
    </Flex>
</template>
