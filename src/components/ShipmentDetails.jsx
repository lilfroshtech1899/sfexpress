import StatusBadge from './StatusBadge.jsx'
import { formatDate } from '../utils/tracking.js'
import { useI18n } from '../i18n/LanguageContext.jsx'

function Row({ label, children }) {
  return (
    <div className="details__row">
      <dt className="details__label">{label}</dt>
      <dd className="details__value">{children}</dd>
    </div>
  )
}

export default function ShipmentDetails({ shipment, view }) {
  const { t, trPlace } = useI18n()

  return (
    <section className="card details" aria-labelledby="details-heading">
      <header className="card__head">
        <h3 className="card__title" id="details-heading">
          {t('details.title')}
        </h3>
      </header>

      <dl className="details__grid">
        <Row label={t('details.trackingNumber')}>
          <span className="mono">{shipment.trackingNumber}</span>
        </Row>
        <Row label={t('details.courier')}>{shipment.courier}</Row>

        <Row label={t('details.sender')}>{shipment.sender}</Row>
        <Row label={t('details.recipient')}>{shipment.recipient}</Row>

        <Row label={t('details.origin')}>
          {trPlace(shipment.originCity)}, {trPlace(shipment.originCountry)}
        </Row>
        <Row label={t('details.destination')}>
          {trPlace(shipment.destinationCity)}, {trPlace(shipment.destinationCountry)}
        </Row>

        <Row label={t('details.product')}>
          <span className="details__products">{t('product.summary')}</span>
        </Row>
        <Row label={t('details.method')}>{t('method.express')}</Row>

        <Row label={t('details.shippingDate')}>{formatDate(view.schedule.shippingDate)}</Row>
        <Row label={t('details.estimated')}>{formatDate(view.schedule.expectedDeliveryDate)}</Row>

        <Row label={t('details.status')}>
          <StatusBadge tone={view.tone} label={view.statusLabel} size="sm" />
        </Row>
        <Row label={t('details.location')}>{view.location}</Row>

        <Row label={t('details.lastUpdate')}>
          <span>{view.lastUpdateLabel}</span>
        </Row>
        <Row label={t('details.service')}>{t('service.intl')}</Row>
      </dl>
    </section>
  )
}
