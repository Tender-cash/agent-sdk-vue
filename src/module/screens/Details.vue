<template>
  <RenderPendingDetails
    v-if="props.status === PAYMENT_STATUS.PENDING && props.cancel && props.confirm"
    :address="String(props.address)"
    :amount="Number(props.amount)"
    :amount-paid="Number(props.amountPaid)"
    :coin="String(props.coin)"
    :loading="props.loading"
    :status="props.status"
    :balance="props.balance"
    :cancel="props.cancel"
    :confirm="props.confirm"
  />
  <RenderFinishedDetails
    v-else
    :address="String(props.address)"
    :amount="Number(props.amount)"
    :amount-paid="Number(props.amountPaid)"
    :coin="String(props.coin)"
    :loading="props.loading"
    :status="props.status"
    :balance="props.balance"
  />
</template>

<script setup lang="ts">
import { Copy, QrCode } from 'lucide-vue-next';
import { useClipboard } from '@vueuse/core';
import { Button, Spinner, FormHeader, FormFooter } from '../_components';
import { PAYMENT_STATUS, PAYMENT_RESPONSES, PAYMENT_ICONS, paymentStatusMap, type PaymentStatusProps, type PaymentTypeProps } from '../types';
import { sentenceCase } from '../lib/utils';
import { defineComponent, h, type PropType } from 'vue';

interface Props {
  address: string;
  amount: number;
  amountPaid: number;
  coin: string;
  loading: boolean;
  status: PaymentStatusProps;
  balance: number;
  confirm?: () => void;
  cancel?: () => void;
}
const props = defineProps<Props>();

const { copy } = useClipboard();

const RenderPendingDetails = defineComponent({
  props: {
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    amountPaid: { type: Number, required: true },
    coin: { type: String, required: true },
    loading: { type: Boolean, required: true },
    status: { type: String as PropType<PaymentStatusProps>, required: true },
    balance: { type: Number, required: true },
    cancel: { type: Function, required: true },
    confirm: { type: Function, required: true },
  },
  setup(props) {
    return () => h('div', [
      h(FormHeader, {
        title: "Payment Details",
        description: "Copy and paste payout wallet to complete your purchase."
      }),
      h('div', { class: 'ta-flex ta-flex-col ta-border-t-1 ta-px-6 ta-my-4 ta-gep-2' }, [
        h('div', { class: 'ta-flex ta-flex-col ta-p-4 ta-justify-center ta-items-center' }, [
          h('p', 'YOU\'RE PAYING'),
          h('div', { class: 'ta-flex ta-flex-row ta-gap-2' }, [
            h('span', { class: 'ta-text-[48px] leading-[48px] ta-font-bold' }, props.amount),
            h('span', { class: 'ta-text-xl ta-mt-auto ta-mb-4 ta-text-secondary ta-font-bold' }, props.coin?.toUpperCase())
          ])
        ]),
        h('div', { class: 'ta-flex ta-flex-row ta-bg-[#FAFAFA] ta-w-max-full ta-justify-between ta-p-4 ta-border ta-border-[#E6E6E6] ta-border-dashed ta-rounded-2xl ta-text-wrap ta-gap-4' }, [
          h('div', { class: 'ta-flex ta-flex-row ta-w-1/4' }, [
            h(QrCode, { size: 140 })
          ]),
          h('div', { class: 'ta-flex ta-flex-col ta-text-pretty ta-w-2/4 ta-my-auto' }, [
            h('h3', { class: 'ta-text-base ta-text-secondary' }, 'USDC Deposit Address'),
            h('p', { class: 'ta-text-[13px] ta-underline ta-underline-offset-4 ta-break-all' }, props.address)
          ]),
          h('div', { class: 'ta-flex ta-flex-row ta-w-1/4 ta-my-auto ta-justify-end' }, [
            h(Button, {
              class: '!ta-px-3 !ta-py-1 ta-flex-row !ta-bg-white !ta-border-[#D0D5DD] ta-rounded-2xl',
              variant: 'outline',
              onClick: () => copy(props.address)
            }, [
              h('span', { class: 'ta-flex ta-flex-row ta-text-[14px] ta-text-[#344054] ta-font-medium ta-gap-1 ta-justify-center ta-items-center' }, [
                h(Copy, { size: 18 }),
                h('span', 'Copy')
              ])
            ])
          ])
        ]),
        h('div', { class: 'ta-text-[14px] ta-text-secondary ta-my-4' }, [
          h('p', 'Send only USDC to this deposit address - supports only USDC tokens on movement network. If you send wrong tokens, they\'ll be lost.')
        ])
      ]),
      h(FormFooter, {}, [
        props.loading ? h('div', { class: 'ta-flex ta-flex-row ta-w-full ta-items-center ta-gap-4' }, [
          h('span', [h(Spinner, { size: 16, variant: 'default' })]),
          h('span', { class: 'ta-text-sm ta-text-secondary' }, 'Confirming Payment....')
        ]) : [
          h(Button, {
            class: 'ta-block ta-p-2 ta-bg-transparent !ta-border !ta-border-secondary !ta-text-black/40 ta-rounded-lg ta-min-w-[60px]',
            type: 'button',
            disabled: props.loading,
            onClick: () => props.cancel()
          }, [
            props.loading ? h(Spinner, { size: 16, variant: 'default' }) : 'Cancel'
          ]),
          h(Button, {
            class: 'ta-block ta-p-2 ta-bg-black ta-text-white ta-rounded-lg ta-min-w-[60px]',
            type: 'button',
            disabled: props.loading,
            onClick: () => props.confirm()
          }, [
            props.loading ? h(Spinner, { size: 16, variant: 'default' }) : 'I\'ve paid this amount'
          ])
        ]
      ])
    ]);
  }
});

