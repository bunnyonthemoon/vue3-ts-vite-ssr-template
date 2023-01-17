<script lang="ts" setup>
import { useUIStore } from '@/stores/ui'
import { useUserStore } from '@/stores/user'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import PopupTemplate from './PopupTemplate.vue'

const router = useRouter()
const UserStore = useUserStore()
const UIStore = useUIStore()
const authType = computed(() => UIStore.popup?.name)

const email = ref('')
const username = ref('')
const password = ref('')
const passwordRepeat = ref('')
const error = ref<string | null>(null)

async function submit() {
    if (UIStore.popup?.name == 'login') await login()
    else await signup()
}

async function login() {
    const result = await UserStore.login(username.value, password.value)
    if (result === true) {
        UIStore.popup = null
        router.push({ name: 'main' })
    } else error.value = 'Неправильное имя пользователя или пароль'
}

async function signup() {
    const result = await UserStore.signup(
        username.value,
        email.value,
        password.value
    )

    if (result === true) {
        UIStore.popup = null
        router.push({ name: 'main' })
    } else error.value = result
}
</script>
<template lang="pug">

PopupTemplate
    .popup-title {{ authType == 'signup' ? 'Зарегестрироваться' : 'Войти' }}
    form(@submit.prevent="submit")

        template(v-if="authType == 'login'")
            .field
                label Имя пользователя
                input.input(v-model="username" autocomplete="username" name="username" placeholder="Введите имя пользователя")
            .field
                label Пароль
                input.input(v-model="password" type="password" name="password" autocomplete="current-password" placeholder="Введите пароль")

        template(v-else)
            .field
                label Имя пользователя
                input.input(v-model="username" name="username" placeholder="Введите имя пользователя")
            .field
                label Email
                input.input(v-model="email" type="email" autocomplete="email" placeholder="Введите email")
            .field
                label Пароль
                input.input(v-model="password" type="password" name="password" autocomplete="new-password" placeholder="Введите пароль")
            .field
                label Повторите пароль
                input.input(v-model="passwordRepeat" type="password" name="password" autocomplete="new-password" placeholder="Введите пароль")

        .error(v-if="error") {{ error }}

        .switch(v-if="authType == 'signup'") Уже есть аккаунт?&nbsp;
            .link(@click="UIStore.popup = { name: 'login' }") Войдите

        .switch(v-else) Нет аккаунта?&nbsp;
            .link(@click="UIStore.popup = { name: 'signup' }") Зарегестрируйтесь

        .options
            button.submit(type="submit") {{ authType == 'signup' ? 'Зарегестрироваться' : 'Войти' }}
            .cancel(@click="UIStore.popup = null") Отменить

</template>
<style lang="sass" scoped>

.popup
    width: 620px

form
    display: flex
    flex-direction: column

.field
    margin-top: 25px
    @include field()

.options
    display: flex
    justify-content: space-between
    margin-top: 40px

.submit, .cancel
    @include btn()
    width: 100%
    height: 60px

.submit
    --color: #{$green}
    margin-right: 30px

.cancel
    @include btn()
    --color: #040E13

.error
    color: red
    margin-top: 15px

.switch
    display: flex
    margin-top: 20px
    .link
        color: $green
        cursor: pointer
        display: flex
        &:hover
            text-decoration: underline
</style>
