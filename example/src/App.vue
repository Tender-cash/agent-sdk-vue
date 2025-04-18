<template>
  <div class="app-container">
    <div v-if="!showModal">
      <h1 class="app-title">Tender Agent SDK Example</h1>

      <div class="input-grid">
        <label for="accessId">Access ID:</label>
        <input id="accessId" v-model="accessId" type="text" placeholder="Enter Access ID">

        <label for="accessSecret">Access Secret:</label>
        <input id="accessSecret" v-model="accessSecret" type="password" placeholder="Enter Access Secret">

        <label for="amount">Amount:</label>
        <input id="amount" v-model="amount" type="number" placeholder="Enter Amount">

        <label for="fiatCurrency">Fiat Currency:</label>
        <input id="fiatCurrency" v-model="fiatCurrency" type="text" placeholder="e.g., USD">
      </div>
      <!-- Button to trigger the SDK -->
      <button 
        @click="handleModalClick"
        :disabled="!(accessId && accessSecret && amount > 0 && fiatCurrency)"
        class="trigger-button"
      >
        Initiate Transaction
      </button>
    </div>
    <!-- Conditionally render the SDK component based on showModal and props -->
    <div v-if="showModal" class="sdk-container">
      <TenderAgentSdk 
        :access-id="accessId"
        :access-secret="accessSecret"
        :amount="amount"
        :fiat-currency="fiatCurrency"
        :env="'test'" 
        :on-event-response="onEventResponse"
      />
    </div>

    <hr class="separator">

    <div v-if="sdkResponse" class="response-area">
      <strong>Last SDK Event:</strong>
      <pre>{{ JSON.stringify(sdkResponse, null, 2) }}</pre>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TenderAgentSdk, type onFinishResponse } from '@tender-cash/agent-sdk-vue'

const showModal = ref(false)
const accessId = ref('')
const accessSecret = ref('')
const amount = ref(0)
const fiatCurrency = ref('USD')

const sdkResponse = ref<onFinishResponse | null>(null)

function handleModalClick() {
  if (accessId.value && accessSecret.value && amount.value > 0 && fiatCurrency.value) {
    showModal.value = true
  } else {
    alert('Please fill in all fields above to enable the button.')
  }
}

function onEventResponse(response: onFinishResponse) {
  sdkResponse.value = response

  if (response.type === 'TENDER_CLOSE') {
    showModal.value = false // Hide on close
  } else if (response.type === 'TENDER_ERROR') {
    alert(`SDK Error: ${response.error?.message || 'Unknown error'}`)
    showModal.value = false // Hide on error
  } else if (response.type === 'TENDER_SUCCESS') {
    alert(`Transaction Successful! Data: ${JSON.stringify(response.data)}`)
    showModal.value = false // Hide on success
  }
}

</script>

<style scoped>
.app-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: sans-serif;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #1a1a1a;
  justify-content: center;
}

.input-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
}

label {
  font-weight: bold;
  text-align: right;
}

input[type="text"],
input[type="password"],
input[type="number"],
select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.separator {
  margin: 1.5rem 0;
  border: none;
  border-top: 1px solid #eee;
}

.sdk-container {
  /* Add any specific styling for the SDK component container if needed */
  padding: 1rem;
  border-radius: 4px;
  min-height: 100px; /* Example minimum height */
  display: flex;
  align-items: center;
  justify-content: center;
}

.sdk-placeholder {
  /* padding: 1rem; */
  border: 1px dashed #ccc;
  border-radius: 4px;
  color: #666;
  text-align: center;
  margin-top: 1.5rem; /* Ensure consistent spacing */
}

.response-area {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #1a1a1a;
  border-radius: 4px;
  border: 1px dashed #42b983;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  background-color: #1a1a1a;
  color: #fff;
  padding: 0.5rem;
  border-radius: 4px;
  margin-top: 0.5rem;
}

h1 {
  color: #42b983; /* Vue green */
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
}

p {
  text-align: center;
  font-style: italic;
  margin-bottom: 1.5rem;
  color: #555;
}

.trigger-button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem; /* Add some space above the button */
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
  background-color: #42b983; /* Vue green */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.trigger-button:hover:not(:disabled) {
  background-color: #36a476;
}

.trigger-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style> 