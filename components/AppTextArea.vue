<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity'
import { useWindowSize } from '@vueuse/core'
import { nextTick, onMounted, watch, type TextareaHTMLAttributes } from 'vue'

export interface ITextAreaProps extends TextareaHTMLAttributes {
    modelValue: string | number | null
}

const props = defineProps<ITextAreaProps>()
const { height, width } = useWindowSize()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): VoidFunction
}>()

const element = ref<HTMLTextAreaElement | null>(null)

const value = computed({
    get() {
        return props.modelValue || ''
    },
    set(value) {
        emit('update:modelValue', value)
    },
})

watch(
    () => props.modelValue,
    () => {
        resize()
    },
    { immediate: true }
)

watch(
    element,
    () => {
        resize()
    },
    { immediate: true }
)

watch(height, () => {
    resize()
})
watch(width, () => {
    resize()
})

async function resize() {
    if (!element.value) return

    element.value.style.height = 'auto'
    element.value.style.overflow = 'hidden'

    // НЕ УДАЛЯТЬ!!! На firefox есть баг движка связанный с этим. Это нужно чтобы движок браузера правильно перекалькулировал свойство scrollHeight
    let oldHeight = element.value.scrollHeight
    await nextTick(() => {
        if (!element.value) return

        element.value.style.height = element.value.scrollHeight + 'px'
        element.value.style.removeProperty('overflow')
    })
}
</script>
<template lang="pug">

textarea.textarea(v-bind="props" v-model="value" ref="element")

</template>
<style lang="sass" scoped>
.textarea
    &::placeholder
        word-wrap: normal
</style>
