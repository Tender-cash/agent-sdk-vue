<template>
    <div v-if="variant === 'default'" :class="cn('ta-flex ta-w-full ta-items-center ta-justify-center', className)">
        <Loader class="ta-animate-spin" :size="size" />
    </div>
    <div v-else :class="cn('ta-flex ta-w-full ta-min-h-[60vh] ta-items-center ta-justify-center', className)">
        <img 
            :src="tenderIcon as unknown as string"
            alt="loading---"
            class="ta-transition-opacity ta-duration-2000 ta-animate-[shimmer_1.5s_infinite] ta-w-[100px]"
        />
    </div>
</template>

<script setup lang="ts">
import { Loader } from 'lucide-vue-next'; // Ensure this is the correct import for the Loader
import { cn } from '../lib/utils'; // Assuming `cn` is a utility function for conditional class names
import tenderIcon from '../_assets/icons/tender.svg'; // Correct path to tender icon, import as URL

// Use the `defineProps` to bind the Props interface
defineProps<{
    size?: number,
    className?: string,
    variant?: 'default' | 'tender', // Ensure variant is either 'default' or 'tender'
}>();

</script>

<style scoped>
/* Scoped styles can go here if needed */
</style>