<script setup lang="ts">

const topBarShade: Ref<ThemeShade> = ref('primary')
const topBarTint: Ref<ThemeTint> = ref('100')
const topBarTintDark: Ref<ThemeTint> = ref('800')

const sideBarShade: Ref<ThemeShade> = ref('primary')
const sideBarTint: Ref<ThemeTint> = ref('100')
const sideBarTintDark: Ref<ThemeTint> = ref('800')

const bottomBarShade: Ref<ThemeShade> = ref('neutral')
const bottomBarTint: Ref<ThemeTint> = ref('100')
const bottomBarTintDark: Ref<ThemeTint> = ref('900')

</script>

<template>
    <Layout>
        <Section full :class="`py-4 bg-${topBarShade}-${topBarTint} dark:bg-${topBarShade}-${topBarTintDark} sticky top-0`">
            <HeaderMobile v-if="$device.isMobile" menu="main" />
            <HeaderDefault v-else menu="main" />
        </Section>
        <Page>
            <Flex full class="grow">
                <Flex col start :class="`w-60 p-4 bg-${sideBarShade}-${sideBarTint} dark:bg-${sideBarShade}-${sideBarTintDark}`" >
                    <h2 class="w-full text-center">Froggo</h2>
                    <Menu menu="main" vertical />
                </Flex>
                <Section group full class-content="gap-y-8">
                    <slot />
                    <Flex col star class="gap-6">
                        <Flex center class="gap-6" wrap>
                            <Flex center class="gap-2">
                                <strong>Top</strong>
                                <ColorOptionShade v-model="topBarShade" />
                            </Flex>
                            <Flex center class="gap-2">
                                <strong>Light</strong>
                                <ColorOptionTint v-model="topBarTint" :shade="topBarShade" />
                            </Flex>
                            <Flex center class="gap-2">
                                <strong>Dark</strong>
                                <ColorOptionTint v-model="topBarTintDark" :shade="topBarShade" />
                            </Flex>
                        </Flex>
                        <Flex center class="gap-6" wrap>
                            <Flex center class="gap-2">
                                <strong>Side</strong>
                                <ColorOptionShade v-model="sideBarShade" />
                            </Flex>
                            <Flex center class="gap-2">
                                <strong>Light</strong>
                                <ColorOptionTint v-model="sideBarTint" :shade="sideBarShade" />
                            </Flex>
                            <Flex center class="gap-2">
                                <strong>Dark</strong>
                                <ColorOptionTint v-model="sideBarTintDark" :shade="sideBarShade" />
                            </Flex>
                        </Flex>
                        <Flex center class="gap-6" wrap>
                            <Flex center class="gap-2">
                                <strong>Bottom</strong>
                                <ColorOptionShade v-model="bottomBarShade" />
                            </Flex>
                            <Flex center class="gap-2">
                                <strong>Light</strong>
                                <ColorOptionTint v-model="bottomBarTint" :shade="bottomBarShade" />
                            </Flex>
                            <Flex center class="gap-2">
                                <strong>Dark</strong>
                                <ColorOptionTint v-model="bottomBarTintDark" :shade="bottomBarShade" />
                            </Flex>
                        </Flex>
                    </Flex>
                </Section>
            </Flex>
        </Page>
        <footer class="w-full">
            <Section wide :class="`py-4 bg-${bottomBarShade}-${bottomBarTint} dark:bg-${bottomBarShade}-${bottomBarTintDark}`">
                <FooterDefault />
            </Section>
        </footer>
    </Layout>
</template>
