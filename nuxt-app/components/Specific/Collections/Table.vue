<script setup lang="ts">
import type { DataTableColumnDescription, DropdownTableDescription } from '~/components/Util/Data/types';
import { useCollections } from '~/composables/collections/useCollections';
import type { Collection } from '~/types/db';

const { store, create, rename, remove } = useCollections();

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

const dropdownDescriptions: DropdownTableDescription<Collection>[][] = [[{
        label: 'Rename',
        icon: 'i-heroicons-pencil',
        click: rename.displayModal
    }], [{
        label: 'Delete',
        icon: 'i-heroicons-trash',
        click: remove.displayModal
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
        :pending="create.pending.value"
        @submit="create.submit"
        title="Create collection"
        button-label="Create"
        message="Enter the name of the collection in the input below."
    />
    <UtilModalInput 
        v-model:display="rename.display.value"
        v-model:value="rename.name.value"
        :pending="rename.pending.value"
        @submit="rename.submit"
        title="Rename collection"
        button-label="Rename"
        message="Enter the new name of the collection in the input below."
    />
    <UtilModalButton 
        v-model:display="remove.display.value"
        :pending="remove.pending.value"
        @submit="remove.submit"
        title="Remove collection"
        button-label="Remove collection"
        message="Are you sure you want to delete all prompts in this collection. This action cannot be undone."
    />
</template>