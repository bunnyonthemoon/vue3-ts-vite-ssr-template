<script lang="ts" setup>
import popups from '@/components/ThePopup'
import { useUIStore } from '@/stores/ui'
import { computed } from '@vue/reactivity'
import { useScrollLock } from '@vueuse/core'
import { defineAsyncComponent, watch } from 'vue'

const UIStore = useUIStore()

let popup = computed({
    get() {
        return UIStore.popup
    },
    set(value) {
        UIStore.popup = value
    },
})

const component = computed(() => {
    let name = popup.value?.name
    if (name) return defineAsyncComponent(popups[name])
    return null
})

if (!import.meta.env.SSR) {
    let scrollLock = useScrollLock(document.querySelector('html'))
    watch(
        () => popup.value?.name,
        (value, oldValue) => {
            scrollLock.value = value ? true : false
        }
    )
}
</script>
<template lang="pug">

transition(name="show" :duration="{ enter: 800, leave: 600 }")
    .popups(v-if="popup")
        .fade(@click="popup = null")
        Suspense
            component(:is="component" :props="popup.props" @close="popup = null")

</template>
<style lang="sass" scoped>

.popups
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  width: 100vw
  height: 100vh
  z-index: 200
  &.show-enter-from, &.show-leave-to
    .fade
        opacity: 0
    .popup
        top: -100%
        top: -100vh
        box-shadow: 0 0 0 0 rgba(#000, 0)
  &.show-enter-active .popup
    animation: showPopup .8s
  &.show-leave-active .popup
    animation: hidePopup .6s

.fade
  position: absolute
  width: 100%
  height: 100%
  top: 0
  left: 0
  z-index: 1
  background-color: #000
  cursor: pointer
  opacity: .5
  transition: opacity .5s

@keyframes hidePopup
  0%
    margin-top: 0
    top: 50%
    top: 50vh
  30%
    margin-top: 35px
    top: 50%
    top: 50vh
  100%
    margin-top: 0
    top: -100%
    top: -100vh

@keyframes showPopup
  0%
    margin-top: 0
    top: -100%
    top: -100vh
  60%
    margin-top: 45px
    top: 50%
    top: 50vh
  100%
    margin-top: 0
    top: 50%
    top: 50vh
</style>
