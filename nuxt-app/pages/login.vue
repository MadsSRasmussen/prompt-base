<script setup lang="ts">
import { useCurrentUser } from '~/composables/firebase/useCurrentUser';

const router = useRouter();
const { signInUserWithPopup } = useCurrentUser();

definePageMeta({
    layout: 'full-page',
})

async function login() {
    try {
        await signInUserWithPopup();
        router.push('/');
    } catch(error) {
        console.error('An error occured during signIn');
        throw error;
    }
}
</script>
<template>
    <div class="w-full flex justify-center">
        <div class="w-80 h-[100vh] p-8 flex flex-col justify-center">
            <GraphicApplicationLogo />
            <UButton color="gray" block @click="login" class="flex gap-2">
                <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" class="w-4 h-4">
                Login med Google
            </UButton>
        </div>

    </div>
</template>