<script setup lang="ts">
const links = [{
  label: 'Home',
  icon: 'i-heroicons-home',
  to: '/'
}, {
  label: 'Collections',
  icon: 'i-heroicons-chart-bar',
  to: '/collections'
}]
</script>

<template>
  <UVerticalNavigation class="w-full" :links="links" />
</template>