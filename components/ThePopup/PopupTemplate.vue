<script lang="ts" setup>
import { useUIStore } from '@/stores/ui'
import { computed } from '@vue/reactivity'
import AppIcon from '@/components/AppIcon.vue'

const UIStore = useUIStore()

let popup = computed({
    get() {
        return UIStore.popup
    },
    set(value) {
        UIStore.popup = value
    },
})
</script>
<template lang="pug">

.popup
    .close(@click="popup = null")
        AppIcon(name="ui/close")
    slot

</template>
<style lang="sass" scoped>

.popup
    z-index: 2
    position: absolute
    left: 50%
    left: 50vw
    top: 50%
    top: 50vh
    max-height: 90vh
    transform: translate(-50%, -50%)
    max-height: calc(100vh - 20px)
    overflow: auto
    display: flex
    flex-direction: column

    padding: 90px 70px 55px

    background-color: #232531
    border: 1.5px solid #306429
    box-shadow: 0px 0px 39px -5px rgba(6, 21, 129, 0.74)
    border-radius: 10px

    &:deep()
        .popup-title
            font-size: 22px
            font-weight: 700
            padding-right: 40px

.close
    position: absolute
    top: 20px
    right: 20px
    cursor: pointer
    color: $white
    font-size: 23px
    stroke-width: 5px
    top: 70px
    right: 70px
</style>
