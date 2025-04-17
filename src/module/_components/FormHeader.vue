<template>
    <div class="ta-relative tx-flex ta-flex-col ta-px-6 ta-pb-1 ta-pt-4 ta-bg-[#FAFAFA] ta-border-b-2 ta-border-[#EAECF0] ta-rounded-t-2xl ta-w-full">
        <div class="ta-flex ta-relative ta-w-full ta-flex-row">
            <div class="ta-w-3/4 ta-flex ta-flex-col">
                <h3 class="ta-text-lg ta-font-bold">{{ title }}</h3>
                <p>{{ description }}</p>
            </div>
            <span v-if="icon" class="ta-flex ta-w-1/4 ta-top-0 ta-h-fit ta-justify-end">
                <img :src="icon" class="ta-w-[100px] ta-h-[100px]" />
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    description: string;
    icon?: string;
}>();
</script> 