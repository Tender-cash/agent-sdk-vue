<template>
    <div
        ref="selectRef"
        class="ta-relative ta-w-full sm:ta-w-fit"
        :class="className"
        tabindex="0"
        @keydown="handleKeyDown"
    >
        <button
            :class="[
                'ta-flex ta-items-center ta-justify-between ta-rounded-lg !ta-border ta-border-black/10 ta-px-3 ta-py-2 ta-text-sm ta-text-black ta-w-full',
                triggerClassName,
                disabled ? 'ta-cursor-not-allowed ta-opacity-50' : 'ta-cursor-pointer',
                isOpen ? '!ta-bg-white' : '!ta-bg-white/10'
            ]"
            @click="toggleDropdown"
            :disabled="disabled"
            type="button"
        >
            <span class="ta-flex ta-flex-row ta-gap-2">
                <img v-if="value?.icon" :src="value.icon" class="ta-w-[20px] ta-h-[20px]" />
                {{ value?.label || placeholder }}
            </span>
            <span class="ta-flex ta-flex-row ta-gap-2">
                <Loader v-if="loading" :size="15" />
                <ChevronDown v-else :size="15" />
            </span>
        </button>

        <ul
            v-if="isOpen"
            :class="[
                'ta-transparent_style ta-absolute ta-z-10 ta-mt-2 ta-h-fit ta-max-h-40 ta-w-full ta-overflow-y-auto ta-overflow-x-hidden ta-rounded-lg ta-border ta-border-black/10 ta-shadow-lg ta-backdrop-blur-lg',
                shouldOpenUp ? 'ta-bottom-full mb-2' : 'ta-top-full ta-mt-2',
                dropdownClassName
            ]"
            role="listbox"
        >
            <li
                v-for="(option, index) in options"
                :key="option.value"
                :class="[
                    'ta-relative ta-flex ta-cursor-pointer ta-items-center ta-rounded ta-p-2 ta-px-4 ta-py-2 ta-text-base ta-outline-none hover:ta-bg-white/20',
                    highlightedIndex === index || option.label === value?.label ? 'ta-bg-white/20' : ''
                ]"
                @click="handleOptionSelect(option)"
                @mouseenter="setHighlightedIndex(index)"
                role="option"
                :aria-selected="value?.value === option.value"
            >
                <span class="ta-flex ta-flex-row ta-gap-2">
                    <img v-if="option?.icon" :src="option.icon" class="ta-w-[20px] ta-h-[20px]" />
                    {{ option?.label }}
                </span>
                <span v-if="option.label === value?.label" class="ta-absolute ta-right-3 ta-flex ta-h-3.5 ta-w-3.5 ta-items-center ta-justify-center">
                    <Check class="h-4 w-4" />
                </span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { Check, ChevronDown, Loader } from 'lucide-vue-next';
import { type Option } from '../types';

const props = withDefaults(defineProps<{
    options: Option[];
    value: Option | null;
    placeholder?: string;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    triggerClassName?: string;
    dropdownClassName?: string;
}>(), {
    placeholder: 'Select an option',
    disabled: false,
    loading: false,
    className: '',
    triggerClassName: '',
    dropdownClassName: '',
    value: null,
});

const emit = defineEmits<{
    (e: 'update:value', value: Option): void;
}>();

const isOpen = ref(false);
const highlightedIndex = ref<number | null>(null);
const shouldOpenUp = ref(false);
const selectRef = ref<HTMLDivElement | null>(null);

const toggleDropdown = () => {
    if (!props.disabled) {
        isOpen.value = !isOpen.value;
    }
};

const closeDropdown = () => {
    isOpen.value = false;
    highlightedIndex.value = null;
};

const handleOptionSelect = (selectedValue: Option) => {
    emit('update:value', selectedValue);
    closeDropdown();
};

const handleKeyDown = (event: KeyboardEvent) => {
    if (!isOpen.value) return;

    if (event.key === 'ArrowDown') {
        event.preventDefault();
        highlightedIndex.value = highlightedIndex.value === null || highlightedIndex.value === props.options.length - 1
            ? 0
            : highlightedIndex.value + 1;
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        highlightedIndex.value = highlightedIndex.value === null || highlightedIndex.value === 0
            ? props.options.length - 1
            : highlightedIndex.value - 1;
    } else if (event.key === 'Enter' && highlightedIndex.value !== null) {
        event.preventDefault();
        const selectedOption = props.options[highlightedIndex.value];
        if (selectedOption) {
            handleOptionSelect(selectedOption);
        }
    } else if (event.key === 'Escape') {
        closeDropdown();
    }
};

const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
        closeDropdown();
    }
};

onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside);
});

const setHighlightedIndex = (index: number) => {
    highlightedIndex.value = index;
};

watch(isOpen, (newValue) => {
    if (newValue && selectRef.value) {
        const rect = selectRef.value.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const dropdownHeight = 200; // Approximate height of the dropdown content
        shouldOpenUp.value = rect.bottom + dropdownHeight > viewportHeight;
    }
});
</script> 