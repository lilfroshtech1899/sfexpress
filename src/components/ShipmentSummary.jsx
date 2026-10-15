import StatusBadge from './StatusBadge.jsx'
import { PinIcon, ClockIcon, ArrowRightIcon } from './Icons.jsx'
import { formatDate, getNextMilestone } from '../utils/tracking.js'
import { useI18n } from '../i18n/LanguageContext.jsx'

export default function ShipmentSummary({ shipment, view }) {
  const { t, trPlace } = useI18n()
  const next = getNextMilestone(view)

  return (
    <section className="card summary" aria-labelledby="summary-heading">
      <div className="summary__top">
        <div className="summary__headline">
          <p className="summary__eyebrow">{t('summary.trackingNumber')}</p>
          <h2 className="summary__tracking" id="summary-heading">
            {shipment.trackingNumber}
          </h2>
          <div className="summary__badges">
            <StatusBadge tone={view.tone} label={view.statusLabel} />
            <span className="chip chip--ghost">{t('method.express')}</span>
          </div>
        </div>

        <div className="summary__eta">
          <span className="summary__eta-label">
            {view.delivered
              ? t('summary.delivered')
              : view.isDelayed
                ? t('summary.expected')
                : t('summary.estimated')}
          </span>
          <strong className="summary__eta-value">
            {formatDate(view.schedule.expectedDeliveryDate)}
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
        <span className="summary__progress-value">{t('summary.complete', { n: view.progressPercent })}</span>
      </div>

      <dl className="summary__meta">
        <div className="summary__meta-item">
          <dt>
            <PinIcon width="16" height="16" /> {t('summary.location')}
          </dt>
          <dd>{view.location}</dd>
        </div>
        <div className="summary__meta-item">
          <dt>
            <ClockIcon width="16" height="16" /> {t('summary.lastUpdate')}
          </dt>
          <dd>{view.lastUpdateLabel}</dd>
        </div>
        <div className="summary__meta-item">
          <dt>
            <ArrowRightIcon width="16" height="16" /> {t('summary.route')}
          </dt>
          <dd>
            {trPlace(shipment.originCountry)} <span aria-hidden="true">→</span>{' '}
            {trPlace(shipment.destinationCountry)}
          </dd>
        </div>
      </dl>

      {next && (
        <div className="summary__next">
          <span className="summary__next-label">{t('summary.next')}</span>
          <span className="summary__next-value">
            {next.title} · <span className="muted">{t('summary.est', { date: formatDate(next.date) })}</span>
          </span>
        </div>
      )}
    </section>
  )
}
