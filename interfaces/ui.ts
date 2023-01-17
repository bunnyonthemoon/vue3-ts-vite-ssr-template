import type { Icons } from '@/assets/icons'
import type { Popups } from '@/components/ThePopup'
import type { RouteLocationRaw } from 'vue-router'

export type INavigationLink = {
    name: string
    icon: keyof Icons
} & (
    | { route: RouteLocationRaw }
    | { popup: { name: keyof Popups; props?: any } }
    | { action: () => void }
)
