/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import { ref } from "vue";
import { AxiosResponse } from "axios";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import { IPaymentData, PaymentStatusProps, newPaymentResponse, PAYMENT_STAGE, PAYMENT_STATUS, InfoDetailsProps } from "../types";
import { useConfig } from "../_context";
import { URL_PATHS } from "../lib/utils";
import { APIResponse } from "../types";
import ApiRequestQueue from "../lib/queue";
import Logger from "../lib/logger";

const confirmPaymentQueue = new ApiRequestQueue();

const usePaymentDetails = ({ nextScreen, setPageLoading }: { nextScreen:(stage:PAYMENT_STAGE)=>void, setPageLoading:(c:boolean)=>void }) => {
  const { client, CONFIRM_INTERVAL, onEventResponse } = useConfig();
  const paymentDetails = ref<IPaymentData | undefined>(undefined);
  const infoDetails = ref<InfoDetailsProps | undefined>(undefined);
  const isFetching = ref(false);
  let interval:NodeJS.Timeout;

  const initiatePayment = async ({
    amount, chain, coin, fiatCurrency
  }:{
    amount: number, chain: string, coin: string, fiatCurrency:string,
  }) => {
    isFetching.value = true;
    setPageLoading(true);
    const response = await client?.post(`${URL_PATHS.PAYMENT_INITIATE}/${fiatCurrency}`, {
      amount: String(amount),
      chain,
      currency: coin
    }) as APIResponse<newPaymentResponse>;
    if (response?.data?.data){
      const res = response.data.data;
      const paymentResponse = {
        id: res.txId,
        address: res.walletAddress,
        chain: res.chain,
        coin: coin,
        coinAmount: Number(res.coinAmount),
        amount: Number(res.usdAmount),
        amountPaid: "0",
        status: "pending",
      } as IPaymentData;
      paymentDetails.value = paymentResponse;
      isFetching.value = false;
      setPageLoading(false);
      nextScreen(PAYMENT_STAGE.DETAILS);
      RetryConfirmPay(res.txId);
    } 
  }

  const RecordConfirmedTx = (response:AxiosResponse) => {
    Logger.debug("API Confirm-Response", {response});
    const payResponse = response as APIResponse<newPaymentResponse>;
    if (payResponse?.data?.data){
      const paymentResponse: IPaymentData = {
        status: payResponse.data.data.status as PaymentStatusProps,
        amountPaid: payResponse.data.data.amountReceived,
        balance: payResponse.data.data.balanceRequired,
        excess: (parseFloat(payResponse.data.data.amountReceived || "0") - parseFloat(payResponse.data.data?.amount || "0")).toFixed(4),
        coin: payResponse.data.data.currency?.name
      }
      paymentDetails.value = {...paymentDetails.value, ...paymentResponse} as IPaymentData;
      onEventResponse && onEventResponse({ status: payResponse.data.data.status as PaymentStatusProps, message: payResponse.data.message, data: paymentDetails.value });
      if ([PAYMENT_STATUS.OVER, PAYMENT_STATUS.COMPLETE].includes(payResponse.data.data.status as any) && interval){
        confirmPaymentQueue.clearQueue();
        clearInterval(interval);
      }
    }
  }

  const CallConfirmPayment = async (id:string, isBackground?: boolean) => {
    Logger.debug("confirming...");
    const addedHeaders = isBackground ? { "hide-notify": "true"} : undefined;
    try {
        const response = await confirmPaymentQueue.addToQueue({
            url: `${URL_PATHS.PAYMENT_VALIDATE}/${id}`,
            method: "POST",
          },{
            ...addedHeaders
          }, 1);
        RecordConfirmedTx(response);
    } catch (error) {
        Logger.error("no payment yet..", { error });
    } finally {
        isFetching.value = false; 
    }
  }

  const RetryConfirmPay = (id: string) => {
    interval = setInterval(()=>CallConfirmPayment(id, true), CONFIRM_INTERVAL)
  };

  const triggerPaymentConfirm = (isCancelled?:boolean) => {
    if (isCancelled) {
        // Handle cancellation logic (clear queue, maybe call cancel API if exists)
        Logger.debug("canceling-payment....");
        confirmPaymentQueue.clearQueue();
        if (interval) clearInterval(interval); // Stop polling
        onEventResponse && onEventResponse({ status: "error", message: "user cancelled transaction", data: paymentDetails.value });
        infoDetails.value = { title: "User cancelled transaction", message: "user cancelled transaction" };
        return nextScreen(PAYMENT_STAGE.INFO); // Don't proceed to CallConfirmPayment
    }

    if (paymentDetails.value?.id) {
        isFetching.value = true; // Set loading true only when making the foreground call
        CallConfirmPayment(paymentDetails.value.id, false);
    } else {
        Logger.warn("triggerPaymentConfirm called without paymentDetails.id");
    }
  };

  return {
    paymentDetails,
    isFetching, // This is the loading state for the Details screen actions
    infoDetails,
    initiatePayment,
    confirmPayment: ()=>triggerPaymentConfirm(false),
    cancelPayment: ()=>triggerPaymentConfirm(true),
  };
};

export default usePaymentDetails;
