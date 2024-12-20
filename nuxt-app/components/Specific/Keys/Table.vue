<script setup lang="ts">
import type { DataTableColumnDescription, DropdownTableDescription } from '~/components/Util/Data/types';
import { useKeys } from '~/composables/keys/useKeys';
import type { ApiKey } from '~/types/db';

const { store, create, revoke } = useKeys();
const keys = computed(() => store.data.value ? store.data.value.map(key => ({ ...key, icon: 'i-heroicons-key', created_at: new Date(key.created_at).toUTCString(), peek: `sk-${key.peek}...` })) : []);

const columns: DataTableColumnDescription<ApiKey>[] = [{
    key: 'name',
    label: 'Name',
},  {
    key: 'created_at',
    label: 'Created',
}, {
    key: 'peek',
    label: 'Key peek',
    weight: 0.5,
}];

const dropdownDescriptions: DropdownTableDescription<ApiKey>[][] = [[{
    label: 'Revoke',
    icon: 'i-heroicons-x-circle',
    click: revoke.displayModal,
}]]

async function copyKeyToClipboard() {
    const toast = useToast();
    await navigator.clipboard.writeText(create.createdKey.value);
    toast.add({ title: 'Api key copied to clipboard' });
}

const filter = ref<string>('');
</script>
<template>
    <div class="flex gap-2">
        <UInput class="flex-grow" v-model="filter" placeholder="filter" />
        <UButton color="gray" variant="solid" label="Create key" @click="create.displayModal" class="self-end" />
    </div>
    <UtilDataTable 
        :columns="columns"
        :rows="keys"
        :dropdown-description="dropdownDescriptions"
        :pending="store.status.value === 'pending'"
        :filter
    />
    <UtilModalInput 
        v-model:display="create.display.value"
        v-model:value="create.name.value"
        :pending="create.pending.value"
        @submit="create.submit"
        title="Create key"
        button-label="Create"
        message="Enter the name of the key you would like to create in the input below."
    />
    <UModal v-model="create.displayCreated.value">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <h2 class="font-bold text-2xl">Created secret key!</h2>
            </template>
            <div class="flex flex-col gap-4 text-sm">
                <span class="text-gray-600 dark:text-gray-300">Api key successfully created, this key can never be viewed again!</span>
                <div class="flex gap-2">
                    <UInput v-model="create.createdKey.value" disabled class="flex-grow" />
                    <UButton variant="ghost" icon="i-heroicons-eye-dropper" @click="copyKeyToClipboard"/>
                </div>
                
            </div>
        </UCard>
    </UModal>
    <UtilModalButton 
        v-model:display="revoke.display.value"
        :pending="revoke.pending.value"
        @submit="revoke.submit"
        title="Revoke key"
        button-label="Revoke"
        message="Are you sure you want to revoke this key? This operation cannot be undone."
    />
</template>