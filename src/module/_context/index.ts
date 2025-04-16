import { ref, provide, inject } from 'vue';
// import type { AxiosInstance } from 'axios';
import defaultTheme from '../../styles/default-theme';
import { setAxiosInstance } from '../lib/axios-instance';
import '../../styles/index.scss';
import { applyTheme } from '../lib/utils';
// import { TenderSpinner } from '../_components';
import type { ConfigContextType, ITheme } from '../types';
// import Logger from '../lib/logger';

declare module 'vue' {
  export interface GlobalComponents {
    ConfigProvider: typeof ConfigProvider;
  }
}

declare module 'axios' {
  export interface AxiosInstance {
    // Add any custom properties or methods here if needed
  }
}

// const DEFAULT_CONFIRM_INTERVAL = 15000;
// const TENDER_DEBUG = true;

const CONFIG_SYMBOL = Symbol('config');

const useConfig = () => {
  const config = inject<ConfigContextType>(CONFIG_SYMBOL);
  if (!config) {
    throw new Error('Config context not found. Please wrap your app with ConfigProvider.');
  }
  console.log('useConfig: config-->', config);
  return config;
};

const useConfigProvider = (config: ConfigContextType) => {
  const configRef = ref(config);

  // Initialize axios instance
  setAxiosInstance(config);
  // provide global context
  provide(CONFIG_SYMBOL, configRef.value);
  // Apply theme
  applyTheme(typeof config.theme === 'object' ? config.theme as ITheme : defaultTheme);

  // Initialize logger
  // if (config.logLevel) {
  //   Logger.setLevel(config.logLevel);
  // }

  // return context value
  return configRef?.value;
};

import ConfigProvider from './ConfigProvider.vue';

export {
    ConfigProvider, 
    useConfig, 
    useConfigProvider,
}; 