import { getCurrentUser } from "~/composables/firebase/useCurrentUser"

export default defineNuxtRouteMiddleware(async (to, from) => {

    const openRoutes = ['/login', '/forbidden'];
    if (openRoutes.includes(to.path)) return;

    const user = await getCurrentUser();

    if (!user) return navigateTo('/login');
});