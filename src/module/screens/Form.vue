<template>
  <div>
    <FormHeader
      title="Checkout Details"
      description="Complete your purchase by selecting your preferred chain"
      :icon="tenderIcon as unknown as string"
    />
    
    <div class="ta-border-t-1 ta-px-6 ta-my-4">
      <div class="ta-flex ta-flex-row ta-bg-[#FAFAFA] ta-w-full ta-justify-between ta-p-4 ta-border-y-1 ta-border-[#EAECF0]">
        <h3 class="ta-text-base ta-font-bold">Total</h3>
        <p class="ta-text-2xl ta-font-bold">{{ amount }} {{ fiatCurrency.toUpperCase() }}</p>
      </div>
      <div class="ta-flex ta-flex-col ta-p-4 ta-gap-4">
        <div class="ta-flex ta-flex-col ta-gap-2 ta-w-full">
          <label>Network / Chain</label>
          <Select
            :value="selectedNetworkObject" 
            @update:value="$emit('update:selectedNetworkValue', $event)" 
            :options="networks"
            :disabled="formLoading"
            class="sm:ta-w-full"
            :trigger-class="'ta-w-full focus:ta-outline-none'"
            placeholder="Select Network / Chain"
            :loading="formLoading"
          />
        </div>
        <div class="ta-flex ta-flex-col ta-gap-2 ta-w-full">
          <label>Select Currency</label>
          <Select
            :value="selectedCoinObject" 
            @update:value="$emit('update:selectedCoinValue', $event)" 
            :options="coins"
            :disabled="!selectedNetworkValue || formLoading"
            :loading="coinFetching"
            class="sm:ta-w-full"
            :trigger-class="'ta-w-full focus:ta-outline-none'"
            placeholder="Select Currency"
          />
        </div>
      </div>
    </div>

    <div class="ta-flex ta-gap-2 ta-justify-center ta-items-center ta-bg-[#FAFAFA] ta-p-6">
      <Button
        class="ta-block ta-p-2 ta-bg-black ta-text-white ta-rounded-lg ta-min-w-[280px]"
        type="button"
        variant="primary"
        :disabled="formLoading || formDisabled"
        @click="formLoading ? null : submitForm()"
      >
        <template v-if="formLoading">
          <Spinner :size="16" />
        </template>
        <template v-else>
          Continue
        </template>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Select, Button, Spinner, FormHeader } from '../_components';
import tenderIcon from '../_assets/icons/tender.svg';
import type { Option } from '../types';
import { computed } from 'vue';

interface Props {
  amount: number;
  fiatCurrency: string;
  networks: Option[];
  coins: Option[];
  selectedNetworkValue: string | null;
  selectedCoinValue: string | null;
  formDisabled: boolean;
  formLoading: boolean;
  coinFetching: boolean;
}
const props = defineProps<Props>();

interface Emits {
  (e: 'update:selectedNetworkValue', value: Option): void;
  (e: 'update:selectedCoinValue', value: Option): void;
  (e: 'submit'): void;
}
const emit = defineEmits<Emits>();

const selectedNetworkObject = computed(() => 
  props.networks.find(opt => opt.value === props.selectedNetworkValue) || null
);

const selectedCoinObject = computed(() => 
  props.coins.find(opt => opt.value === props.selectedCoinValue) || null
);

const submitForm = () => {
  emit('submit');
};

</script> 