<script setup lang="ts">

const displayCodes = ref(false)

</script>

<template>
    <Page>
        <Section wide>
            <Flex center class="gap-4">
                <ColorPicker v-for="themeColor in themeColorEntries" :key="themeColor" :color="themeColor" />
            </Flex>
        </Section>
        <Section wide class-content="gap-y-4 mt-6 sm:mt-2">
            <Flex v-if="!$device.isMobile" full end class="gap-x-1">
                <UCheckbox v-model="displayCodes" />
                <p class="text-sm">Display color codes</p>
            </Flex>
            <Flex
                v-for="themeColor in themeColorEntries"
                :key="themeColor"
                full
                center
                class="gap-2"
                wrap>
                <ColorTile :code="displayCodes" :color="themeColor" />
            </Flex>
        </Section>
    </Page>
</template>
