<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  }, 
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
});
</script>
<template>
  <div class="bg-gray-50 dark:bg-gray-900 flex justify-between flex-col w-full h-full left-0 top-0 p-5">
    <div>
      <GraphicApplicationLogo />
      <NavigationSidebar />
    </div>
    <UButton
      :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      color="gray"
      variant="ghost"
      aria-label="Theme"
      @click="isDark = !isDark"
      
      class="justify-center"
    />
  </div>
</template>