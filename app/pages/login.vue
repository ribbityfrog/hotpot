<script setup lang="ts">

if (import.meta.client && leAuth.isAuthenticated) 
    navigateTo('/')

definePageMeta({
    layout: 'empty'
})

</script>

<template>
    <Page middle>
        <Section class="mb-8">
            <img src="/img/brand/logo.png" alt="Logo Launchbase" class="w-full max-w-[300px]" >
        </Section>
        <Section>
            <AccountConnect />
        </Section>    
    </Page>
</template>
