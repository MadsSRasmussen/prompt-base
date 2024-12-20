// deno-lint-ignore-file

export type DataTableRowDescription<T extends Record<string, any>> = {
  icon?: string;
  to?: string;
} & T;
export type DataTableColumnDescription<T extends Record<string, any>> = {
  key: keyof T;
  label: string;
  weight?: number;
};
export type DropdownTableDescription<T extends Record<string, any>> = {
  label: string;
  icon?: string;
  click?: (data: DataTableRowDescription<T>) => void;
};
