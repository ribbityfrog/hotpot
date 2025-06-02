<script setup lang="ts">

definePageMeta({
    layout: 'admin'
})

const users = leFetch.get('/admin/users/list')

const columns = [{
    accessorKey: 'email',
    header: 'Email',
},
{
    accessorKey: 'isVerified',
    header: 'Verified',
    bool: true
},
{
    accessorKey: 'isBanned',
    header: 'Banned',
    bool: true
},
{
    accessorKey: 'isAdmin',
    header: 'Admin',
    bool: true
},
{
    accessorKey: 'lastConnection',
    header: 'Last connection',
    date: true,
},
{
    accessorKey: 'createdAt',
    header: 'Creation date',
    date: true,
}]

const updateEndpoint = '/admin/users/update'

</script>

<template>
    <Page>
        <Section title="Users" title-center>
            <KitTable
                v-model="users.data"
                :columns="columns"
                filterable
                hideable
                sortable
                sticky>
                <template #expanded="{ row }">
                    <Flex col start class="gap-y-4">
                        <p>Email: {{ row.original.email }}</p>
                        <Flex inline class="gap-x-2">
                            <p>Verified</p>
                            <KitSwitchApi v-model="row.original.isVerified" :api="{ id: row.original.id, key: 'isVerified', ep: updateEndpoint }" />
                        </Flex>
                        <Flex inline class="gap-x-2">
                            <p>Banned</p>
                            <KitSwitchApi v-model="row.original.isBanned" :api="{ id: row.original.id, key: 'isBanned', ep: updateEndpoint }" />
                        </Flex>
                        <AdminButtonDisconnect :uid="row.original.id" />
                    </Flex>
                </template>
            </KitTable>
        </Section>
    </Page>
</template>
