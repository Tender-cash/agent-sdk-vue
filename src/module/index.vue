<template>
  <ConfigProvider
    :config="{
      accessId: props.accessId  ,
      accessSecret: props.accessSecret,
      amount: props.amount,
      fiatCurrency: props.fiatCurrency,
      env: props.env,
      onEventResponse: props.onEventResponse
    }"
  >
    <TenderWidget />
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from "./_context";
import TenderWidget from "./screens/Index.vue";
import type { TenderAgentProps } from "./types";

const props = defineProps<TenderAgentProps>();

</script> 