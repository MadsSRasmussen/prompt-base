<template>
  <div class="border rounded-lg border-gray-200 dark:border-gray-700">
    <div class="flex px-2 py-2 gap-4 border-b border-gray-200 dark:border-gray-700">
      <slot name="top"></slot>
    </div>
    <slot></slot>
  </div>
</template>