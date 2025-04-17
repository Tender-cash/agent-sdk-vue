# @tender-cash/agent-sdk-vue

[![npm version](https://badge.fury.io/js/%40tender-cash%2Fagent-sdk-vue.svg)](https://badge.fury.io/js/%40tender-cash%2Fagent-sdk-vue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Vue 3 component library for integrating the Tender Cash Agent payment flow into your application.

## Installation

```bash
yarn add @tender-cash/agent-sdk-vue
# or
npm install @tender-cash/agent-sdk-vue
```

## Usage

### 1. Import CSS

The SDK requires its base styles. Import the CSS file in your main application entry point (e.g., `main.ts` or `main.js`):

```typescript
// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'

// Import SDK styles
import "@tender-cash/agent-sdk-vue/dist/style.css"; 

createApp(App).mount('#app')
```

### 2. Use the Component

Import the `TenderAgentSdk` component and the relevant types into your Vue component.

```vue
<template>
  <div>
    <h1>Checkout</h1>

    <!-- Conditionally render SDK or trigger button -->
    <button 
      v-if="!showSdk" 
      @click="showSdk = true" 
      :disabled="!isValidConfig"
      class="pay-button"
    >
      Proceed to Pay ${{ amount }} {{ fiatCurrency }}
    </button>

    <div v-if="showSdk" class="sdk-wrapper">
      <TenderAgentSdk
        :access-id="accessId"
        :access-secret="accessSecret"
        :amount="amount"
        :fiat-currency="fiatCurrency"
        :env="env" 
        :on-event-response="handleSdkEvent"
      />
    </div>

      {sdkResponse && (
        <div>
          <h3>Payment Result:</h3>
          <p>Status: {sdkResponse.status}</p>
          <p>Message: {sdkResponse.message}</p>
          {sdkResponse.data && <pre>{JSON.stringify(sdkResponse.data, null, 2)}</pre>}
        </div>
      )}
    </div>
  );
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>

<script setup>
import { ref } from 'vue'

const showSdk = ref(false)
const sdkResponse = ref(null)

// Event handler function using the imported type
function handleSdkEvent(response: onFinishResponse) {
  console.log('Tender SDK Event:', response)
  sdkResponse.value = response

  // Handle different event types based on response.status (assuming status field exists)
  switch (response.status) { // Using status instead of type
    case 'closed': // NOTE: Replace 'closed' with the actual status string for user closing the SDK
      console.log('SDK Closed by user.')
      showSdk.value = false // Hide SDK on close
      break
    case 'error': // NOTE: Verify actual status string for errors
      console.error('SDK Error:', response.error?.message || response.message || 'Unknown Error') // Check for error details in response.error or response.message
      alert(`Payment Error: ${response.error?.message || response.message || 'Unknown error'}`)
      showSdk.value = false // Hide SDK on error
      break
    case 'completed': // NOTE: Verify actual status string for success
      console.log('SDK Success:', response.data)
      alert(`Payment Successful! Data: ${JSON.stringify(response.data)}`)
      showSdk.value = false // Hide SDK on success
      break
    // TODO: Add cases for other relevant statuses like 'pending', 'partial-payment', etc.
    default:
      console.log('Received SDK status:', response.status)
  }
}
</script>

*   Remember to replace placeholder credentials (`YOUR_ACCESS_ID`, `YOUR_ACCESS_SECRET`) with your actual keys.
*   Set the `env` variable to `'production'` when deploying to a live environment.

## Component Props

| Prop             | Type                                        | Required | Description                                                                 |
|------------------|---------------------------------------------|----------|-----------------------------------------------------------------------------|
| `amount`         | `number`                                    | Yes      | The amount to be charged in the specified fiat currency.                    |
| `fiatCurrency`   | `string`                                    | Yes      | The fiat currency code (e.g., "USD", "EUR").                               |
| `accessId`       | `string`                                    | Yes      | Your Tender Cash merchant Access ID.                                        |
| `accessSecret`   | `string`                                    | Yes      | Your Tender Cash merchant Access Secret.                                    |
| `env`            | `"test"` \| `"live"`                        | Yes      | The environment to use (`"test"` for testing, `"live"` for production).     |
| `onEventResponse`| `(data: onFinishResponse) => void`          | No       | Optional callback function triggered on payment completion or status change. |

## Callback Data (`onFinishResponse`)

The `onEventResponse` callback receives an object with the following structure:

```typescript
interface onFinishResponse {
  status: "partial-payment" | "completed" | "overpayment" | "pending" | "error";
  message: string;
  data: IPaymentData | undefined; // Contains details like amountPaid, coin, address, etc.
}

interface IPaymentData {
  id?: string;
  amount?: number;
  coinAmount?: number;
  coin?: string;
  chain?: string;
  address?: string;
  amountPaid?: string;
  balance?: string;
  status?: "partial-payment" | "completed" | "overpayment" | "pending" | "error";
}
```

## License

[MIT](./LICENSE) 
