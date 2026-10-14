import StatusBadge from './StatusBadge.jsx'
import { formatDate } from '../utils/tracking.js'

function Row({ label, children }) {
  return (
    <div className="details__row">
      <dt className="details__label">{label}</dt>
      <dd className="details__value">{children}</dd>
    </div>
  )
}

export default function ShipmentDetails({ shipment, view }) {
  return (
    <section className="card details" aria-labelledby="details-heading">
      <header className="card__head">
        <h3 className="card__title" id="details-heading">
          Shipment details
        </h3>
      </header>

      <dl className="details__grid">
        <Row label="Tracking number">
          <span className="mono">{shipment.trackingNumber}</span>
        </Row>
        <Row label="Courier">
          {shipment.courier}
        </Row>

        <Row label="Sender">{shipment.sender}</Row>
        <Row label="Recipient">{shipment.recipient}</Row>

        <Row label="Origin">
          {shipment.originCity}, {shipment.originCountry}
        </Row>
        <Row label="Destination">
          {shipment.destinationCity}, {shipment.destinationCountry}
        </Row>

        <Row label="Product description">
          <span className="details__products">{shipment.productSummary}</span>
        </Row>
        <Row label="Delivery method">{shipment.deliveryMethod}</Row>

        <Row label="Shipping date">{formatDate(view.schedule.shippingDate)}</Row>
        <Row label="Estimated delivery">{formatDate(view.schedule.expectedDeliveryDate)}</Row>

        <Row label="Current status">
          <StatusBadge tone={view.tone} label={view.statusLabel} size="sm" />
        </Row>
        <Row label="Current location">{view.location}</Row>

        <Row label="Last status update">
          <span>{view.lastUpdateLabel}</span>
        </Row>
        <Row label="Service">{shipment.service}</Row>
      </dl>
    </section>
  )
}
