import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import devalue from '@nuxt/devalue'
import { createCookies } from '@vueuse/integrations/useCookies'
import viteSSR from 'vite-ssr/vue'

import App from './App.vue'
import { useUIStore } from '@/stores/ui'
import { useUserStore } from '@/stores/user'
import routes from '@/router/routes'

export default viteSSR(
    App,
    {
        routes,
        transformState(state) {
            if (import.meta.env.SSR) {
                state.pinia.ui.router = null
                state.pinia.ui.serverRedirect = null
                state.pinia.ui.initialRoute = null
            }
            return import.meta.env.SSR ? devalue(state) : state
        },
    },
    async ({ app, router, initialState, request, initialRoute, redirect }) => {
        const pinia = createPinia()

        if (import.meta.env.SSR) initialState.pinia = pinia.state.value
        else pinia.state.value = initialState.pinia

        app.use(pinia)

        const head = createHead()
        app.use(head)

        const UIStore = useUIStore()
        UIStore.router = router as unknown as any
        if (import.meta.env.SSR) {
            UIStore.serverRedirect = redirect
            UIStore.initialRoute = initialRoute
        }

        const UserStore = useUserStore()

        if (import.meta.env.SSR) {
            const cookies = createCookies(request)()
            UserStore.setAccessToken(cookies.get('Authorization') || null)
        } else UserStore.setAccessToken(UserStore.accessToken)

        await UserStore.init()

        router.beforeEach((to, from, next) => {
            if (to.meta.auth) {
                if (!UserStore.user) {
                    UIStore.popup = {
                        name: 'login',
                        props: {
                            redirect: to,
                        },
                    }

                    return next(from || { name: 'title' })
                }
            }

            next()
        })

        return { head }
    }
)
