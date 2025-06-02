<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { getPaginationRowModel } from '@tanstack/vue-table'
import { UTable } from '#components'

export type TableColumnEnriched<T = any> = TableColumn<T> & {
    sortable?: boolean
    hideable?: boolean
    hidden?: boolean
    bool?: boolean
    date?: boolean
    cost?: boolean
}

const Flex = resolveComponent('Flex')
const KitIcon = resolveComponent('KitIcon')
const UContextMenu = resolveComponent('UContextMenu')

const instance = getCurrentInstance()

const data = defineModel<any[]>({ required: true })

const props = defineProps({
    columns: {
        type: Array as PropType<TableColumnEnriched[]>,
        default: () => []
    },
    loading: {
        type: Boolean,
        default: false
    },
    hMax: {
        type: String,
        default: ''
    },
    sticky: {
        type: Boolean,
        default: false
    },
    sortable: {
        type: Boolean,
        default: false
    },
    hideable: {
        type: Boolean,
        default: false
    },
    filterable: {
        type: Boolean,
        default: false
    },
    pagination: {
        type: Number,
        default: 100
    }
})

type Hideable = {
    id: string
    label: string
    hidden: boolean 
}

const preparedColumns: TableColumn<any>[] = []
const hideables: Ref<Hideable[]> = ref([])

if (Object.keys(instance?.slots || {}).includes('expanded') && props.columns[0]?.id !== 'expand')
    preparedColumns.push({
        id: 'expand',
        cell: ({ row }: any) =>
        {
            const isExpanded = row.getIsExpanded()
            return h(KitIcon, {
                name: 'i-lucide-chevron-right',
                aria: `${isExpanded ? 'Collapse' : 'Expand'}`,
                class: `${isExpanded ? 'duration-200 rotate-90' : ''}`,
                interactable: true,
                onClick: () => row.toggleExpanded()
            })
        }
    }, )

props.columns.forEach((entry: any) => {
    const { sortable, hideable, hidden, date, bool, cost, ...rest } = entry
    const header = rest.header

    const key = entry.id ?? entry.accessorKey
    if (typeof key === 'string' && key.length > 0)
    {
        if (date)
            rest.cell = ({ row }: any) => {
                const rowDate = row.getValue(key)
                if (typeof rowDate !== 'string' || rowDate.length <= 0)
                    return '-'
                return dateToText(rowDate)
            }
        else if (bool)
            rest.cell = ({ row }: any) => {
                const rowBool = row.getValue(key)
                if (typeof rowBool !== 'boolean')
                    return '-'
                return h(KitIcon, { 
                    name: rowBool ? 'i-lucide-check' : 'i-lucide-x',
                    aria: rowBool ? 'True' : 'False',
                    class: rowBool ? 'text-confirm' : 'text-cancel'
                })
            }
        else if (cost)
            rest.cell = ({ row }: any) => {
                const rowPrice = row.getValue(key)

                if (!rowPrice)
                    return '-'

                const convertedPrice = +rowPrice

                if (Number.isNaN(convertedPrice))
                    return '-'
                
                return numberToPrice(convertedPrice / 100)
            }
    }


    if (typeof header !== 'string' || header.length <= 0)
        return preparedColumns.push(rest)

    let isHideable = false
    if ((props.hideable || hideable || hidden) && (entry.id || entry.accessorKey))
    {
        hideables.value.push({ id: entry.id ?? entry.accessorKey, label: entry.header, hidden: hidden === true })
        isHideable = true
    }

    rest.header = ({ column }: any) => {

        let hideMenu: VNode | undefined
        if (isHideable)
            hideMenu = h(UContextMenu, {
                items: [{
                    icon: 'i-lucide-eye-off',
                    label: 'Hide',
                    onSelect: () => columnVisibilitySelected.value.push(hideables.value.find((entry) => entry.id === column.id)!)
                }]
            }, () => h('p', { class: 'text-center' }, header))
        
        if ((props.sortable || sortable))
        {
            const isSorted = column.getIsSorted()

            return h('div', { class: 'flex gap-x-2' }, [
                h(KitIcon, {
                    name: isSorted ?
                        (isSorted === 'asc' ? 'i-lucide-arrow-up-narrow-wide' : 'i-lucide-arrow-down-wide-narrow') : 
                        'i-lucide-arrow-up-down',
                    aria: 'Sort' + isSorted ?
                        (isSorted === 'asc' ? ' (ASC)' : ' (DESC)') : 
                        '',
                    interactable: true,
                    onClick: () => column.toggleSorting()
                }),
                hideMenu ?? h('p', { class: 'text-center' }, header)
            ] )
        }
        else
            return hideMenu ?? header
    }

    preparedColumns.push(rest)
})

const columnVisibilitySelected = ref(hideables.value.filter((entry) => entry.hidden))
const columnVisibility = computed(() => columnVisibilitySelected.value.reduce((acc: Record<string, boolean>, cur) => {
    acc[cur.id] = false
    return acc
}, {}))

const sorting = ref([])

const globalFilter = ref('')

const table = useTemplateRef<any>('table')

const paginationConfig = ref({
    pageIndex: 0,
    pageSize: props.pagination
})
const dataCount = computed(() => table.value?.tableApi.getFilteredRowModel().rows.length || data.value.length || 0)

watch(dataCount, (newCount, oldCount) => {
    console.log(newCount, oldCount)
    if (newCount < oldCount)
        paginationConfig.value.pageIndex = 0
})

</script>

<template>
    <Flex col tight center class="gap-y-4">
        <Flex tight between wrap class="gap-2">
            <UFormField v-if="props.filterable" name="filterGlobal" label="Global filter">
                <UInput v-model="globalFilter" placeholder="Search for anything..." />
            </UFormField>
            <div v-else/>
            <KitTablePagination v-if="!$device.isMobile && dataCount > props.pagination && table?.tableApi" :table="table.tableApi" :count="dataCount" />
            <div v-else/>
            <UFormField v-if="hideables.length > 0" name="hideable" label="Hidden columns">
                <USelectMenu
                    v-model="columnVisibilitySelected"
                    :items="hideables"
                    multiple
                    selected-icon="i-lucide-eye-off"
                    placeholder="No column hidden"
                    class="w-48" />
            </UFormField>
            <div v-else/>
        </Flex>
        <KitTablePagination v-if="$device.isMobile && dataCount > props.pagination && table?.tableApi" :table="table.tableApi" :count="dataCount" class="self-end"/>
        <UTable
            ref="table"
            v-model:column-visibility="columnVisibility"
            v-model:global-filter="globalFilter"
            v-model:sorting="sorting"
            v-model:pagination="paginationConfig"
            :loading="loading"
            :class="`max-w-full ${props.hMax}`"
            :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }"
            :data="data"
            :columns="preparedColumns"
            loading-state="carousel"
            :sticky="props.sticky">
            <template v-for="(slotFn, slotName) in instance?.slots" #[slotName]="slotProps">
                <slot :name="slotName" v-bind="slotProps || {}" />
            </template>
        </UTable>
        <Flex tight between>
            <div />
            <KitTablePagination v-if="dataCount > props.pagination && table?.tableApi" :table="table.tableApi" :count="dataCount" class="self-end"/>
        </Flex>
    </Flex>
</template>
