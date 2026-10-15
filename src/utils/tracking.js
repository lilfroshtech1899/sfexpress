/**
 * Reusable, date-based shipment status engine.
 *
 * All functions are pure and take an injectable `now` date so they can be
 * unit-tested and reused for any shipment that follows the same schedule
 * shape (shippingDate, expectedDeliveryDate + STAGES).
 */

import { STAGES } from '../data/shipment.js'

const MS_PER_DAY = 24 * 60 * 60 * 1000

/** Locale used by the date/time formatters. Updated by the language provider. */
let dateLocale = 'en-GB'

export function setDateLocale(locale) {
  if (locale) dateLocale = locale
}

/** Normalise any date value to local midnight. */
export function startOfDay(value) {
  const d = value instanceof Date ? new Date(value) : new Date(value)
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

/** Parse a 'YYYY-MM-DD' string into a local Date at midnight. */
export function parseDay(isoDate) {
  const [y, m, d] = String(isoDate).split('-').map(Number)
  return new Date(y, (m || 1) - 1, d || 1)
}

export function addDays(date, days) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

/** Combine a day with a 'HH:MM' string into a Date. */
export function atTime(day, time) {
  const [h, min] = String(time).split(':').map(Number)
  const d = new Date(day)
  d.setHours(h || 0, min || 0, 0, 0)
  return d
}

/** Whole-day difference between two dates (b - a). */
export function dayDiff(a, b) {
  return Math.round((startOfDay(b) - startOfDay(a)) / MS_PER_DAY)
}

export function formatDate(value) {
  if (!value) return '—'
  const d = value instanceof Date ? value : new Date(value)
  return d.toLocaleDateString(dateLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export function formatShortDate(value) {
  if (!value) return '—'
  const d = value instanceof Date ? value : new Date(value)
  return d.toLocaleDateString(dateLocale, { day: 'numeric', month: 'short' })
}

export function formatTime(value) {
  if (!value) return ''
  const d = value instanceof Date ? value : new Date(value)
  return d.toLocaleTimeString(dateLocale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

export function formatDateTime(value) {
  if (!value) return '—'
  return `${formatDate(value)} · ${formatTime(value)}`
}

/* ------------------------------------------------------------------ */
/* Status catalogue                                                    */
/* ------------------------------------------------------------------ */

/**
 * Status catalogue — tone per status code. Human-readable labels, messages
 * and locations are resolved through the active translation dictionary using
 * `status.<code>.label`, `status.<code>.message` and `status.<code>.location`.
 */
const STATUS_TONE = {
  scheduled: 'info',
  created: 'current',
  processing: 'current',
  dispatched: 'current',
  transit: 'current',
  arrived: 'current',
  outForDelivery: 'current',
  delivered: 'done'
}

/**
 * Determine the active stage from the current date by comparing against each
 * stage's scheduled date. Stages are not necessarily one-per-day (some share
 * a day, some skip days), so the active stage is the latest milestone whose
 * date has been reached.
 *
 * Delivered is deliberately excluded: a shipment is never auto-marked
 * delivered by date. It stays "Out for Delivery" (as of 14 Oct 2026) until
 * it is explicitly confirmed.
 */
function resolveStatus(stageDates, today) {
  let currentIndex = -1
  STAGES.forEach((stage, index) => {
    if (stage.key === 'delivered') return
    if (dayDiff(stageDates[index], today) >= 0) currentIndex = index
  })
  const code = currentIndex === -1 ? 'scheduled' : STAGES[currentIndex].key
  return { code, currentIndex, delivered: false }
}

/**
 * Compute the full, date-aware tracking view for a shipment.
 *
 * @param {object} shipment - shipment record (see data/shipment.js)
 * @param {Date|string} [now] - reference "current" date (defaults to real now)
 * @param {function} [t] - translation helper (key, vars) => string
 * @returns {object} progress model consumed by the UI
 */
export function getTrackingView(shipment, now = new Date(), t = (key) => key) {
  const shipDay = parseDay(shipment.shippingDate)
  const deliveryDay = parseDay(shipment.expectedDeliveryDate)
  const today = startOfDay(now)

  const dayIndex = dayDiff(shipDay, today)

  const stageDates = STAGES.map((stage) => addDays(shipDay, stage.dayOffset))

  const { code, currentIndex, delivered } = resolveStatus(stageDates, today)
  const tone = STATUS_TONE[code] || STATUS_TONE.scheduled

  const stages = STAGES.map((stage, index) => {
    let state = 'pending'
    if (delivered) {
      state = 'completed'
    } else if (currentIndex === -1) {
      state = 'pending'
    } else if (index < currentIndex) {
      state = 'completed'
    } else if (index === currentIndex) {
      state = 'current'
    }

    const scheduledMoment = atTime(stageDates[index], stage.time)
    const isReached = state === 'completed' || state === 'current'

    return {
      ...stage,
      title: t(`stage.${stage.key}.title`),
      description: t(`stage.${stage.key}.desc`),
      state,
      isReached,
      date: stageDates[index],
      scheduledMoment,
      timestampLabel: isReached ? formatDateTime(scheduledMoment) : formatDate(stageDates[index]),
      timestampKind: isReached ? 'recorded' : 'estimated'
    }
  })

  // Last recorded update: prefer the current stage, else the last completed one.
  const recorded = stages.filter((s) => s.isReached)
  const lastStage = recorded.length ? recorded[recorded.length - 1] : null
  const lastUpdate = lastStage ? lastStage.scheduledMoment : null

  const isDelayed = false
  const needsConfirmation = false

  const deliveryEstimateLabel = delivered
    ? t('deliveredOn', { date: formatDate(deliveryDay) })
    : formatDate(deliveryDay)

  const completedCount = delivered
    ? STAGES.length
    : currentIndex === -1
      ? 0
      : currentIndex
  const progressPercent = Math.round((completedCount / (STAGES.length - 1)) * 100)

  return {
    schedule: {
      shippingDate: shipDay,
      expectedDeliveryDate: deliveryDay
    },
    code,
    statusLabel: t(`status.${code}.label`),
    tone,
    message: t(`status.${code}.message`),
    location: t(`status.${code}.location`),
    currentIndex,
    completedCount,
    delivered,
    isDelayed,
    needsConfirmation,
    deliveredByDate: delivered,
    dayIndex,
    stages,
    lastUpdate,
    lastUpdateLabel: lastUpdate ? formatDateTime(lastUpdate) : t('awaiting'),
    deliveryEstimateLabel,
    progressPercent: Math.max(0, Math.min(100, progressPercent))
  }
}

/**
 * Simulated next-milestone hint for the summary card.
 */
export function getNextMilestone(view) {
  if (view.delivered) return null
  if (view.currentIndex === -1) return view.stages[0]
  const next = view.stages[view.currentIndex + 1]
  return next || null
}
