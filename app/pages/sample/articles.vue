<script setup lang="ts">

const articles = [{
    title: 'Frog birthday !',
    subtitle: 'Frogs have birthday.\nThe one of yours truly is today :)',
    thumbnail: '/img/sample/articles/birthday_frog.webp',
    date: '4 Apr. 2025',
},
{
    title: 'Do frogs fly ?',
    subtitle: 'An incredible story, not a clickbait',
    thumbnail: '/img/sample/articles/flying_frog.webp',
    date: '1 Apr. 2025',
}]

const shade: Ref<ThemeShade> = ref('secondary')
const backTint: Ref<ThemeTint> = ref('200')
const backTintDark: Ref<ThemeTint> = ref('800')

</script>

<template>
    <Page class="gap-y-12">
        <Section>
            <h1>Articles</h1>
        </Section>
        <Section>
            <ColorOptionShade v-model="shade" />
            <ColorOptionTint v-model="backTint" :shade="shade" />
            <ColorOptionTint v-model="backTintDark" :shade="shade" />
        </Section>
        <Section>
            <Flex full class="justify-center items-stretch content-start gap-8">
                <Flex
                    v-for="article in articles"
                    :key="article.title"
                    col
                    :class="`rounded-lg shadow-element dark:shadow-element-dark bg-${shade}-${backTint} dark:bg-${shade}-${backTintDark}`"
                    w="w-[350px]">
                    <img :src="article.thumbnail" class="w-[350px] aspect-[7/4] object-cover rounded-t-lg">
                    <Flex col start full class="py-4 px-6 h-full">
                        <h3 class="line-clamp-2" no-space>
                            {{ article.title }}
                        </h3>
                        <p class="whitespace-pre-line line-clamp-3 mb-4 grow">
                            {{ article.subtitle }}
                        </p>
                        <Flex full between class="px-7">
                            <p class="text-muted">
                                {{ article.date }}
                            </p>
                            <UButton :color="shade">See more</UButton>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Section>
    </Page>
</template>
