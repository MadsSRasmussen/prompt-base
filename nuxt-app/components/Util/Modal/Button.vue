<script setup lang="ts">
const display = defineModel<boolean>('display');
defineProps<{
    title: string,
    message?: string,
    pending?: boolean,
    buttonLabel?: string,
}>();
defineEmits(['submit']);
</script>
<template>
    <UModal v-model="display">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <h2 class="font-bold text-2xl">{{ title }}</h2>
            </template>
            <div class="flex flex-col gap-4 text-sm">
                <span class="text-gray-600 dark:text-gray-300">{{ message }}</span>
                <UButton block color="gray" :label="buttonLabel ? buttonLabel : 'Submit'" @click="$emit('submit')" :loading="pending" :disabled="pending"/>
            </div>
        </UCard>
    </UModal>
</template>