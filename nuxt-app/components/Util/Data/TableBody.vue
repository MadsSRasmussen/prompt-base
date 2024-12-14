<script setup lang="ts" generic="T extends Record<string, any>">
import type { DataTableRowDescription, DataTableColumnDescription, DropdownTableDescription } from './types';
import type { DropdownItem } from '#ui/types';

const props = defineProps<{
  rows: DataTableRowDescription<T>[],
  columns: DataTableColumnDescription<T>[],
  dropdownDescription?: DropdownTableDescription<T>[][],
}>();
const anyHasIcon = computed(() => props.rows.some((row) => !!row.icon));
function remapDropdownDescription(row: DataTableRowDescription<T>): DropdownItem[][] {
  if (!props.dropdownDescription) throw new Error('Dropdown Descriptions must be defined');
  return props.dropdownDescription.map((group) =>
    group.map((item) => ({
      ...item,
      click: item.click
        ? (e: MouseEvent) => {
          // e.preventDefault();
          item.click!(row);
        }
        : undefined
    }))
  )
}
</script>
<template>
  <UtilNavigationPotentialLinkWrapper v-for="(row, index) in rows" :to="row.to" :key="row.to"
    class="flex gap-2 text-gray-500 dark:text-gray-400 text-sm px-4 py-4"
    :class="`${row.to ? 'hover:bg-gray-50 dark:hover:bg-gray-800/50' : ''}${index !== rows.length - 1 ? ' border-b border-gray-200 dark:border-gray-700' : ''}`">
    <div class="flex-grow grid grid-cols-3 gap-2"
      :style="{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }">
      <div v-for="(column, index) in columns" class="flex gap-2 align-middle">
        <div v-if="anyHasIcon && index == 0" class="w-4 min-w-4">
          <UIcon v-if="row.icon" class="w-full h-full" :name="row.icon" />
        </div>
        <div class="flex-grow overflow-x-hidden text-ellipsis text-nowrap flex items-center">{{ row[column.key] }}</div>
        <div v-if="dropdownDescription && index == columns.length - 1" class="w-6 h-6 min-w-6 min-h-6">
          <UDropdown @click.stop class="h-full w-full hover:bg-gray-200 dark:hover:bg-gray-600/50 rounded-full p-1"
            :items="remapDropdownDescription(row)">
            <UIcon class="w-full h-full" name="i-heroicons-ellipsis-vertical" />
          </UDropdown>
        </div>
      </div>
    </div>
  </UtilNavigationPotentialLinkWrapper>
</template>
<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>