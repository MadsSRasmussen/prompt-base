<script setup lang="ts">
const colorMode = useColorMode();
</script>
<template>
  <div class="grid grid-flow-row grid-cols-[300px_1fr] fixed w-full h-full bg-gray-100 dark:bg-gray-800">
    <LayoutSidebar />
    <div class="p-10 pl-12 pr-12 overflow-y-auto" :class="colorMode.value === 'dark' ? 'dark-shadow' : 'light-shadow'">
      <slot></slot>
    </div>
  </div>
  <UNotifications />
</template>
<style scoped>
.light-shadow {
  box-shadow: inset 36px 0px 36px -16px rgb(194, 194, 194);
}
.dark-shadow {
  box-shadow: inset 36px 0px 36px -16px rgb(27, 27, 27);
}
</style>