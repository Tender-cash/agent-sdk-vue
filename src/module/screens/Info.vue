<template>
      <FormHeader
        :title="infoData?.title || 'Information'"
        :description="infoData?.message || 'An Error Occurred'"
        :icon="tenderIcon as unknown as string"
      />
      
      <div class="ta-flex ta-flex-col ta-items-center ta-gap-2 ta-w-full ta-justify-center ta-p-4 ta-border-y-1 ta-min-h-[250px] ta-text-center">
          <X :size="80" class="ta-text-red-500" />
        <p class="ta-text-xl ta-text-secondary">{{ infoData?.message || 'An Error Occurred' }}</p>
      </div>

      <div class="ta-flex ta-gap-2 ta-justify-start ta-items-center ta-bg-[#FAFAFA] ta-text-secondary ta-p-6 ta-w-full">
        <span><Spinner :size="16" /></span>
        <span>You will be redirected shortly</span>
      </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { X } from "lucide-vue-next";
  import { Spinner, FormHeader } from '../_components';
  import tenderIcon from '@/assets/icons/tender.svg';
  import type { InfoDetailsProps } from '../types';
  
  interface Props {
    data?: InfoDetailsProps;
  }
  
  const props = defineProps<Props>();
  
  const infoData = computed(() => props.data);
  
  </script> 
