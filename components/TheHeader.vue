<script lang="ts" setup>
import { RouterLink, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useUIStore } from '@/stores/ui'
import { computed } from 'vue'

const UserStore = useUserStore()
const UIStore = useUIStore()

const user = computed(() => UserStore.user)
</script>
<template lang="pug">

header.header
    RouterLink.link(:to="{ name: 'main' }") Главная
    RouterLink.link(:to="{ name: 'profile' }") Профиль
    .link(v-if="!user" @click="UIStore.popup = { name: 'login' }") Войти
    .link(v-if="!user" @click="UIStore.popup = { name: 'signup' }") Зарегестрироваться
.header-placeholder

</template>
<style lang="sass" scoped>

.header
    position: fixed
    width: 100%
    display: flex
    align-items: center
    justify-content: space-between
    padding: 15px 20px

.header-placeholder
    height: 70px

.nav
    display: flex

.link
    @include btn()
    margin-left: 20px
    padding: 10px 30px
    height: auto
</style>
