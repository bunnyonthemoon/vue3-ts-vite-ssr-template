<script lang="ts" setup>
import icons, { Icons } from '@/assets/icons'

const props = defineProps<{
    name: keyof Icons
}>()

let icon = (await icons[props.name]()).default
</script>
<template lang="pug">

.icon(v-html="icon")

</template>
<style lang="sass" scoped>

.icon
    display: inline-flex
    &:deep()
        svg
            width: 1em
            height: 1em
            fill: currentColor
            &.fill, .fill
                fill: currentColor
            &.stroke, .stroke
                fill: none
                stroke: currentColor
                path, rect
                    stroke-width: inherit
            &.stroke-and-fill, .stroke-and-fill
                fill: currentColor
                stroke: currentColor
                path, rect
                    stroke-width: inherit
            &.none, .none
                fill: none
                stroke: none
</style>
