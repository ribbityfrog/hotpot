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
            <ULink to="mailto:contact@steamfrog.net" tab>contact@frogpond.dev</ULink>
        </Flex>
    </Flex>
</template>
