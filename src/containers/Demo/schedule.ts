import { demo } from '@/data/demo'

/*
 * Demo slots are fixed in West African Time (UTC+1, no daylight saving).
 * A "day" is the UTC midnight of that WAT calendar date, so day maths never
 * depends on the visitor's own clock; times are only converted for display.
 */

const DAY_MS = 86_400_000
const WAT_OFFSET_MINUTES = 60

export type TimeZoneOption = { id: string; city: string; name: string }

export const addDays = (day: Date, count: number) =>
    new Date(day.getTime() + count * DAY_MS)

export const sameDay = (a: Date | null, b: Date | null) =>
    !!a && !!b && a.getTime() === b.getTime()

/** Today's date in Abuja, as a UTC-midnight day. */
export const todayInWat = () => {
    const now = new Date(Date.now() + WAT_OFFSET_MINUTES * 60_000)
    return new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
    )
}

export const isWeekend = (day: Date) =>
    day.getUTCDay() === 0 || day.getUTCDay() === 6

/** Weekdays from tomorrow to the end of the booking window. */
export const isBookable = (day: Date, today: Date) =>
    day > today &&
    day <= addDays(today, demo.bookingWindowDays) &&
    !isWeekend(day)

export const firstBookableFrom = (from: Date, today: Date) => {
    let day = from
    for (let i = 0; i < 14 && !isBookable(day, today); i++)
        day = addDays(day, 1)
    return day
}

/** Minutes after midnight (WAT) of every bookable slot. */
export const slotMinutes = (() => {
    const { firstHour, lastHour, stepMinutes } = demo.slots
    const list: number[] = []
    for (let m = firstHour * 60; m <= lastHour * 60; m += stepMinutes)
        list.push(m)
    return list
})()

export const slotInstant = (day: Date, minutes: number) =>
    new Date(day.getTime() + (minutes - WAT_OFFSET_MINUTES) * 60_000)

export const formatTime = (instant: Date, timeZone: string) =>
    new Intl.DateTimeFormat('en-GB', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone,
    })
        .format(instant)
        .replace(/\s/g, ' ')
        .toLowerCase()

export const weekdayShort = (day: Date) =>
    new Intl.DateTimeFormat('en-GB', { weekday: 'short', timeZone: 'UTC' })
        .format(day)
        .toUpperCase()

export const monthLabel = (day: Date) =>
    new Intl.DateTimeFormat('en-GB', {
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(day)

/** Long date in the chosen zone, split for the confirmation ("Friday" / "October 09, 2026"). */
export const longDate = (instant: Date, timeZone: string) => ({
    weekday: new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        timeZone,
    }).format(instant),
    date: new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
        timeZone,
    }).format(instant),
})

/** "+1:00 - Abuja", from the zone's offset on that date. */
export const zoneLabel = (zone: TimeZoneOption, at: Date) => {
    const offset =
        new Intl.DateTimeFormat('en-US', {
            timeZone: zone.id,
            timeZoneName: 'shortOffset',
        })
            .formatToParts(at)
            .find((part) => part.type === 'timeZoneName')?.value ?? 'GMT'
    const match = /GMT([+-])(\d{1,2})(?::(\d{2}))?/.exec(offset)
    const sign = match ? match[1] : '+'
    const hours = match ? match[2] : '0'
    const minutes = match?.[3] ?? '00'
    return `${sign}${hours}:${minutes} - ${zone.city}`
}

/** Abuja, London and New York, plus the visitor's own zone if it is none of those. */
export const timeZoneOptions = (): TimeZoneOption[] => {
    const own = Intl.DateTimeFormat().resolvedOptions().timeZone
    const list: TimeZoneOption[] = [...demo.timeZones]
    if (own && !list.some((zone) => zone.id === own)) {
        list.push({
            id: own,
            city: own.split('/').pop()?.replace(/_/g, ' ') ?? own,
            name: 'your local time',
        })
    }
    return list
}

/** The visitor's zone when listed, otherwise Abuja. */
export const defaultTimeZone = (options: TimeZoneOption[]) => {
    const own = Intl.DateTimeFormat().resolvedOptions().timeZone
    return options.find((zone) => zone.id === own)?.id ?? options[0].id
}
