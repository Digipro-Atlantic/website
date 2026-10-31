import { useState } from 'react'
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react'
import { isEmail } from '@/containers/Contact/submit'
import { demo } from '@/data/demo'
import { useMedia } from '@/hooks/useMedia'
import {
    addDays,
    defaultTimeZone,
    firstBookableFrom,
    formatTime,
    isBookable,
    monthLabel,
    sameDay,
    slotInstant,
    slotMinutes,
    timeZoneOptions,
    todayInWat,
    weekdayShort,
    zoneLabel,
    type TimeZoneOption,
} from './schedule'

export type SlotSelection = {
    day: Date
    minutes: number
    zone: TimeZoneOption
    attendees: string[]
}

type SlotPickerProps = {
    /** Off until the visitor has given their details (Figma's greyed-out calendar). */
    enabled: boolean
    pending: boolean
    error?: string
    onContinue: (selection: SlotSelection) => void
}

const { schedule } = demo

// Selected days and slots get a 2px green edge drawn inside the 1px border, so nothing shifts.
const picked =
    'border-primary-400 text-primary-400 ring-1 ring-primary-400 ring-inset'
const choice =
    'transition-[border-color,color,opacity,box-shadow] duration-150 ease-out'

/** Figma's right-hand panel: month, a strip of days, time zone, half-hour slots, extra attendees. */
export const SlotPicker = ({
    enabled,
    pending,
    error,
    onContinue,
}: SlotPickerProps) => {
    const wide = useMedia('(min-width: 64rem)')
    const visibleDays = wide ? 8 : 4

    const [today] = useState(todayInWat)
    const [zones] = useState(timeZoneOptions)
    const [zoneId, setZoneId] = useState(() => defaultTimeZone(zones))
    const [day, setDay] = useState(() =>
        firstBookableFrom(addDays(today, 1), today),
    )
    const [start, setStart] = useState(() => addDays(today, 1))
    const [minutes, setMinutes] = useState<number | null>(null)
    const [attendeesOpen, setAttendeesOpen] = useState(false)
    const [attendees, setAttendees] = useState('')
    const [attendeeError, setAttendeeError] = useState<string>()

    const zone = zones.find((option) => option.id === zoneId) ?? zones[0]
    const first = addDays(today, 1)
    const last = addDays(today, demo.bookingWindowDays)
    const days = Array.from({ length: visibleDays }, (_, i) =>
        addDays(start, i),
    )
    const months = Array.from(
        new Set(
            Array.from({ length: demo.bookingWindowDays }, (_, i) =>
                monthLabel(addDays(first, i)),
            ),
        ),
    )

    const pickDay = (next: Date) => {
        setDay(next)
        setMinutes(null)
    }

    const page = (direction: 1 | -1) => {
        const next = addDays(start, direction * visibleDays)
        setStart(next < first ? first : next)
    }

    const jumpToMonth = (label: string) => {
        let target = first
        while (monthLabel(target) !== label && target < last)
            target = addDays(target, 1)
        const bookable = firstBookableFrom(target, today)
        setStart(target)
        pickDay(bookable)
    }

    const handleContinue = () => {
        if (minutes === null) return
        const list = attendees
            .split(/[,\s;]+/)
            .map((value) => value.trim())
            .filter(Boolean)
        const invalid = list.find((value) => !isEmail(value))
        if (invalid) {
            setAttendeeError(`"${invalid}" doesn't look like an email address.`)
            return
        }
        setAttendeeError(undefined)
        onContinue({ day, minutes, zone, attendees: list })
    }

    return (
        <div
            inert={!enabled}
            aria-hidden={!enabled || undefined}
            className={`transition-opacity duration-300 ease-out ${enabled ? 'opacity-100' : 'opacity-35'}`}
        >
            {/* Month: a quiet select that reads as "October 2026 ⌄". */}
            <div className="relative inline-flex items-center gap-2">
                <label htmlFor="demo-month" className="sr-only">
                    Month
                </label>
                <select
                    id="demo-month"
                    value={monthLabel(day)}
                    onChange={(event) => jumpToMonth(event.target.value)}
                    className="cursor-pointer appearance-none bg-transparent pr-6 text-body-lg font-semibold text-[#0c1017] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
                >
                    {months.map((label) => (
                        <option key={label} value={label}>
                            {label}
                        </option>
                    ))}
                </select>
                <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-0 size-4 text-[#0c1017]"
                />
            </div>

            {/* Day strip: arrows page a whole strip; weekends and today are not bookable. */}
            <div className="mt-8 flex items-center gap-2 md:gap-3 xl:gap-4">
                <button
                    type="button"
                    onClick={() => page(-1)}
                    disabled={start <= first}
                    aria-label="Earlier days"
                    className="shrink-0 cursor-pointer text-grey-900 opacity-56 transition-opacity duration-150 hover:opacity-100 disabled:cursor-default disabled:opacity-20"
                >
                    <ArrowLeft className="size-6" strokeWidth={1.5} />
                </button>
                <div
                    role="group"
                    aria-label="Choose a day"
                    className="grid flex-1 grid-cols-4 gap-2 md:grid-cols-8"
                >
                    {days.map((option) => {
                        const bookable = isBookable(option, today)
                        const selected = sameDay(option, day)
                        return (
                            <button
                                key={option.getTime()}
                                type="button"
                                disabled={!bookable}
                                aria-pressed={selected}
                                aria-label={option.toLocaleDateString('en-GB', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                    timeZone: 'UTC',
                                })}
                                onClick={() => pickDay(option)}
                                className={`flex h-24 cursor-pointer flex-col items-center justify-center gap-1 rounded border md:h-20 xl:h-25 ${choice} ${
                                    selected
                                        ? picked
                                        : bookable
                                          ? 'border-grey-300 text-grey-400 opacity-56 hover:text-grey-700 hover:opacity-100'
                                          : 'cursor-not-allowed border-grey-200 text-grey-300 opacity-30'
                                }`}
                            >
                                <span className="text-caption leading-[1.45]">
                                    {weekdayShort(option)}
                                </span>
                                <span className="text-h5 font-semibold md:text-h6 xl:text-h5">
                                    {option.getUTCDate()}
                                </span>
                            </button>
                        )
                    })}
                </div>
                <button
                    type="button"
                    onClick={() => page(1)}
                    disabled={addDays(start, visibleDays) > last}
                    aria-label="Later days"
                    className="shrink-0 cursor-pointer text-grey-900 opacity-56 transition-opacity duration-150 hover:opacity-100 disabled:cursor-default disabled:opacity-20"
                >
                    <ArrowRight className="size-6" strokeWidth={1.5} />
                </button>
            </div>

            {/* Time zone: slots are fixed in WAT and shown in the zone chosen here. */}
            <div className="relative mt-8 w-55.25">
                <label htmlFor="demo-zone" className="sr-only">
                    Time zone
                </label>
                <select
                    id="demo-zone"
                    value={zone.id}
                    onChange={(event) => setZoneId(event.target.value)}
                    className="h-10 w-full cursor-pointer appearance-none rounded border border-grey-300 bg-white pr-10 pl-4 text-body text-grey-600 transition-[border-color] duration-150 ease-out hover:border-grey-400 focus-visible:border-primary-400 focus-visible:outline-none"
                >
                    {zones.map((option) => (
                        <option key={option.id} value={option.id}>
                            {zoneLabel(option, day)}
                        </option>
                    ))}
                </select>
                <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-grey-600"
                />
            </div>

            <div
                role="group"
                aria-label="Choose a time"
                className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4"
            >
                {slotMinutes.map((slot) => {
                    const selected = slot === minutes
                    return (
                        <button
                            key={slot}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => setMinutes(slot)}
                            className={`h-10 cursor-pointer rounded border text-body ${choice} ${selected ? picked : 'border-grey-300 text-grey-900 hover:border-grey-400'}`}
                        >
                            {formatTime(slotInstant(day, slot), zone.id)}
                        </button>
                    )
                })}
            </div>

            <button
                type="button"
                aria-expanded={attendeesOpen}
                aria-controls="demo-attendees"
                onClick={() => setAttendeesOpen((open) => !open)}
                className="mt-8 flex cursor-pointer items-center gap-2 text-body font-semibold text-[#0c1017]"
            >
                {schedule.attendees}
                <ChevronDown
                    aria-hidden="true"
                    className={`size-4 transition-transform duration-200 ease-out motion-reduce:transition-none ${attendeesOpen ? 'rotate-180' : ''}`}
                />
            </button>
            {attendeesOpen && (
                <div
                    id="demo-attendees"
                    className="mt-4 transition-[opacity,translate] duration-200 ease-out starting:-translate-y-1 starting:opacity-0 motion-reduce:starting:translate-y-0"
                >
                    <label htmlFor="demo-attendee-input" className="sr-only">
                        Attendee emails, separated by commas
                    </label>
                    <input
                        id="demo-attendee-input"
                        type="text"
                        inputMode="email"
                        value={attendees}
                        onChange={(event) => setAttendees(event.target.value)}
                        placeholder={schedule.attendeesPlaceholder}
                        aria-invalid={attendeeError ? true : undefined}
                        aria-describedby={
                            attendeeError ? 'demo-attendee-error' : undefined
                        }
                        className="h-12 w-full rounded border border-grey-300 px-4 text-body-sm text-grey-900 transition-[border-color] duration-150 ease-out placeholder:text-grey-900 hover:border-grey-400 focus:border-primary-400 focus:outline-none aria-invalid:border-error-400"
                    />
                    {attendeeError && (
                        <p
                            id="demo-attendee-error"
                            className="mt-1.5 text-body-sm text-error-500"
                        >
                            {attendeeError}
                        </p>
                    )}
                </div>
            )}

            <div className="mt-6 flex flex-col items-start gap-3 md:items-end">
                <button
                    type="button"
                    onClick={handleContinue}
                    disabled={minutes === null || pending}
                    aria-busy={pending || undefined}
                    className="h-12 w-55.25 cursor-pointer rounded-lg bg-primary-400 text-body text-white transition-[background-color,color,transform] duration-150 ease-out hover:bg-primary-600 active:scale-[0.97] disabled:cursor-not-allowed disabled:bg-grey-200 disabled:text-grey-500 disabled:active:scale-100 md:w-33.5"
                >
                    {pending ? 'Sending…' : schedule.action}
                </button>
                {error && (
                    <p role="alert" className="text-body-sm text-error-500">
                        {error}
                    </p>
                )}
            </div>
        </div>
    )
}
