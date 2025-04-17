<template>
    <br />
</template>

<script setup lang="ts">
import { createToastInterface, POSITION } from 'vue-toastification';
import { CheckCircle, CircleAlert } from 'lucide-vue-next';
import 'vue-toastification/dist/index.css';

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

// Create the interface
const toast = createToastInterface(toastOptions);


const successToast = (message: string) => {
    toast.success(message, {
        ...toastOptions,
        icon: CheckCircle,
    });
};

const errorToast = (message: string) => {
    toast.error(message, {
        ...toastOptions,
        icon: CircleAlert,
    });
};

const infoToast = (message: string) => {
    toast.info(message, {
        ...toastOptions,
        icon: CircleAlert,
    });
};

defineExpose({
    success: successToast,
    error: errorToast,
    info: infoToast,
});
</script>

<style>
.v-toast__item {
    pointer-events: auto;
    display: flex;
    width: 100%;
    max-width: 28rem;
    border-radius: 0.5rem;
    background-color: white;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.v-toast__item--success {
    background-color: rgb(220 252 231);
    border: 1px solid rgb(22 163 74);
}

.v-toast__item--error {
    background-color: rgb(254 226 226);
    border: 1px solid rgb(185 28 28);
}

.v-toast__item--info {
    background-color: rgb(219 234 254);
    border: 1px solid rgb(29 78 216);
}

.v-toast__item--success .v-toast__text {
    color: rgb(21 128 61);
}

.v-toast__item--error .v-toast__text {
    color: rgb(185 28 28);
}

.v-toast__item--info .v-toast__text {
    color: rgb(29 78 216);
}

.v-toast__icon {
    flex-shrink: 0;
}

.v-toast__icon svg {
    height: 1.5rem;
    width: 1.5rem;
}

.v-toast__item--success .v-toast__icon svg {
    color: rgb(22 163 74);
}

.v-toast__item--error .v-toast__icon svg {
    color: rgb(185 28 28);
}

.v-toast__item--info .v-toast__icon svg {
    color: rgb(29 78 216);
}
</style> 