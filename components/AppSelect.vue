<script lang="ts" setup>
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import AppIcon from '@/components/AppIcon.vue'

export interface ISelectOption {
    name: string | number
    key: string | number | null
}

const props = defineProps<{
    options: ISelectOption[]
    selected: string | number | null
    placeholderKey?: string | null
}>()

const emit = defineEmits<{
    (e: 'select', option: ISelectOption): void
}>()

const element = ref<HTMLElement | null>(null)

let active = ref(false)
let opened = ref(false)
let selectedOption = computed(
    () => props.options.find((item) => item.key === props.selected)!
)

function select(option: ISelectOption) {
    emit('select', option)
    active.value = false
}

onClickOutside(element, () => (active.value = false))
</script>
<template lang="pug">

.select(:class="{ active, opened }" ref="element")
    .option.selected(@click="active = !active" :class="{ placeholder: placeholderKey === selectedOption.key }")
        .text {{ selectedOption.name }}
        AppIcon(name="ui/chevron" key="select-chevron")

    transition(name="show" @before-enter="opened = true" @after-leave="opened = false")
        .list(v-if="active")
            template(v-for="(item, index) in options")
                .option(v-if="!(selected !== item.key && item.key === placeholderKey)" :class="{ active: item.key == selected, placeholder: placeholderKey === item.key }" @click="select(item)"  :key="index")
                    .text {{ item.name }}
                    AppIcon(v-if="item.key == selected" name="ui/chevron" key="select-chevron")

</template>
<style lang="sass" scoped>

.select
    position: relative
    &.opened
        z-index: 4
    &.active
        .selected
            border-bottom-left-radius: 0
            border-bottom-right-radius: 0
            .icon
                transform: rotate(-180deg)

.selected
    position: relative
    z-index: 3
    border-radius: 8px
    transition: all .1s
    @include laptop()
        border-radius: 4px

.list
    @include scrollbar()
    position: absolute
    z-index: 2
    top: 100%
    left: 0
    right: 0px
    border-bottom-left-radius: 10px
    border-bottom-right-radius: 10px
    transition: all .1s
    box-shadow: 0 2px 4px rgba(#000, .1)
    background-color: #282A30
    display: flex
    flex-direction: column
    transition: box-shadow .15s .15s,  all .3s
    max-height: 195px
    overflow-y: auto
    overflow-x: hidden
    @include laptop()
        border-bottom-left-radius: 4px
        border-bottom-right-radius: 4px
        max-height: 130px

    &.show-enter-active, &.show-leave-active
        overflow-y: hidden

    &.show-enter-from, &.show-leave-to
        max-height: 0px
        box-shadow: 0 0px 0px rgba(#000, 0)


.option
    font-size: 15px
    color: #fff
    font-weight: 400
    cursor: pointer
    padding: 15px 38px
    position: relative
    background-color: #282A30
    transition: background-color .1s, transform .1s
    order: 2
    display: flex
    align-items: center
    flex-wrap: wrap
    &:first-child
        margin-top: 0

    &.placeholder
        .text
            color: #797979

    @include laptop()
        font-size: 12px
        padding: 9px 14px 9px 21px
    .text
        margin-right: 15px
        display: inline-flex
        @include laptop()
            margin-right: 12px

    .icon
        font-size: 13px
        @include laptop()
            font-size: 10px

    &.active
        opacity: 0
        order: 1
        display: none
        // margin-top: 0
    &:hover
        background-color: #1F2026
    &:active
        transform: scale(0.95)
</style>
