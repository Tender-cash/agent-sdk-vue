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
        :env="'sandbox'" 
        :on-event-response="handleSdkEvent"
      />
    </div>

    <div v-if="sdkResponse" class="response-output">
      <strong>Last SDK Event:</strong>
      <pre>{{ JSON.stringify(sdkResponse, null, 2) }}</pre>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { TenderAgentSdk, type onFinishResponse } from '@tender-cash/agent-sdk-vue'

const showSdk = ref(false)

// --- SDK Configuration --- 
// Use refs for dynamic values or direct strings/numbers for static ones
const accessId = ref('YOUR_ACCESS_ID')         // Replace with your actual Access ID
const accessSecret = ref('YOUR_ACCESS_SECRET')   // Replace with your actual Access Secret
const amount = ref(150.75)                    // The amount to charge
const fiatCurrency = ref('USD')               // The fiat currency code (e.g., 'USD', 'NGN')
// const env = ref<'sandbox' | 'production'>('sandbox') // Or pass directly as prop
// ------------------------

const sdkResponse = ref<onFinishResponse | null>(null)

// Example validation check
const isValidConfig = computed(() => {
  return !!(accessId.value && accessSecret.value && amount.value > 0 && fiatCurrency.value)
})

// Event handler function
function handleSdkEvent(response: onFinishResponse) {
  console.log('Tender SDK Event:', response)
  sdkResponse.value = response

  // Handle different event types
  switch (response.type) {
    case 'TENDER_CLOSE':
      console.log('SDK Closed by user.')
      showSdk.value = false // Hide SDK on close
      break
    case 'TENDER_ERROR':
      console.error('SDK Error:', response.error)
      alert(`Payment Error: ${response.error?.message || 'Unknown error'}`)
      showSdk.value = false // Hide SDK on error
      break
    case 'TENDER_SUCCESS':
      console.log('SDK Success:', response.data)
      alert(`Payment Successful! Data: ${JSON.stringify(response.data)}`)
      showSdk.value = false // Hide SDK on success
      break
    // Handle other potential event types if documented by the SDK
  }
}
</script>

<style scoped>
/* Add your component styles */
.sdk-wrapper {
  margin-top: 20px;
  border: 1px dashed #ccc;
  padding: 10px;
  min-height: 400px; /* Adjust as needed */
  display: flex;
  align-items: center;
  justify-content: center;
}

.pay-button {
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
}

.pay-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.response-output {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
```

*   Remember to replace placeholder credentials (`YOUR_ACCESS_ID`, `YOUR_ACCESS_SECRET`) with your actual keys.
*   Set `env` to `'production'` when deploying to a live environment.

## Component Props

| Prop             | Type                                       | Required | Description                                                                 |
|------------------|--------------------------------------------|----------|-----------------------------------------------------------------------------|
| `accessId`       | `string`                                   | Yes      | Your Tender Cash Access ID.                                                   |
| `accessSecret`   | `string`                                   | Yes      | Your Tender Cash Access Secret.                                               |
| `amount`         | `number`                                   | Yes      | The transaction amount in the specified fiat currency.                        |
| `fiatCurrency`   | `string`                                   | Yes      | The three-letter ISO currency code (e.g., `USD`, `NGN`).                       |
| `env`            | `'sandbox' \| 'production'`               | Yes      | The environment to use (`sandbox` for testing, `production` for live).        |
| `onEventResponse`| `(response: onFinishResponse) => void`   | Yes      | Callback function triggered on SDK events (close, success, error, etc.).      |
| `theme`          | `'light' \| 'dark'`                      | No       | Visual theme for the SDK components. Defaults to `'light'`.                  |

## Events (`onEventResponse`)

The `onEventResponse` callback receives a single argument, an object with the following structure (based on the `onFinishResponse` type):

```typescript
interface onFinishResponse {
  type: 'TENDER_CLOSE' | 'TENDER_ERROR' | 'TENDER_SUCCESS' | string; // Known types and potentially others
  error?: { message: string; [key: string]: any }; // Present if type is TENDER_ERROR
  data?: any; // Present if type is TENDER_SUCCESS (structure depends on SDK)
}
```

*   **`type`**: A string indicating the event type. Common types include:
    *   `'TENDER_CLOSE'`: The user closed the SDK interface.
    *   `'TENDER_ERROR'`: An error occurred during the process.
    *   `'TENDER_SUCCESS'`: The payment process completed successfully.
*   **`error`**: An object containing error details if `type` is `'TENDER_ERROR'`.
*   **`data`**: Data related to the successful transaction if `type` is `'TENDER_SUCCESS'`.

You should use the `type` field to determine how to handle the response.

## Example Project

This repository includes a functional example application in the `/example` directory.

To run it:

1.  Clone the repository.
2.  Navigate to the root directory: `cd agent-sdk-vue`
3.  Install root dependencies: `yarn install` (or `npm install`)
4.  Navigate to the example directory: `cd example`
5.  Install example dependencies: `yarn install` (or `npm install`)
6.  Run the development server: `yarn dev` (or `npm run dev`)

Open your browser to the local address provided by Vite.

## Development (Contributing)

1.  Clone the repository.
2.  Install root dependencies: `yarn install`
3.  Make your changes in the `src` directory.
4.  Build the SDK: `yarn build`
5.  Test your changes using the example project (`cd example && yarn dev`).

## License

MIT
