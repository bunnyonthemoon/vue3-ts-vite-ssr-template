export class Timer {
    startDate: Date
    timestamp = 0
    _interval?: NodeJS.Timer

    start() {
        this._interval = setInterval(() => {
            this.timestamp = new Date().getTime() - this.startDate.getTime()
        }, 1000)
    }

    stop() {
        clearInterval(this._interval)
    }

    get timeStr() {
        return timestampToStr(this.timestamp / 1000)
    }

    constructor(startDate: Date) {
        this.startDate = startDate
        this.timestamp = new Date().getTime() - startDate.getTime()
    }
}

export function timestampToStr(timestamp: number) {
    const hours = ~~(timestamp / 3600)
    const minutes = ~~((timestamp / 60) % 60)
    const seconds = ~~((timestamp % 60) % 60)

    let str = hours ? hours + ':' : ''
    str += (minutes < 10 ? '0' + minutes : minutes) + ':'
    str += seconds < 10 ? '0' + seconds : seconds

    return str
}
