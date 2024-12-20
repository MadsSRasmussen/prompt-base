<script setup lang="ts">
import type { DataTableColumnDescription, DropdownTableDescription } from '~/components/Util/Data/types';
import { useAuthFetch } from '~/composables';
import { usePrompts } from '~/composables/prompts/usePrompts';
import type { Prompt } from '~/types/db';

const route = useRoute();
const { store, create, rename, remove } = usePrompts(Number(route.params.cid));

const prompts = computed(() => store.data.value ? store.data.value.map(prompt => ({ ...prompt, to: `/collections/${route.params.cid}/prompts/${prompt.id}`, icon: 'i-heroicons-code-bracket', created_at: new Date(prompt.created_at).toUTCString() })) : [])

const columns: DataTableColumnDescription<Prompt>[] = [{
    key: 'name',
    label: 'Prompt name',
}, {
    key: 'created_at',
    label: 'Created'
}, {
    key: 'id',
    label: 'ID',
    weight: 0.25,
}]

const dropdownDescriptions: DropdownTableDescription<Prompt>[][] = [[{
        label: 'Rename',
        icon: 'i-heroicons-pencil',
        click: rename.displayModal,
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
            <UButton @click="create.displayModal" label="Add prompt" color="gray" />
            <UButton @click="store.refresh" icon="i-heroicons-arrow-path" color="gray" :loading="store.status.value === 'pending'" />
        </template>
        <UtilDataTable 
            :columns
            :rows="prompts"
            :pending="store.status.value === 'pending'"
            :filter
            :dropdown-description="dropdownDescriptions"
        />
    </UtilDataTableBorderWrapper>
    <UtilModalInput 
        v-model:display="create.display.value"
        v-model:value="create.name.value"
        :pending="create.pending.value"
        @submit="create.submit"
        title="Create prompt"
        button-label="Create"
        message="Enter a name for the prompt in the input below."
    />
    <UtilModalInput 
        v-model:display="rename.display.value"
        v-model:value="rename.name.value"
        :pending="rename.pending.value"
        @submit="rename.submit"
        title="Rename prompt"
        button-label="Rename"
        message="Enter the name for the prompt in the input below"
    />
    <UtilModalButton 
        v-model:display="remove.display.value"
        :pending="remove.pending.value"
        @submit="remove.submit"
        title="Delete prompt"
        button-label="Delete prompt"
        message="Are you sure you want to delete this prompt? This action cannot be undone."
    />
</template>