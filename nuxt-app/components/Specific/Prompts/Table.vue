<script setup lang="ts">
import type { DataTableColumnDescription } from '~/components/Util/Data/types';
import { useAuthFetch } from '~/composables';
import type { Prompt } from '~/types/db';

const route = useRoute();

const { data, status, refresh } = await useAuthFetch<Prompt[]>(`/api/collections/${route.params.cid}`);
const prompts = computed(() => data.value ? data.value.map(prompt => ({ ...prompt, to: `/collections/${route.params.cid}/prompts/${prompt.id}`, icon: 'i-heroicons-code-bracket', created_at: new Date(prompt.created_at).toUTCString() })) : [])

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

const filter = ref<string>('');

function createWithPopup() {};
</script>
<template>
    <UtilDataTableBorderWrapper>
        <template #top>
            <UInput v-model="filter" placeholder="Filter" class="flex-grow" />
            <UButton @click="createWithPopup" label="Add prompt" color="gray" />
            <UButton @click="refresh" icon="i-heroicons-arrow-path" color="gray" :loading="status === 'pending'" />
        </template>
        <UtilDataTable 
            :columns
            :rows="prompts"
            :pending="status === 'pending'"
            :filter
        />
    </UtilDataTableBorderWrapper>
    
</template>