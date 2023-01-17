<script lang="ts" setup>
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css'
import { computed, ref } from 'vue'

const props = defineProps<{
    modelValue: string
    placeholder?: string
    required?: boolean
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', modelValue: string | number): void
    (e: 'validation', value: boolean): void
}>()
let status = ref<'success' | 'error' | null>(null)

const value = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        if (value.length > 0 && value[0] !== '+') value = '+' + value

        emit('update:modelValue', value)
    },
})

function validate(value: { valid: boolean | undefined }) {
    if (value.valid === true) status.value = 'success'
    else if (value.valid === false) status.value = 'error'
    else if (value.valid === undefined) status.value = null
    emit('validation', !!value.valid)
}
</script>
<template lang="pug">
VueTelInput.phone(
    :validCharactersOnly="true"
    defaultCountry="ru"
    :inputOptions="{ placeholder, required, styleClasses: status, type: 'tel' }"
    :dropdownOptions="{ disabled: true }"
    v-model="value"
    @validate="validate"
)
</template>
<style lang="sass" scoped>

.vue-tel-input
    border: 0
    &:deep()
        .vti__dropdown
            display: none
        .vti__input
            @include input()
        &.success
            border-color: $green
        &.error
            border-color: $red
</style>
