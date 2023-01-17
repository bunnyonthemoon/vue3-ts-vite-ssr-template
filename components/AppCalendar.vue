<script lang="ts" setup>
import { computed, reactive } from 'vue'
import TheIcon from './AppIcon.vue'
import AppSelect, { type ISelectOption } from '@/components/AppSelect.vue'

const props = defineProps<{
    date?: Date
    active?: { start: Date; end: Date }
    choosen?: Date | null
}>()

const emit = defineEmits<{
    (e: 'choose', date: Date | null): void
}>()

class Calendar {
    _month!: Date
    _active?: {
        start: Date
        end: Date
    }
    _choosen!: Date | null

    current!: Month
    prev!: Month
    next!: Month

    get month() {
        return this._month
    }
    set month(month: Date) {
        this._month = dateConstructor({ obj: month })

        this.current = new Month({ date: this._month, calendar: this })

        this.prev = new Month({
            date: new Date(this.current.year, this.current.month - 1, 1),
            calendar: this,
        })

        this.prev.lastDate = this.prev.daysNumber
        this.prev.firstDate = this.prev.daysNumber - (this.current.firstDay - 2)
        this.prev.canBe = this.current.firstDay > 1

        this.next = new Month({
            date: new Date(this.current.year, this.current.month + 1, 1),
            calendar: this,
        })

        this.next.lastDate = 7 - this.current.lastDay
        this.next.firstDate = 1
        this.next.canBe = this.current.lastDay < 7
    }

    get active() {
        return this._active
    }
    set active(date: { start: Date; end: Date } | undefined) {
        if (date)
            this._active = {
                start: dateConstructor({ obj: date.start }),
                end: dateConstructor({ obj: date.end }),
            }
        else this._active = date
    }

    get choosen() {
        return this._choosen
    }
    set choosen(date: Date | null) {
        if (date) this._choosen = dateConstructor({ obj: date })
        else this._choosen = date
        emit('choose', this._choosen)
    }

    constructor({
        month,
        active,
        choosen,
    }: {
        month: Date
        active?: { start: Date; end: Date }
        choosen?: Date | null
    }) {
        this.month = month
        this.active = active
        this.choosen = choosen || null
    }
}

class Month {
    date!: Date

    firstDate!: number
    lastDate!: number

    canBe: boolean

    get month() {
        return this.date.getMonth()
    }
    get year() {
        return this.date.getFullYear()
    }
    get daysNumber() {
        return new Date(this.year, this.month + 1, 0).getDate()
    }

    get firstDay() {
        let day = new Date(this.year, this.month, this.firstDate).getDay()
        if (day == 0) day = 7
        return day
    }
    get lastDay() {
        let day = new Date(this.year, this.month, this.lastDate).getDay()
        if (day == 0) day = 7
        return day
    }

    get days() {
        if (!this.canBe) return []

        const days: Day[] = []
        for (let day = this.firstDate; day <= this.lastDate; day++)
            days.push(new Day(day, this))

        return days
    }

    constructor({
        date = new Date(),
        canBe,
    }: {
        date: Date
        calendar: Calendar
        canBe?: boolean
    }) {
        this.date = date

        this.firstDate = 1
        this.lastDate = this.daysNumber
        this.canBe = canBe || true
    }
}

class Day {
    date!: Date
    day!: number
    month!: Month

    get active() {
        if (calendar.current != this.month) return false

        if (!calendar.active) return true

        return (
            this.date >= calendar.active.start &&
            this.date <= calendar.active.end
        )
    }

    get disabled() {
        return calendar.current != this.month
    }

    get choosen() {
        return (
            calendar.choosen &&
            this.date.getTime() == calendar.choosen.getTime()
        )
    }

    get first() {
        return calendar.active && calendar.active.start == this.date
    }
    get last() {
        return calendar.active && calendar.active.end == this.date
    }

    constructor(day: number, month: Month) {
        this.day = day
        this.month = month

        this.date = dateConstructor({ obj: month.date, date: day })
    }
}

function dateConstructor({
    year,
    month,
    date,
    obj,
}: {
    year?: number
    month?: number
    date?: number
    obj?: Date
}) {
    let result

    if (obj) result = new Date(obj)
    else result = new Date()

    if (year) result.setFullYear(year)
    if (month) result.setMonth(month)
    if (date) result.setDate(date)

    result.setHours(0)
    result.setMinutes(0)
    result.setSeconds(0)
    result.setMilliseconds(0)

    return result
}

