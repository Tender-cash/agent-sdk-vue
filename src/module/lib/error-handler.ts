/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import { errorToast } from './toast';

export let globalErrorHandler = (error: any) => {
    const message = error?.response?.data?.message || error?.message || 'An error occurred';
    errorToast(message);
};

const setGlobalErrorHandler = (handler: (errorMessage: string) => void) => {
  globalErrorHandler = handler;
};

const triggerGlobalError = (message: string) => {
  const errorMessage = message || "Sorry, An error occurred. Please try again.";
  globalErrorHandler(errorMessage);
};

export { setGlobalErrorHandler, triggerGlobalError };
