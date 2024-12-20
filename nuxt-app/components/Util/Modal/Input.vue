<script setup lang="ts">
const display = defineModel<boolean>('display');
const value = defineModel<string>('value');
defineEmits(['submit']);
defineProps<{
    title: string,
    message?: string,
    placeholder?: string,
    buttonLabel?: string,
    pending?: boolean,
}>();
</script>
<template>
    <UModal v-model="display">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <h2 class="font-bold text-2xl">{{ title }}</h2>
            </template>
            <div class="flex flex-col gap-4">
                <div class="text-sm text-gray-600 dark:text-gray-300">
                    {{ message }}
                </div>
                <div class="flex gap-4">
                    <UInput @keyup.enter="$emit('submit')" v-model="value" :placeholder="placeholder" class="flex-grow"/>
                    <UButton color="gray" :label="buttonLabel ? buttonLabel : 'Submit'" @click="$emit('submit')" :loading="pending" :disabled="pending" />
                </div>
            </div>

        </UCard>
    </UModal>
</template>