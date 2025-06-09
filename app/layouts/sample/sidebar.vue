<script setup lang="ts">

const rawStorage = localStorage.getItem('sample-sidebar')
const orig: Record<string, any> = {
    topBarShade: 'primary',
    topBarTint: '100',
    topBarTintDark: '800',
    sideBarShade: 'primary',
    sideBarTint: '100',
    sideBarTintDark: '800',
    bottomBarShade: 'neutral',
    bottomBarTint: '100',
    bottomBarTintDark: '900'
}
const storage = rawStorage ? JSON.parse(rawStorage) : orig

const topBarShade: Ref<ThemeShade> = ref(storage.topBarShade)
const topBarTint: Ref<ThemeTint> = ref(storage.topBarTint)
const topBarTintDark: Ref<ThemeTint> = ref(storage.topBarTintDark)

const sideBarShade: Ref<ThemeShade> = ref(storage.sideBarShade)
const sideBarTint: Ref<ThemeTint> = ref(storage.sideBarTint)
const sideBarTintDark: Ref<ThemeTint> = ref(storage.sideBarTintDark)

const bottomBarShade: Ref<ThemeShade> = ref(storage.bottomBarShade)
const bottomBarTint: Ref<ThemeTint> = ref(storage.bottomBarTint)
const bottomBarTintDark: Ref<ThemeTint> = ref(storage.bottomBarTintDark)

watch([topBarShade, topBarTint, topBarTintDark, sideBarShade, sideBarTint, sideBarTintDark, bottomBarShade, bottomBarTint, bottomBarTintDark], () => {
    localStorage.setItem('sample-sidebar', JSON.stringify({
        topBarShade: topBarShade.value,
        topBarTint: topBarTint.value,
        topBarTintDark: topBarTintDark.value,
        sideBarShade: sideBarShade.value,
        sideBarTint: sideBarTint.value,
        sideBarTintDark: sideBarTintDark.value,
        bottomBarShade: bottomBarShade.value,
        bottomBarTint: bottomBarTint.value,
        bottomBarTintDark: bottomBarTintDark.value
    }))
})

function reset() {
    topBarShade.value = orig.topBarShade
    topBarTint.value = orig.topBarTint
    topBarTintDark.value = orig.topBarTintDark

    sideBarShade.value = orig.sideBarShade
    sideBarTint.value = orig.sideBarTint
    sideBarTintDark.value = orig.sideBarTintDark

    bottomBarShade.value = orig.bottomBarShade
    bottomBarTint.value = orig.bottomBarTint
    bottomBarTintDark.value = orig.bottomBarTintDark
}

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
                <Section group full class-content="gap-y-8 p-6">
                    <Flex full between>
                        <div/>
                        <h1>Sidebar</h1>
                        <UButton color="error" class="self-end" @click="reset">Reset</UButton>
                    </Flex>
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
                    <slot />
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
