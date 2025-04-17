<template>
    <div v-if="props.variant === 'tender'" :class="cn('ta-flex ta-w-full ta-min-h-[60vh] ta-items-center ta-justify-center', props.className)">
        <img 
            :src="tenderIcon as unknown as string"
            alt="loading---"
            :class="cn('ta-transition-opacity ta-duration-2000 ta-animate-[shimmer_1.5s_infinite] ta-w-[100px]', props.className)"
        />
    </div>
    <div v-else :class="cn('ta-flex ta-w-full ta-items-center ta-justify-center', props.className)">
        <Loader class="ta-animate-spin" :size="props.size" />
    </div>
</template>

<script setup lang="ts">
import { Loader } from 'lucide-vue-next'; // Ensure this is the correct import for the Loader
import { cn } from '../lib/utils'; // Assuming `cn` is a utility function for conditional class names
import tenderIcon from '@/assets/icons/tender.svg'; // Correct path to tender icon, import as URL

// Define the props interface first
interface Props {
    size?: number;
    className?: string;
    variant?: 'default' | 'tender';
}

// Use `withDefaults` to set default values
const props = withDefaults(defineProps<Props>(), {
    size: 16,
    variant: 'default',
    // className doesn't have a default here, assuming it's always provided or handled
});

</script>

<style scoped>
/* Scoped styles can go here if needed */
</style>
