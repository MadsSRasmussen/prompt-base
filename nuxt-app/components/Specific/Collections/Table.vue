<script setup lang="ts">
import type { DataTableColumnDescription, DropdownTableDescription } from '~/components/Util/Data/types';
import { useCollections } from '~/composables/collections/useCollections';
import type { Collection } from '~/types/db';

const { store, create, rename } = useCollections();

const collections = computed(() => store.data.value ? store.data.value.map(coll => ({ ...coll, to: `/collections/${coll.id}`, icon: 'i-heroicons-folder', created_at: new Date(coll.created_at).toUTCString() })) : []);

const columns: DataTableColumnDescription<Collection>[] = [{
    key: 'name',
    label: 'Collection Name',
}, {
    key: 'created_at',
    label: 'Created'
}, {
    key: 'id',
    label: 'ID',
    weight: 0.25,
}];

const dropdownDescriptions: DropdownTableDescription<Collection>[][] = [
    [{
        label: 'Rename',
        icon: 'i-heroicons-pencil',
        click: rename.displayModal
    }]
]

const filter = ref<string>('');


</script>
<template>
    <UtilDataTableBorderWrapper>
        <template #top>
            <UInput v-model="filter" placeholder="Filter" class="flex-grow" />
            <UButton @click="create.displayModal()" label="Add collection" color="gray" />
            <UButton @click="store.refresh" icon="i-heroicons-arrow-path" color="gray" :loading="store.status.value === 'pending'" />
        </template>
        <UtilDataTable 
            :columns
            :rows="collections"
            :dropdown-description="dropdownDescriptions"
            :pending="store.status.value === 'pending'"
            :filter
        />
    </UtilDataTableBorderWrapper>
    <UtilModalInput 
        v-model:display="create.display.value"
        v-model:value="create.name.value"
        title="Create collection"
        @submit="create.submit"
    />

    <UtilModalInput 
        v-model:display="rename.display.value"
        v-model:value="rename.name.value"
        title="Rename collection"
        @submit="rename.rename"
    />
</template>