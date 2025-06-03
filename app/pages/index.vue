<script setup lang="ts">

const color = ref('#FF0000')

watch(color, (newcolor) => {
    const col = new Color(newcolor)
    col.shadeGen()
    col.shadeStyle('primary')
})

</script>

<template>
    <Page>
        <Section wide class-content="gap-y-8">
            <Flex center class="gap-4">
                <KitColorPicker v-for="themeColor in themeColorEntries" :key="themeColor" :color="themeColor" />
            </Flex>
            <Flex full col center class="gap-y-4">
                <Flex full center class="gap-2" wrap>
                    <div v-for="shade in shades.primary.bg" :key="shade" :class="`w-1/13 sm:1/11 h-8 xl:h-12 ${shade}`" />
                </Flex>
                <Flex full center class="gap-2" wrap>
                    <div v-for="shade in shades.secondary.bg" :key="shade" :class="`w-1/13 sm:1/11 h-8 xl:h-12 ${shade}`" />
                </Flex>
            </Flex>
        </Section>
    </Page>
</template>
