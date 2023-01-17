import type { RouteRecordRaw } from 'vue-router'

export default [
    {
        path: '/',
        component: () => import('@/layouts/AppLayout.vue'),
        children: [
            {
                path: '',
                name: 'main',
                component: () => import('@/pages/Main/MainPage.vue'),
            },
            {
                path: '/:catchAll(.*)',
                name: 'not-found',
                component: () => import('@/pages/NotFound.vue'),
            },
        ],
    },
    {
        path: '/profile',
        component: () => import('@/layouts/AppLayout.vue'),
        meta: { auth: true },
        children: [
            {
                path: '',
                name: 'profile',
                component: () => import('@/pages/Profile/ProfilePage.vue'),
            },
        ],
    },
] as RouteRecordRaw[]
