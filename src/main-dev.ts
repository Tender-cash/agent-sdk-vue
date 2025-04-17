import { createApp } from 'vue';

import TenderAgentSdk from './module/index.vue'; // The main UI component
import type { ConfigContextType, TenderEnvironments } from './module/types';

// Import necessary CSS
import './styles/index.scss';

// Define the configuration for the SDK
const sdkConfig: ConfigContextType = {
  accessId: "RlQwBRgwFBAZ7mN8SiDVqkcs8OTlMjRvTKEX2T1AJAsFPuF97Hlu", // Replace with actual ID for testing
  accessSecret: "fXARyx8qPkT49QXB9WyeUZJ1LjA9M9G6r9x0gWS5vUgHP8EMODN4", // Replace with actual Secret for testing
  amount: 100,
  fiatCurrency: 'ngn',
  env: 'test' as TenderEnvironments,
  onEventResponse: (data) => {
    console.log('SDK Event:', data);
  },
  // Add other necessary config properties if defined in ConfigContextType
};

// Create the root demo component
const App = {
  template: `
    <TenderAgentSdk 
      :accessId="sdkConfig.accessId"
      :accessSecret="sdkConfig.accessSecret"
      :amount="sdkConfig.amount"
      :fiatCurrency="sdkConfig.fiatCurrency"
      :env="sdkConfig.env"
      :onEventResponse="sdkConfig.onEventResponse"
      :theme="sdkConfig.theme"
    />
  `,
  components: {
    TenderAgentSdk
  },
  data() {
    return {
      sdkConfig // Make config available to the template
    };
  }
};

createApp(App).mount('#app'); 