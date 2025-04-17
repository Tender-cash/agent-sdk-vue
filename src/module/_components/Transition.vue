<template>
    <TransitionRoot appear :show="props.show" as="template">
        <TransitionChild
            as="template"
            enter="ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-200"
            leave-from="opacity-100"
            leave-to="opacity-0"
        >
            <div class="pam-fixed pam-inset-0 pam-bg-black pam-bg-opacity-80 pam-backdrop-blur-lg" />
        </TransitionChild>
        <div class="pam-fixed pam-inset-0 pam-overflow-y-auto">
            <div class="pam-flex pam-min-h-full pam-items-center pam-justify-center pam-p-4 pam-text-center">
                <TransitionChild
                    as="template"
                    enter="ease-out"
                    enter-from="opacity-0 scale-95"
                    enter-to="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leave-from="opacity-100 scale-100"
                    leave-to="opacity-0 scale-95"
                >
                    <slot />
                </TransitionChild>
            </div>
        </div>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild } from '@headlessui/vue';

const props = defineProps<{
    show?: boolean;
}>();

</script> 