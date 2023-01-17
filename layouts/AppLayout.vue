<script lang="ts" setup>
import { RouterView } from 'vue-router'
import TheFooter from '@/components/TheFooter.vue'
import TheHeader from '@/components/TheHeader.vue'
import PopupContainer from '@/components/ThePopup/PopupContainer.vue'
</script>
<template lang="pug">

.default-layout
    TheHeader
    RouterView
    TheFooter
    PopupContainer

</template>
<style lang="sass" scoped>

.default-layout
    display: flex
    flex-direction: column
</style>
