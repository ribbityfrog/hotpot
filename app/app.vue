<script setup lang="ts">

theme.init()

const colorMode = useColorMode()

watch(colorMode, () => {
    theme.applySlates()
    theme.applyColors()
})

const mouseDown = useState('isMouseDown', () => false)
onMounted(() => {
    if (import.meta.client) {
        window.addEventListener('mousedown', () => mouseDown.value = true)
        window.addEventListener('mouseup', () => mouseDown.value = false)
    }
})

const route = useRoute()
const sharedStyling = route.query.t

</script>

<template>
    <UApp :toaster="{ position: 'top-left' }">
        <NuxtLayout>
            <NuxtPage />

            <StylingModalImport v-if="sharedStyling && !Array.isArray(sharedStyling)" :content="sharedStyling" />
        </NuxtLayout>
    </UApp>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(.44rem);
}

.slide-fade-enter-active {
  transition: all 0.07s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.07s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.14s ease-out;
}

.fade-leave-active {
  transition: all 0.07s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
