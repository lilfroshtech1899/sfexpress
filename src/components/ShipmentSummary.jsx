import StatusBadge from './StatusBadge.jsx'
import { PinIcon, ClockIcon, ArrowRightIcon } from './Icons.jsx'
import { formatDate, getNextMilestone } from '../utils/tracking.js'

export default function ShipmentSummary({ shipment, view }) {
  const next = getNextMilestone(view)

  return (
    <section className="card summary" aria-labelledby="summary-heading">
      <div className="summary__top">
        <div className="summary__headline">
          <p className="summary__eyebrow">Tracking number</p>
          <h2 className="summary__tracking" id="summary-heading">
            {shipment.trackingNumber}
          </h2>
          <div className="summary__badges">
            <StatusBadge tone={view.tone} label={view.statusLabel} />
            <span className="chip chip--ghost">{shipment.deliveryMethod}</span>
          </div>
        </div>

        <div className="summary__eta">
          <span className="summary__eta-label">
            {view.delivered
              ? 'Delivered'
              : view.isDelayed
                ? 'Expected delivery'
                : 'Estimated delivery'}
          </span>
          <strong className="summary__eta-value">
            {view.delivered
              ? view.deliveryEstimateLabel.replace('Delivered on ', '')
              : formatDate(view.schedule.expectedDeliveryDate)}
          </strong>
          {view.isDelayed && <span className="summary__eta-note">{view.deliveryEstimateLabel}</span>}
        </div>
      </div>

      <p className="summary__message">{view.message}</p>

      <div className="summary__progress" role="group" aria-label="Shipment progress">
        <div className="summary__progress-track">
          <span
            className={`summary__progress-bar tone-${view.tone}`}
            style={{ width: `${view.progressPercent}%` }}
          />
        </div>
        <span className="summary__progress-value">{view.progressPercent}% complete</span>
      </div>

      <dl className="summary__meta">
        <div className="summary__meta-item">
          <dt>
            <PinIcon width="16" height="16" /> Current location
          </dt>
          <dd>{view.location}</dd>
        </div>
        <div className="summary__meta-item">
          <dt>
            <ClockIcon width="16" height="16" /> Last update
          </dt>
          <dd>{view.lastUpdateLabel}</dd>
        </div>
        <div className="summary__meta-item">
          <dt>
            <ArrowRightIcon width="16" height="16" /> Route
          </dt>
          <dd>
            {shipment.originCountry} <span aria-hidden="true">→</span> {shipment.destinationCountry}
          </dd>
        </div>
      </dl>

      {next && (
        <div className="summary__next">
          <span className="summary__next-label">Next milestone</span>
          <span className="summary__next-value">
            {next.title} · <span className="muted">est. {formatDate(next.date)}</span>
          </span>
        </div>
      )}
    </section>
  )
}
