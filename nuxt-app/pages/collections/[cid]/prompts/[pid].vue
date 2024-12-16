<script setup lang="ts">
const route = useRoute();
const { data, status } = await useFetch(`/api/prompts/${route.params.pid}`);
</script>
<template>
    <LayoutSectionContainer>
        <LayoutSection :title="data?.name">
            <pre>{{ data }}</pre>
        </LayoutSection>
    </LayoutSectionContainer>
</template>