<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'

const props = defineProps({
    table: {
        type: Object as PropType<Table<any>>,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
})

</script>

<template>
    <div>
        <UPagination
            :default-page="(props.table.getState().pagination.pageIndex || 0) + 1"
            :items-per-page="table.getState().pagination.pageSize" 
            :total="props.count"
            @update:page="(p: number) => table.setPageIndex(p - 1)"
        />
    </div>
</template>
