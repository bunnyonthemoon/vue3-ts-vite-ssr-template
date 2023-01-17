<script lang="ts" setup>
defineProps<{
    active: boolean
}>()
defineEmits<{
    (e: 'toggle', value: boolean): void
}>()
</script>
<template lang="pug">

.checkbox(@click="$emit('toggle', !active)" :class="{ active }")
    .box
    .content
        slot

</template>
<style lang="sass" scoped>

.checkbox
    font-size: 18px
    display: flex
    align-items: center
    cursor: pointer
    @include laptop()
        font-size: 16px
    @include phone()
        font-size: 14px
    .box
        border: 2px solid $blue
        width: 27px
        height: 27px
        margin-right: 13px
        border-radius: 5px
        flex-shrink: 0
        position: relative
        display: inline
        &::before
            content: ''
            position: absolute
            width: 15px
            height: 15px
            border-radius: 2px
            background-color: $blue
            left: 4px
            top: 4px
            transform: scale(0)
            transition: all .1s
        @include laptop()
            width: 24px
            height: 24px
            border-radius: 4px
            &::before
                width: 13px
                height: 13px
        @include phone()
            width: 21px
            height: 21px
            border-radius: 4px
            margin-right: 10px
            &::before
                width: 11px
                height: 11px
                left: 3px
                top: 3px

    &.active
        .box::before
            transform: scale(1)
</style>
