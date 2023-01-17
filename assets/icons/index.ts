export class Icons {
    'ui/close' = () => import('./ui/close.svg?raw')
    'ui/check' = () => import('./ui/check.svg?raw') // TODO Поменять
    'ui/chevron' = () => import('./ui/chevron.svg?raw')
    'ui/star' = () => import('./ui/star.svg?raw')
    'ui/back' = () => import('./ui/back.svg?raw')
    'ui/question' = () => import('./ui/question.svg?raw')
    'ui/gamepad' = () => import('./ui/gamepad.svg?raw')
    'ui/link' = () => import('./ui/link.svg?raw')
    'ui/copy' = () => import('./ui/copy.svg?raw')
    'ui/edit' = () => import('./ui/edit.svg?raw')
    'ui/leave' = () => import('./ui/leave.svg?raw')
    'ui/monitor' = () => import('./ui/monitor.svg?raw')
    'ui/play' = () => import('./ui/play.svg?raw')
    'ui/quotes' = () => import('./ui/quotes.svg?raw')

    'ui/avatar-frame' = () => import('./ui/avatar-frame.svg?raw')

    'navigation/house' = () => import('./navigation/house.svg?raw')
    'navigation/rocket' = () => import('./navigation/rocket.svg?raw')
    'navigation/stats' = () => import('./navigation/stats.svg?raw')
    'navigation/profile' = () => import('./navigation/profile.svg?raw')
    'navigation/document' = () => import('./navigation/document.svg?raw')
    'navigation/settings' = () => import('./navigation/settings.svg?raw')
    'navigation/exit' = () => import('./navigation/exit.svg?raw')

    'stats/total-time' = () => import('./stats/total-time.svg?raw')
    'stats/average-time' = () => import('./stats/average-time.svg?raw')

    'match/award' = () => import('./match/award.svg?raw')
    'match/sword' = () => import('./match/sword.svg?raw')
}

const icons = new Icons()

export default icons
