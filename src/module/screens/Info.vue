<template>
    <div>
      <FormHeader
        title="Information"
        description="An Error Occurred"
        :icon="tenderIcon as unknown as string"
      />
      
      <div class="ta-border-t-1 ta-px-6 ta-my-4">
        <div class="ta-flex ta-flex-col ta-items-center ta-gap-2 ta-bg-[#FAFAFA] ta-w-full ta-justify-between ta-p-4 ta-border-y-1 ta-border-[#EAECF0]">
           <X class="ta-w-[80px] ta-h-[80px] ta-text-red-500" />
          <p class="ta-text-xl ta-font-bold">{{ infoData?.message || 'An Error Occurred' }}</p>
        </div>
      </div>
  
      <div class="ta-flex ta-gap-2 ta-justify-center ta-items-center ta-bg-[#FAFAFA] ta-p-6">
        You will be redirected shortly
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { FormHeader } from '../_components';
  import tenderIcon from '../_assets/icons/tender.svg';
  import { X } from "lucide-vue-next";
  import type { InfoDetailsProps } from '../types';
  import { computed } from 'vue';
  
  interface Props {
    data?: InfoDetailsProps;
  }
  
  const props = defineProps<Props>();
  
  const infoData = computed(() => props.data);
  
  </script> 