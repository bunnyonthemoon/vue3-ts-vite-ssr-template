export class Popups {
    'signup' = () => import('./PopupAuth.vue')
    'login' = () => import('./PopupAuth.vue')
}

const popups = new Popups()

export default popups
