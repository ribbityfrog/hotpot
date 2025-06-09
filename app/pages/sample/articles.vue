<script setup lang="ts">

const articles = [{
    title: 'Do frogs fly ?',
    subtitle: 'An incredible story, not a clickbait',
    thumbnail: '/img/sample/articles/flying_frog.webp',
    date: '8 Apr. 2025',
},
{
    title: 'Frog birthday !',
    subtitle: 'Frogs have birthday.\nThe one of yours truly is today :)',
    thumbnail: '/img/sample/articles/birthday_frog.webp',
    date: '4 Apr. 2025',
},
{
    title: 'A frog on the moon',
    subtitle: 'Hoppity hop, moonlanding I\'m coming!',
    thumbnail: '/img/sample/articles/moon_frog.webp',
    date: '1 Apr. 2025',
}
]

const rawStorage = localStorage.getItem('sample-articles')
const orig: Record<string, any> = {
    buttonShade: 'primary',
    backShade: 'secondary',
    backTint: '200',
    backTintDark: '800'
} satisfies Record<string, ThemeShadeExtended | ThemeTint>
const storage = rawStorage ? JSON.parse(rawStorage) : orig

const buttonShade: Ref<ThemeShade> = ref(storage.buttonShade)
    
const backShade: Ref<ThemeShade> = ref(storage.backShade)
const backTint: Ref<ThemeTint> = ref(storage.backTint)
const backTintDark: Ref<ThemeTint> = ref(storage.backTintDark)

watch([buttonShade, backShade, backTint, backTintDark], () => 
    localStorage.setItem('sample-articles', JSON.stringify({
        buttonShade: buttonShade.value,

        backShade: backShade.value,
        backTint: backTint.value,
        backTintDark: backTintDark.value
    }))
)

function reset() {
    buttonShade.value = orig.buttonShade

    backShade.value = orig.backShade
    backTint.value = orig.backTint
    backTintDark.value = orig.backTintDark
}

</script>

<template>
    <Page class="gap-y-12">
        <Section>
            <Flex full between>
                <h1>Articles</h1>
                <UButton color="error" class="self-end" @click="reset">Reset</UButton>
            </Flex>
        </Section>
        <Section>
            <Flex center class="gap-6" wrap>
                <Flex center class="gap-2">
                    <strong>Button</strong>
                    <ColorOptionShade v-model="buttonShade" />
                </Flex>
                <Flex center class="gap-2">
                    <strong>Background</strong>
                    <ColorOptionShade v-model="backShade" />
                </Flex>
                <Flex center class="gap-2">
                    <strong>Bg (light)</strong>
                    <ColorOptionTint v-model="backTint" :shade="backShade" />
                </Flex>
                <Flex center class="gap-2">
                    <strong>Bg (dark)</strong>
                    <ColorOptionTint v-model="backTintDark" :shade="backShade" />
                </Flex>
            </Flex>
        </Section>
        <Section>
            <Flex full class="justify-center items-stretch content-start gap-8">
                <Flex
                    v-for="article in articles"
                    :key="article.title"
                    col
                    :class="`rounded-lg shadow-element dark:shadow-element-dark bg-${backShade}-${backTint} dark:bg-${backShade}-${backTintDark}`"
                    w="w-[350px]">
                    <img :src="article.thumbnail" class="w-[350px] aspect-[7/4] object-cover rounded-t-lg">
                    <Flex col start full class="py-4 px-6 h-full">
                        <h3 class="line-clamp-2 w-full text-center mb-2">
                            {{ article.title }}
                        </h3>
                        <p class="whitespace-pre-line line-clamp-3 mb-4 grow">
                            {{ article.subtitle }}
                        </p>
                        <Flex full between class="px-7">
                            <p class="text-muted">
                                {{ article.date }}
                            </p>
                            <UButton :color="buttonShade">See more</UButton>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Section>
    </Page>
</template>
