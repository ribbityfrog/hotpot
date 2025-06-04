<template>
    <Flex center wrap>
        <ColorPicker v-for="themeColor in themeColorEntries" :key="themeColor" :color="themeColor" />
    </Flex>
</template>
