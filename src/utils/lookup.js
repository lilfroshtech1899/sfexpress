/**
 * Tracking-number lookup for the demonstration portal.
 *
 * Only the registered demonstration shipment is resolvable. Arbitrary
 * tracking numbers are intentionally rejected so that shipment details
 * are never exposed for numbers the portal does not own.
 */

import { shipment, DEMO_TRACKING_NUMBER } from '../data/shipment.js'

/** Normalise a user-typed tracking number. */
export function normalizeTrackingNumber(value) {
  return String(value || '')
    .trim()
    .toUpperCase()
    .replace(/[\s-]/g, '')
}

export const INVALID_TRACKING_MESSAGE =
  'We could not find a shipment with that tracking number. Please check the number and try again. Tracking numbers look like SF1582947106205.'

/**
 * Resolve a tracking number to shipment data.
 * @returns {{ ok: true, shipment: object } | { ok: false, reason: string }}
 */
export function lookupTracking(rawValue) {
  const value = normalizeTrackingNumber(rawValue)

  if (!value) {
    return { ok: false, reason: 'Please enter a tracking number to track your shipment.' }
  }

  if (value.length < 8) {
    return { ok: false, reason: INVALID_TRACKING_MESSAGE }
  }

  if (value !== normalizeTrackingNumber(DEMO_TRACKING_NUMBER)) {
    return { ok: false, reason: INVALID_TRACKING_MESSAGE }
  }

  return { ok: true, shipment }
}
