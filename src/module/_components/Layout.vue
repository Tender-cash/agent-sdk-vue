<template>
    <div class="ta-flex ta-flex-col ta-w-full ta-rounded-2xl ta-border ta-border-[#EAECF0] ta-overflow-hidden">
        <FormHeader v-if="header" :title="header.title" :description="header.description" :icon="header.icon" />
        <div class="ta-flex-1 ta-p-6">
            <slot />
        </div>
        <FormFooter v-if="footer">
            <slot name="footer" />
        </FormFooter>
    </div>
</template>

<script setup lang="ts">
import { FormHeaderProps } from '../types';
import FormHeader from './FormHeader.vue';
import FormFooter from './FormFooter.vue';

interface Props {
    header?: FormHeaderProps;
    footer?: boolean;
}

withDefaults(defineProps<Props>(), {
    header: undefined,
    footer: false,
});
</script> 