const RenderFinishedDetails = defineComponent({
  props: {
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    amountPaid: { type: Number, required: true },
    coin: { type: String, required: true },
    status: { type: String as PropType<PaymentStatusProps>, default: PAYMENT_STATUS.PENDING },
    balance: { type: Number, required: true },
  },
  setup(props) {
    const statusKey = props.status;
    const paymentType: PaymentTypeProps | undefined = paymentStatusMap[statusKey];
    const iconToShow = paymentType ? PAYMENT_ICONS[paymentType] : undefined;
    const responseText = paymentType ? PAYMENT_RESPONSES[paymentType] : '';
    const completed = statusKey === PAYMENT_STATUS.COMPLETE;
    const isPartial = statusKey === PAYMENT_STATUS.PARTIAL;

    return () => h('div', [
      h(FormHeader, {
        title: `${sentenceCase(paymentType || 'payment')} Payment received`,
        description: "The customer made a partial or part payment of the requested amount.",
        icon: iconToShow as string | undefined
      }),
      h('div', { class: 'ta-flex ta-flex-col ta-border-t-1 ta-px-6 ta-gap-2' }, [
        h('div', { class: 'ta-flex ta-flex-row ta-bg-[#FAFAFA] ta-w-max-full ta-justify-between ta-p-4 ta-border ta-border-[#E6E6E6] ta-border-dashed ta-rounded-2xl ta-text-wrap ta-gap-4' }, [
          h('div', { class: 'ta-flex ta-flex-row ta-w-1/4' }, [
            h(QrCode, { size: 140 })
          ]),
          h('div', { class: 'ta-flex ta-flex-col ta-text-pretty ta-w-2/4 ta-my-auto' }, [
            h('h3', { class: 'ta-text-base ta-text-secondary' }, `${props.coin.toUpperCase()} Deposit Address`),
            h('p', { class: 'ta-text-[13px] ta-underline ta-underline-offset-4 ta-break-all' }, props.address)
          ]),
          h('div', { class: 'ta-flex ta-flex-row ta-w-1/4 ta-my-auto ta-justify-end' }, [
            h(Button, {
              class: '!ta-px-3 !ta-py-1 ta-flex-row !ta-bg-white !ta-border-[#D0D5DD] ta-rounded-2xl',
              variant: 'outline',
              onClick: () => copy(props.address)
            }, [
              h('span', { class: 'ta-flex ta-flex-row ta-text-[14px] ta-text-[#344054] ta-font-medium ta-gap-1 ta-justify-center ta-items-center' }, [
                h(Copy, { size: 18 }),
                h('span', 'Copy')
              ])
            ])
          ])
        ]),
        completed ? h('div', { class: 'ta-flex ta-flex-col ta-p-4 ta-justify-center ta-items-center' }, [
          h('p', 'YOU PAID'),
          h('div', { class: 'ta-flex ta-flex-row ta-gap-2' }, [
            h('span', { class: 'ta-text-[38px] leading-[48px] ta-font-bold' }, props.amountPaid || props.amount),
            h('span', { class: 'ta-text-xl ta-mt-auto ta-mb-4 ta-text-secondary ta-font-bold' }, props.coin.toUpperCase())
          ])
        ]) : h('div', { class: 'ta-flex ta-flex-row ta-p-4 ta-justify-between ta-items-center ta-w-full' }, [
          h('div', { class: 'ta-flex ta-flex-col ta-p-4 ta-justify-center ta-items-center ta-w-1/2' }, [
            h('p', { class: 'ta-text-[12px] ta-text-secondary' }, 'YOU PAID'),
            h('div', { class: 'ta-flex ta-flex-row ta-gap-2' }, [
              h('span', { class: 'ta-text-[38px] leading-[48px] ta-font-bold' }, props.amountPaid),
              h('span', { class: 'ta-text-xl ta-mt-auto ta-mb-4 ta-text-secondary ta-font-bold' }, props.coin.toUpperCase())
            ])
          ]),
          h('div', { class: 'ta-flex ta-flex-col ta-p-4 ta-justify-center ta-items-center ta-w-1/2' }, [
            h('p', { class: 'ta-text-[12px] ta-text-secondary' }, paymentType === 'over' ? 'EXCESS' : 'REMAINING'),
            h('div', { class: 'ta-flex ta-flex-row ta-gap-2' }, [
              h('span', { class: 'ta-text-[38px] leading-[48px] ta-font-bold' }, props.balance),
              h('span', { class: 'ta-text-xl ta-mt-auto ta-mb-4 ta-text-secondary ta-font-bold' }, props.coin.toUpperCase())
            ])
          ])
        ]),
        h('div', { class: 'ta-text-[14px] ta-text-secondary ta-my-4' }, [
          h('p', { class: 'ta-text-sm ta-text-secondary' }, responseText)
        ])
      ]),
      h(FormFooter, {}, [
        isPartial ? h('div', { class: 'ta-flex ta-flex-row ta-w-full ta-items-center ta-gap-4' }, [
          h('span', [h(Spinner, { size: 16 })]),
          h('span', { class: 'ta-text-sm ta-text-secondary' }, 'Transaction is pending ...')
        ]) : h('span', { class: 'ta-text-sm ta-text-secondary' }, 'You will be redirected shortly')
      ])
    ]);
  }
});
</script> 