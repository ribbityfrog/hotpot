<template>
    <Flex center wrap>
        <ColorPicker v-for="themeShade in themeShadeEntries" :key="themeShade" :color="themeShade" />
    </Flex>
</template>
