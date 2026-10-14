/**
 * Demonstration shipment data for the SF Express Korea tracking portal.
 *
 * IMPORTANT: This is DEMONSTRATION data. It is NOT connected to a live
 * carrier-tracking service. Every timeline event below is a simulated
 * milestone derived from the schedule — not a verified carrier scan.
 *
 * The products / dates / parties are exactly as supplied. Simulated
 * milestone times are clearly labelled in the UI as demonstration data.
 */

// Unique demonstration tracking number for this shipment.
export const DEMO_TRACKING_NUMBER = 'SF1582947106205'

/**
 * Builds the demo tracking number if it is ever regenerated.
 * Kept deterministic so search always resolves to the same shipment.
 */
export function generateTrackingNumber() {
  return DEMO_TRACKING_NUMBER
}

export const shipment = {
  trackingNumber: DEMO_TRACKING_NUMBER,
  courier: 'SF Express Korea',
  service: 'SF International Express',
  deliveryMethod: 'Express Delivery',

  sender: 'Lee Minho',
  recipient: 'Alvina',

  products: ['iPhone', 'Bags', 'Shoes', 'Jewellery', 'Engagement Ring', 'Flowers'],
  productSummary: 'iPhone, bags, shoes, jewellery, engagement ring and flowers',

  shippingDate: '2026-10-08',
  expectedDeliveryDate: '2026-10-15',

  originCountry: 'South Korea',
  originCity: 'Seoul',
  currentLocation: 'South Korea',
  destinationCountry: 'Finland',
  destinationCity: 'Helsinki'
}

/**
 * Ordered timeline stages.
 * `dayOffset` is the number of days after the shipping date (8 Oct 2026)
 * on which the milestone occurs. Stages may share a day and skip days:
 *   Shipment Created 8 Oct (0), Processing 8 Oct (0),
 *   Dispatched 10 Oct (2), In Transit 12 Oct (4),
 *   Arrived 13 Oct (5), Out for Delivery 14 Oct (6), Delivered 15 Oct (7).
 * `time` is a milestone time used for display.
 */
export const STAGES = [
  {
    key: 'created',
    title: 'Shipment Created',
    description: 'Shipment information has been registered in the SF Express Korea system.',
    dayOffset: 0,
    time: '09:15',
    location: 'Seoul, South Korea'
  },
  {
    key: 'processing',
    title: 'Processing',
    description: 'The package is being prepared, labelled and processed at the origin facility.',
    dayOffset: 0,
    time: '13:40',
    location: 'Seoul, South Korea'
  },
  {
    key: 'dispatched',
    title: 'Dispatched',
    description: 'The shipment has left the SF Express Korea origin facility.',
    dayOffset: 2,
    time: '08:05',
    location: 'Incheon, South Korea'
  },
  {
    key: 'transit',
    title: 'In Transit',
    description: 'The shipment is travelling from South Korea toward the destination country.',
    dayOffset: 4,
    time: '19:30',
    location: 'South Korea → Finland'
  },
  {
    key: 'arrived',
    title: 'Arrived in Destination Country',
    description: 'The shipment has reached Finland and entered the destination delivery network.',
    dayOffset: 5,
    time: '11:20',
    location: 'Finland'
  },
  {
    key: 'outForDelivery',
    title: 'Out for Delivery',
    description: 'The shipment is with the local delivery service for final delivery.',
    dayOffset: 6,
    time: '08:45',
    location: 'Finland'
  },
  {
    key: 'delivered',
    title: 'Delivered',
    description: 'Your shipment has been successfully delivered to the recipient.',
    dayOffset: 7,
    time: '15:10',
    location: 'Finland'
  }
]
