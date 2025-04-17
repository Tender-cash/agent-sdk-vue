<template>
  <div class="ta-mx-auto ta-flex ta-w-full ta-flex-col ta-gap-6 ta-bg-white ta-rounded-2xl ta-border-2 ta-gap-4 ta-text-black ta-items-start">
    <TenderSpinner v-if="agentSdkState.isPageLoading.value" variant="tender" />
    <template v-else>
      <Form
        v-if="agentSdkState.currentStage.value === PAYMENT_STAGE.FORM"
        :selected-coin-value="agentSdkState.selectedCoin.value"
        :selected-network-value="agentSdkState.selectedNetwork.value"
        @update:selected-coin-value="handleCoinUpdate"
        @update:selected-network-value="handleNetworkUpdate"
        :coins="agentSdkState.coins.value"
        :networks="agentSdkState.chains.value"
        :amount="agentSdkState.amount"
        :fiat-currency="agentSdkState.fiatCurrency"
        :form-disabled="formDisabledComputed"
        :form-loading="agentSdkState.formLoading.value"
        :coin-fetching="agentSdkState.coinFetching.value"
        @submit="agentSdkState.submitForm"
      />
      <Details
        v-else-if="agentSdkState.currentStage.value === PAYMENT_STAGE.DETAILS && agentSdkState.paymentDetails.value && agentSdkState.paymentDetails.value.status"
        :address="String(agentSdkState.paymentDetails.value.address)"
        :amount="Number(agentSdkState.paymentDetails.value.coinAmount)"
        :amount-paid="Number(agentSdkState.paymentDetails.value.amountPaid)"
        :coin="String(agentSdkState.paymentDetails.value.coin)"
        :loading="!!agentSdkState.isFetching.value"
        :balance="Number(agentSdkState.paymentDetails.value.balance)"
        :status="agentSdkState.paymentDetails.value.status"
        :cancel="agentSdkState.cancelPayment"
        :confirm="agentSdkState.confirmPayment"
      />
      <Info
        v-else
        :data="agentSdkState.infoDetails.value"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { PAYMENT_STAGE, Option } from '../types';
import useAgentSdkAction from '../_actions';
import Form from './Form.vue';
import Details from './Details.vue';
import Info from './Info.vue';
import { TenderSpinner } from '../_components';
import Logger from '../lib/logger';
import { watch, computed } from 'vue';

const agentSdkState = useAgentSdkAction();

const handleNetworkUpdate = (selectedOption: Option) => {
    if (selectedOption) {
        agentSdkState.selectedNetwork.value = selectedOption.value;
    }
};

const handleCoinUpdate = (selectedOption: Option) => {
    if (selectedOption) {
        agentSdkState.selectCoin(selectedOption);
    }
};

watch(() => agentSdkState.selectedNetwork.value, (newValue) => {
    Logger.debug('Network changed:', { newValue });
    if (newValue) {
        agentSdkState.selectNetwork(newValue);
    }
}, { immediate: false });

const formDisabledComputed = computed(() => 
    !agentSdkState.selectedNetwork.value || !agentSdkState.selectedCoin.value
);

</script> 