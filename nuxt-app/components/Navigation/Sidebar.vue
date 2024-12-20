<script setup lang="ts">
import { useCurrentUser } from '~/composables/firebase/useCurrentUser';

const { user } = useCurrentUser();
const route = useRoute();

const links = computed(() => [[{
  label: user.value?.fb.displayName ?? 'Unknown user',
  avatar: {
    src: user.value?.fb.photoURL ?? '',
  },
  to: '/profile',
}], [{
  label: 'Home',
  icon: 'i-heroicons-home',
  to: '/'
}, {
  label: 'Prompts',
  icon: 'i-heroicons-circle-stack',
  to: route.path.startsWith('/collections') ? route.path : '/collections'
}, {
  label: 'Playground',
  icon: 'i-heroicons-code-bracket-square',
  to: '/playground'
}], [{
  label: 'Api Keys',
  icon: 'i-heroicons-key',
  to: '/keys'
}, {
  label: 'Organisations',
  icon: 'i-heroicons-building-office-2',
  to: '/organisations',
}]]);
</script>

<template>
  <UVerticalNavigation class="w-full" :links="links" />
</template>