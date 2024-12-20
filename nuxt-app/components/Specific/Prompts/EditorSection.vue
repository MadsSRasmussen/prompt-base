<script setup lang="ts">
import { usePrompt } from '~/composables/prompts/usePrompt';

const route = useRoute();
const { writer, name, variables } = usePrompt(Number(route.params['pid']));

function handleKeydown(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.key === 's') {
        event.preventDefault();
        writer.write();
    }

    if (event.key === '{' && event.shiftKey) {
        const textarea = event.target as HTMLTextAreaElement;
        const { selectionStart, selectionEnd, value } = textarea;
        if (value[selectionStart - 1] === '{' && selectionStart === selectionEnd) {
            event.preventDefault();
            const newValue = value.slice(0, selectionStart) + '{  }}' + value.slice(selectionEnd);
            textarea.value = newValue;
            textarea.setSelectionRange(selectionStart + 2, selectionStart + 2); // Place cursor between the brackets
            writer.content.value = newValue; // Update the writer content
        }
    }
}
</script>
<template>
    <LayoutSection :title="name">
        <div class="flex flex-col gap-2">
            <div class="flex w-full justify-between items-center gap-2">
                <div class="flex">
                    <UBadge :label="writer.inSync.value ? 'Ajour' : 'Unsaved changes'" color="gray" class="text-nowrap"/>
                </div>
                <div class="flex gap-2 overflow-x-auto custom-scrollbar">
                    <UBadge v-for="variable in variables" :label="variable" color="gray" variant="soft" class="font-mono text-nowrap" />
                </div>
                
            </div>
            <UTextarea 
                class="font-mono text-xl"
                autoresize
                v-model="writer.content.value" 
                @keydown="handleKeydown" 
                placeholder="Enter your prompt here..."
            />
        </div>
    </LayoutSection>
</template>
<style scoped>
.custom-scrollbar {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.custom-scrollbar::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
}
</style>