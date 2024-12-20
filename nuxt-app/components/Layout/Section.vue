<script setup lang="ts">
defineProps<({
    title?: string
})>();
</script>
<template>
    <div class="mt-2 mb-2">
        <div v-if="title" class="w-full flex">
            <h2 class="text-xl pb-2 font-semibold pl-4">{{ title }}</h2>
        </div>
        <div class="w-full flex flex-col bg-white dark:bg-gray-900 shadow-lg p-4 rounded-md">
            <slot></slot>
        </div>  
    </div>
</template>