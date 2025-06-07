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
const backTint: Ref<ThemeTint> = ref('100')
const backTintDark: Ref<ThemeTint> = ref('700')

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
            <Flex full center-start class="gap-8">
                <Flex
                    v-for="article in articles"
                    :key="article.title"
                    col
                    :class="`bg-${shade}-${backTint} dark:bg-${shade}-${backTintDark} rounded-lg shadow-element`"
                    w="w-[350px]">
                    <img :src="article.thumbnail" class="w-[350px] aspect-[7/4] object-cover rounded-t-lg">
                    <div class="py-4 px-6">
                        <h3 class="line-clamp-2" no-space>
                            {{ article.title }}
                        </h3>
                        <p class="whitespace-pre-line line-clamp-3 mb-4">
                            {{ article.subtitle }}
                        </p>
                        <Flex between class="px-7">
                            <p class="text-muted">
                                {{ article.date }}
                            </p>
                            <UButton :color="shade">See more</UButton>
                        </Flex>
                    </div>
                </Flex>
            </Flex>
        </Section>
    </Page>
</template>
