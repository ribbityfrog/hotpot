<script setup lang="ts">

const props = defineProps({
    italic: {
        type: Boolean,
        default: false
    }
})

const classText = `${props.italic ? 'italic' : ''}`

</script>

<template>
    <Flex col center>
        <p :class="classText">An issue ? A question ?</p>
        <Flex center >
            <KitLink to="mailto:contact@preprod.tech" tab>contact@preprod.tech</KitLink>
        </Flex>
    </Flex>
</template>
