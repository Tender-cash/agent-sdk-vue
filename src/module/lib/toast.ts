import { useToast, POSITION } from 'vue-toastification';
import { CheckCircle, CircleAlert } from 'lucide-vue-next';

const toast = useToast();

const toastOptions = {
    position: POSITION.TOP_RIGHT,
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: false,
    icon: false,
    rtl: false,
};

export const successToast = (message: string) => {
    toast.success(message, {
        ...toastOptions,
        icon: CheckCircle,
    });
};

export const errorToast = (message: string) => {
    toast.error(message, {
        ...toastOptions,
        icon: CircleAlert,
    });
};

export const infoToast = (message: string) => {
    toast.info(message, {
        ...toastOptions,
        icon: CircleAlert,
    });
}; 