import type { Popups } from '@/components/ThePopup'
import { defineStore } from 'pinia'
import type {
    RouteLocationNormalized,
    RouteLocationRaw,
    Router,
} from 'vue-router'

export const useUIStore = defineStore({
    id: 'ui',
    state: (): {
        popup: { name: keyof Popups; props?: any } | null
        redirectRoute: null | { name: string }
        router: Router | null
        serverRedirect: ((location: string, status?: number) => void) | null
        initialRoute: RouteLocationNormalized | null
    } => ({
        redirectRoute: null,
        popup: null,
        router: null,
        serverRedirect: null,
        initialRoute: null,
    }),

    actions: {
        redirect(to: RouteLocationRaw) {
            if (import.meta.env.SSR)
                this.serverRedirect!(
                    this.router!.resolve(to, this.initialRoute!).fullPath
                )
            else this.router?.push(to)
        },
    },
})
