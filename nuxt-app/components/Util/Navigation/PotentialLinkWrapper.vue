<script setup lang="ts">
defineProps<{
    to?: string 
}>();

const router = useRouter();
</script>
<template>
    <div v-if="to" class="cursor-pointer" @click="router.push(to)"><slot /></div>
    <div v-else><slot /></div>
</template>