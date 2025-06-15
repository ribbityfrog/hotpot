<template>
    <Flex center wrap>
        <ColorPicker v-for="themeShade in themeShades" :key="themeShade" :shade="themeShade" />
    </Flex>
</template>