let month = dateConstructor({
    obj: props.date || props.choosen || props.active?.end,
})

let calendar = reactive<Calendar>(
    new Calendar({
        month,
        active: props.active,
        choosen: props.choosen,
    })
) as Calendar

function setMonth(value: number) {
    calendar.month = new Date(calendar.current.year, value, 1)
}

function setYear(value: number) {
    calendar.month = new Date(value, calendar.current.month, 1)
}

function selectMonth(month: ISelectOption) {
    setMonth(monthNames.indexOf(month.key as string))
}

function selectYear(year: ISelectOption) {
    setYear(year.key as number)
}

const days = computed(() => {
    return ([] as Day[]).concat(
        calendar.prev.days,
        calendar.current.days,
        calendar.next.days
    )
})

const monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
]

const years = computed(() => {
    let years: number[] = []
    for (let index = new Date().getFullYear(); index > 1940; index--)
        years.push(index)

    return years
})

function setChoosen(day: Day) {
    if (!day.active) return

    calendar.choosen = day.date
}

const weekDaysNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
</script>

<template lang="pug">

.calendar(:class="{ 'calendar-active-range': active }")
    .month
        .prev(@click="setMonth(calendar.current.month - 1)")
            TheIcon(name="ui/chevron")
        .month-name
            AppSelect(:options="monthNames.map(item => ({ key: item, name: item }))" :selected="monthNames[calendar.current.month]" @select="selectMonth")
            AppSelect(:options="years.map(item => ({ key: item, name: item }))" :selected="calendar.current.year" @select="selectYear")
        //- | {{ calendar.current.year }}
        .next(@click="setMonth(calendar.current.month + 1)")
            TheIcon(name="ui/chevron")

    .week
        .day.week-name(v-for="(name, index) in weekDaysNames" :key="index") {{ name }}

    .days
        slot(v-for="day in days" name="day" :day="day")
            .day(:key="day.date.getTime()" :class="{ disabled: day.disabled, choosen: day.choosen, active: day.active }" @click="setChoosen(day)")
                span {{ day.day }}

</template>

<style lang="sass" scoped>

.calendar
    display: flex
    flex-direction: column
    &.calendar-active-range
        &:deep()
        .day
            cursor: default
            color: #999
            &.active
            cursor: pointer

.month
    display: flex
    justify-content: center
    align-items: center
    margin-bottom: 5px
    &-name
        display: flex
        .select
        margin-left: 0
        &:deep()
            .option
            white-space: nowrap
            flex-wrap: nowrap
            font-size: 14px
            font-weight: 400
            color: $black
  //   color: $green
    // font-size: 14px
    .prev, .next
        font-size: 13px
        padding: 4px 7px
        // color: #999
        color: $blue
        cursor: pointer
        display: flex
        .icon
            &:deep()
                path
                fill: none
                stroke: currentColor
    .prev
        padding-left: 40px
        .icon
            transform: rotate(90deg)
    .next
        padding-right: 40px
        .icon
            transform: rotate(-90deg)

.week
    display: flex

.days
    display: flex
    flex-wrap: wrap
    position: relative
    z-index: 1

.days, .week
    &:deep()
        .day
        height: 30px
        width: 24px
        width: calc((100% / 7) - 4px)
        text-align: center
        color: $black
        line-height: 24px
        display: flex
        align-items: center
        justify-content: center
        cursor: pointer
        position: relative
        margin-top: 2px
        margin: 2px 2px
        &.disabled
            color: #ccc
            cursor: default
        &.active
            color: #444
            &::before
            content: ''
            position: absolute
            right: 0
            top: 0
            width: 100%
            height: 100%
            background-color: #f5f5f5
            border-radius: 7px
            z-index: -2
            + .active:not(:nth-child(7n+1))
            &::before
                width: 200%

        &.choosen
            // color: #fff
            &::after
            content: ''
            position: absolute
            top: 0
            bottom: 0
            left: 0
            right: 0
            border: 2px solid $blue
            border-radius: 5px
            // &::after
            //   content: ''
            //   position: absolute
            //   right: 1px
            //   left: 1px
            //   top: 0
            //   bottom: 0
            //   // width: 100%
            //   // height: 100%
            //   // background-color: lighten($blue, 15)
            //   background-color: #fff
            //   border: 2px solid $blue
            //   border-radius: 5px
            //   z-index: -1
</style>
