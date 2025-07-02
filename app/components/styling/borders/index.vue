<template>
    <Flex col center class="gap-6">
        <Flex center class="gap-4" wrap>
            <Flex
                v-for="border in themeColorsBorder"
                :key="border"
                col
                center
                :class="`p-2 border-4 ${border} rounded-sm`">
                <div :class="`p-2 border-2 ${border} rounded-lg`">
                    <div :class="`px-5 pb-5 pt-3 border-[1px] ${border} rounded-xl`">
                        <ColorSelector col :color="border" labeled />
                    </div>
                </div>
            </Flex>
        </Flex>
        <Flex col center>
            <Flex v-for="bg in themeColorsBackground" :key="bg" center wrap>
                <Flex
                    v-for="border in themeColorsBorder"
                    :key="border"
                    center
                    wrap
                    :class="`${bg} p-4`">
                    <StylingBordersSample :color="border" :class="bg === 'bg-inverted' ? 'text-inverted' : ''" />
                </Flex>
            </Flex>
        </Flex>
    </Flex>
</template>
