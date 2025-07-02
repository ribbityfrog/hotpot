<script setup lang="ts">
import { decompressUrlSafe } from '~/utils/lmza'

const route = useRoute()
const router = useRouter()

const newQuery = { ...route.query }
delete newQuery.t // Remove the specific param

router.replace({ query: newQuery })

const props = defineProps({
    content: {
        type: String,
        required: true
    }
})
const isOpened = ref(true)


let uncompressed: Record<string, any>
try {
    uncompressed = JSON.parse(decompressUrlSafe(props.content))

    const possibleKeys = ['slates', 'colors', 'others']
    let count = 0
    for (const key of Object.keys(uncompressed)) {
        if (!possibleKeys.includes(key))
            isOpened.value = false
        count++
    }
    if (!count) isOpened.value = false
    
} catch {
    isOpened.value = false
}

function loadStyling() {
    theme.loadStyling(uncompressed)
    isOpened.value = false
}

</script>

<template>
    <UModal v-model:open="isOpened" title="Styling importer" description="You opened hotpot from a styling link">
        <template #body>
            <Flex full col center class="gap-y-2">
                <p>You are about to import a styling shared directly in the url</p>
                <p class="font-semibold">This will replace your erase and replace your current styling</p>
                <p>You can reset to default styling from the bottom burger menu</p>
                <Flex full evenly class="mt-4">
                    <UButton @click="loadStyling()">Import styling</UButton>
                    <UButton color="error" @click="isOpened = false">Cancel</UButton>
                </Flex>
            </Flex>
        </template>
    </UModal>
</template>
