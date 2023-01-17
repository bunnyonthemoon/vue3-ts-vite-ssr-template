<script lang="ts" setup>
import type { TextareaHTMLAttributes } from 'vue'
import { useCurrencyInput } from 'vue-currency-input'

export interface IAppCurrencyInputProps extends TextareaHTMLAttributes {
    modelValue: string | number | null
}

const props = defineProps<IAppCurrencyInputProps>()

const { inputRef } = useCurrencyInput({
    currency: 'RUB',
    hideCurrencySymbolOnFocus: false,
    hideGroupingSeparatorOnFocus: false,
    hideNegligibleDecimalDigitsOnFocus: false,
    locale: 'RU',
    precision: 0,
})
</script>
<template lang="pug">

input(v-bind="props" ref="inputRef")

</template>
