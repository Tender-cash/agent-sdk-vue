<template>
  <div class="ta-mx-auto ta-flex ta-w-full ta-flex-col ta-gap-6 ta-bg-white ta-rounded-2xl ta-border ta-gap-4 sm:!ta-w-[600px] ta-text-black">
    <TenderSpinner v-if="!isLoading" variant="tender" />
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { provideToast } from "vue-toastification";
import { TenderSpinner } from '../_components';
import type { ConfigContextType } from '../types';
import { useConfigProvider } from './index';
import { getAxiosInstance } from '../lib/axios-instance';
// Define interface first
interface Props {
  config: ConfigContextType;
}
const props = defineProps<Props>();

// Define the default interval if not provided
const DEFAULT_CONFIRM_INTERVAL = 15000; 

// Call useConfigProvider correctly to provide the context
useConfigProvider({
    ...props.config, 
    client: getAxiosInstance(), 
    CONFIRM_INTERVAL: props.config.confirmationInterval || DEFAULT_CONFIRM_INTERVAL // Use provided or default
});

const isLoading = ref(false);

provideToast({ timeout: 3000 });

setTimeout(() => (isLoading.value = true), 3000);
</script> 