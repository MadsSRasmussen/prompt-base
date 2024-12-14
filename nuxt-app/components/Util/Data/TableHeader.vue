<script setup lang="ts" generic="T extends Record<string, any>">
import type { DataTableColumnDescription } from './types';
defineProps<{
  columns: DataTableColumnDescription<T>[],
}>();
</script>
<template>
  <div name="header"
    class="flex gap-2 w-full px-4 py-4 text-sm font-semibold border-b border-gray-200 dark:border-gray-700">
    <div class="flex-grow grid grid-cols-3"
      :style="{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }">
      <div v-for="column in columns" class="flex">
        <span class="overflow-x-hidden text-ellipsis text-nowrap">{{ column.label }}</span>
      </div>
    </div>
  </div>
</template>