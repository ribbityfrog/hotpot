<script setup lang="ts">

const displayCodes = ref(false)
const tilesGap = ref(false)

const tab = ref('0')

</script>

<template>
    <Page>
        <Section wide>
            <Flex center class="gap-4" wrap>
                <ColorPicker v-for="themeColor in themeColorEntries" :key="themeColor" :color="themeColor" />
            </Flex>
        </Section>
        <Section v-if="!$device.isMobile" class="mt-6 mb-2">
            <Flex full between class="gap-y-4">
                <UTabs
                    v-model="tab"
                    color="neutral"
                    :content="false"
                    :items="[{ label: 'Background' }, { label: 'Text' }]"
                    class="w-80" />
                <div class="space-y-2">
                    <Flex v-if="tab !== '1'" class="gap-x-1">
                        <UCheckbox v-model="displayCodes" color="neutral" />
                        <p class="text-sm">Display color codes</p>
                    </Flex>
                    <Flex class="gap-x-1">
                        <UCheckbox v-model="tilesGap" color="neutral" />
                        <p class="text-sm">Add a gap between tiles</p>
                    </Flex>
                </div>
            </Flex>
        </Section>
        <Section wide class-content="gap-y-4 mt-6 sm:mt-2">
            <Flex
                v-for="themeColor in themeColorEntries"
                :key="themeColor"
                full
                center
                :class="tilesGap ? 'gap-x-1.5' : ''"
                wrap>
                <ColorTile :code="displayCodes || tab === '1'" :color="themeColor" :text="tab === '1'" />
            </Flex>
        </Section>
    </Page>
</template>
