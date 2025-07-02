<script setup lang="ts">

</script>

<template>
    <Flex col center>
        <p class="font-medium mb-8">This is a condensed version of all the available options in the bottom styling bar, enjoy</p>
        <Flex
            full
            center-start
            class="gap-8"
            wrap>
            <DrawerSlates col class="border-2 border-default rounded-xl p-4" />
            <DrawerBackgrounds col class="border-2 border-default rounded-xl p-4" />
            <DrawerTexts col class="border-2 border-default rounded-xl p-4" />
            <DrawerBorders col class="border-2 border-default rounded-xl p-4" />
            <DrawerSpacing class="border-2 border-default rounded-xl p-4" />
        </Flex>
    </Flex>
</template>
