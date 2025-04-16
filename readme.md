# @tender-cash/agent-sdk-vue

Vue SDK for Tender Cash Agent. Provides a component to easily integrate the Tender Cash payment flow into your Vue 3 application.

## Installation

You can install the package using yarn or npm:

```bash
yarn add @tender-cash/agent-sdk-vue
# or
npm install @tender-cash/agent-sdk-vue
```

## Usage

Import the `TenderAgentSdk` component and use it in your template. Pass the required configuration options as props.

```vue
<template>
  <div>
    <h1>Checkout Page</h1>
    <TenderAgentSdk
      :accessId="config.accessId"
      :accessSecret="config.accessSecret"
      :amount="config.amount"
      :fiatCurrency="config.fiatCurrency"
      :env="config.env"
      :onEventResponse="config.onEventResponse"
      :theme="config.theme"
    />
    <p>Other content on your page...</p>
  </div>
</template>

<script setup lang="ts">
import TenderAgentSdk from '@tender-cash/agent-sdk-vue'; // Default import
import type { TenderEnvironments, onFinishResponse, IPaymentData } from '@tender-cash/agent-sdk-vue';

// Define your SDK configuration
const config = {
  accessId: 'YOUR_ACCESS_ID',         // Replace with your actual Access ID
  accessSecret: 'YOUR_ACCESS_SECRET',   // Replace with your actual Access Secret
  amount: 150.75,                     // The amount to charge
  fiatCurrency: 'USD',                // The fiat currency code (e.g., 'USD', 'NGN', 'EUR')
  env: 'test' as TenderEnvironments,      // Environment: 'test' or 'live'
  theme: 'light',                     // Optional: 'light' or 'dark' (defaults to light)
  onEventResponse: (data: onFinishResponse) => { // Optional: Callback for payment status updates
    // data = { status: 'completed' | 'partial-payment' | 'overpayment' | 'pending' | 'error', message: string, data?: IPaymentData }
    if (data.status === 'completed') {
      // Handle successful payment completion
      console.log('Payment completed!', data.data);
    }
     if (data.status === 'error') {
      // Handle error
      console.error('Payment error:', data.message);
    }
  },
};

</script>

<style>
/* The SDK includes necessary base styles. */
</style>
```

*   Replace `'YOUR_ACCESS_ID'` and `'YOUR_ACCESS_SECRET'` with your actual Tender Cash credentials.
*   Set `env` to `'live'` for production environments.
*   The `onEventResponse` callback will notify you of payment progress and completion.

## Configuration Props

*   `accessId: string` (Required)
*   `accessSecret: string` (Required)
*   `amount: number` (Required) - Amount in fiat currency.
*   `fiatCurrency: string` (Required) - e.g., 'USD', 'NGN'.
*   `env: TenderEnvironments` (Required) - `'test'` or `'live'`.
*   `onEventResponse?: (data: onFinishResponse) => void` (Optional) - Callback for status updates.
*   `theme?: 'light' | 'dark'` (Optional) - Defaults to 'light'.
*   `confirmationInterval?: number` (Optional) - Payment confirmation check interval in milliseconds (default: 5000 - *Note: Check if this is passed as a prop or internally configured*).

## License

MIT
