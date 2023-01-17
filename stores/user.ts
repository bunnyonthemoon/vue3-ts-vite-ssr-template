import { defineStore } from 'pinia'
import type { CookieSetOptions } from 'universal-cookie'
import { watch } from 'vue'
import { useUIStore } from './ui'

import AuthLogin from '@/api/User/AuthLogin'
import AuthLogout from '@/api/User/AuthLogout'
import GetToken from '@/api/User/GetToken'
import AuthSignup from '@/api/User/AuthSignup'

import { setAccessToken } from '@/api/setup'
import type { IUserPrivate } from '@/interfaces/user'
import { useCookies } from '@vueuse/integrations/useCookies'
import { apiDomain, apiSecure, cookieDomain } from '@/env'
import GetProfile from '@/api/User/GetProfile'

const cookiesAuthName = 'Authorization'

export const useUserStore = defineStore({
    id: 'user',
    state: (): {
        user: IUserPrivate | null
        accessToken: string | null
    } => ({
        user: null,
        accessToken: null,
    }),

    getters: {},

    actions: {
        async init() {
            if (this.accessToken && !this.user) await this.getMyProfile()

            this.checkUser()
        },

        async getMyProfile() {
            if (!this.accessToken) return

            const { getProfile } = await GetProfile.request()
            this.user = getProfile
        },

        async login(username: string, password: string) {
            try {
                const {
                    tokenAuth: { token },
                } = await AuthLogin.request({
                    username,
                    password,
                })

                this.setAccessToken(token)

                await this.getMyProfile()

                return true
            } catch (error: any) {
                console.log(error.response)
                return false
            }
        },

        async signup(username: string, email: string, password: string) {
            try {
                const {
                    signup: { error },
                } = await AuthSignup.request({
                    username,
                    email,
                    password,
                })

                if (error) return error

                const {
                    tokenAuth: { token },
                } = await GetToken.request({ username, password })

                this.setAccessToken(token)

                await this.getMyProfile()

                return true
            } catch (error: any) {
                console.log(error.response)
                return 'Произошла ошибка'
            }
        },

        async logout() {
            const { logout } = await AuthLogout.request()

            this.setAccessToken(null)

            this.user = null
        },

        checkUser() {
            const UIStore = useUIStore()

            watch(
                () => this.user,
                (value, old) => {
                    if (!value && old && UIStore.router!.currentRoute.meta.auth)
                        UIStore.redirect({ name: 'title' })
                },
                {
                    immediate: true,
                }
            )
        },

        setAccessToken(token: string | null) {
            if (!import.meta.env.SSR) {
                const cookies = useCookies()
                const cookiesOptions: CookieSetOptions = {
                    domain: cookieDomain,
                    path: '/',
                    secure: apiSecure,
                }

                if (token) cookies.set(cookiesAuthName, token, cookiesOptions)
                else cookies.remove(cookiesAuthName, cookiesOptions)
            }
            this.accessToken = token

            setAccessToken(token)
        },
    },
})
