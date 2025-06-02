<script setup lang="ts">
function fetchSand() {
    leFetch.getOnce('/sand', { success: [(payload) => console.log(payload.data)] })
}

function fetchSandGuarded() {
    leFetch.getOnce('/sandGuarded', { success: [(payload) => console.log(payload.data)] })
}

async function fetchSandSSR() {
    console.log(await leFetch.getSSR('/sand'))
}

</script>

<template>
    <Page>
        <Section title="Test API" class-content="gap-y-8">
            <UButton @click="fetchSand">Sand</UButton>
            <UButton @click="fetchSandGuarded">SandGuarded</UButton>
            <UButton @click="fetchSandSSR">SandSSR</UButton>
        </Section>
    </Page>
</template>
