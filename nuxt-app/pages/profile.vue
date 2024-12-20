<script setup lang="ts">
import { signOut as fbSignOut } from "firebase/auth"
import { useFirebase } from "~/composables/firebase/useFirebase";

const router = useRouter();

async function signOut() {
  const { auth } = useFirebase();
  await fbSignOut(auth);
  router.push('/login');
}
</script>

<template>
  <div>Profile page</div>
  <UButton @click="signOut" label="Log out" />
</template>