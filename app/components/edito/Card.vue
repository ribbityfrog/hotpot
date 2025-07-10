<script setup lang="ts">

const props = defineProps({
    numero: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        default: undefined
    },
    soon: {
        type: Boolean,
        default: false
    }
})

</script>

<template>
    <Flex col start class="transition-transform duration-300 ease-in-out group w-60 py-8 px-6 rounded-3xl gap-4 bg-neutral-50 dark:bg-neutral-800 shadow-element cursor-pointer hover:-translate-y-2" @click="navigateTo(props.link)">
        <Flex full between-start>
            <div class="w-1/2">
                <Flex center class="w-12 rounded-full bg-primary text-inverted aspect-square">
                    <p class="text-lg font-semibold">{{ props.numero }}</p>
                </Flex>
            </div>
            <Flex v-if="!props.soon" end class="w-1/2 text-right gap-x-2">
                <p class="transition-colors duration-300 ease-in-out font-medium text-neutral-50 dark:text-neutral-800 group-hover:text-primary">let's go!</p>
                <p class="transition-colors duration-300 ease-in-out text-3xl group-hover:text-primary">↗</p>
            </Flex>
            <p v-else class="text-error text-center font-semibold">coming soon</p>
        </Flex>
        <h3>{{ props.title }}</h3>
        <p class="mr-12">{{ props.description }}</p>
    </Flex>
</template>
