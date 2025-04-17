/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import { ref, onMounted } from "vue";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import { Option, PAYMENT_STAGE, PaymentChainResponse, PaymentCoin, /*PAYMENT_STATUS*/ } from "../types";
import { useConfig } from "../_context";
import { URL_PATHS } from "../lib/utils";
import { APIResponse } from "../types";
import usePaymentDetails from "./details";

const useAgentSdkAction = () => {
  const configRef = useConfig();
  const currentStage = ref<PAYMENT_STAGE>(PAYMENT_STAGE.FORM);
  const isPageLoading = ref(true);
  const chains = ref<Option[]>([]);
  const coins = ref<Option[]>([]);
  const selectedCoin = ref<string | null>(null);
  const selectedNetwork = ref<string | null>(null);
  const formLoading = ref(false);
  const coinFetching = ref(false);
  const { amount, client, fiatCurrency, /*onEventResponse*/ } = configRef;
  
  const paymentDetailsState = usePaymentDetails({
    nextScreen: (stage: PAYMENT_STAGE) => {
      currentStage.value = stage;
    },
    setPageLoading: (loading: boolean) => {
      isPageLoading.value = loading;
    }
  });

  const { 
      paymentDetails, 
      isFetching: detailsLoading, 
      initiatePayment, 
      confirmPayment,
      cancelPayment,
      infoDetails
  } = paymentDetailsState;

  const fetchChains = async () => {
    isPageLoading.value = true;
    const response = await client?.get(URL_PATHS.CHAINS) as APIResponse<PaymentChainResponse>;
    if (response?.data?.data) {
      const chainList = response.data.data.data;
      chains.value = chainList.map(c=>({
        label: c.name,
        value: c.id,
        icon: c.icon,
      }));
      isPageLoading.value = false;
    }
  };

  const fetchCoins = async (chain: string) => {
    coinFetching.value = true;
    const response = await client?.get(`${URL_PATHS.CHAINS}/${chain}/currency`) as APIResponse<PaymentCoin[]>;
    if (response?.data?.data) {
      const coinsList = response.data.data;
      coins.value = coinsList.map(c=>({ label: c.name, value: c.id, icon: c.icon }));
    }
    coinFetching.value = false;
  };

  const selectCoin = (coin: Option) => {
    selectedCoin.value = coin.value;
    formLoading.value = false;
  };

  const submitForm = async () => {
    formLoading.value = true;
    isPageLoading.value = true;
    const paymentData = {
      amount,
      fiatCurrency: fiatCurrency.toLowerCase(),
      chain: selectedNetwork.value as string,
      coin: selectedCoin.value as string,
    }
    return await initiatePayment(paymentData);
  };

  onMounted(() => {
    fetchChains();
  });

  // Return plain object with correctly sourced refs and methods
  return {
    currentStage,
    isPageLoading,
    chains,
    coins,
    isFetching:detailsLoading,
    formLoading,
    coinFetching,
    selectedCoin,
    selectedNetwork,
    fiatCurrency,
    amount,
    paymentDetails,
    confirmPayment,
    cancelPayment,
    fetchChains,
    fetchCoins,
    selectCoin,
    selectNetwork: fetchCoins,
    submitForm,
    infoDetails,
  };
};

export default useAgentSdkAction;
