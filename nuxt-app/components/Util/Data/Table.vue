<script setup lang="ts" generic="T extends Record<string, any>">
import type { DataTableColumnDescription, DataTableRowDescription, DropdownTableDescription } from './types';

const props = defineProps<{
  rows: DataTableRowDescription<T>[],
  columns: DataTableColumnDescription<T>[],
  dropdownDescription?: DropdownTableDescription<T>[][],
  pending?: boolean,
  filter?: string,
}>();

const filteredRows = computed<DataTableRowDescription<T>[]>(() => {
  if (!props.filter) return props.rows;
  return props.rows.filter((row) => {
    return props.columns
      .map(coll => row[coll.key])
      .some(value =>
        String(value)
          .toLocaleLowerCase()
          .includes(props.filter!.toLocaleLowerCase())
      )
  })
});
</script>
<template>
  <UtilDataTableHeader :columns />
  <UtilDataTablePending v-if="pending" />
  <UtilDataTableBody v-else-if="filteredRows.length" :rows="filteredRows" :columns
    :dropdown-description="dropdownDescription" />
  <UtilDataTableNoElement v-else />
</template>