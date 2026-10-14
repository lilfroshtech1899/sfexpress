import { PlaneIcon, ArrowRightIcon } from './Icons.jsx'

/**
 * Simple route visualization: origin country → destination country.
 */
export default function RouteMap({ shipment, view }) {
  const progress = Math.max(6, Math.min(100, view.progressPercent))

  return (
    <section className="card route" aria-labelledby="route-heading">
      <header className="card__head">
        <h3 className="card__title" id="route-heading">
          Shipping route
        </h3>
        <span className="chip chip--ghost">{shipment.deliveryMethod}</span>
      </header>

      <div className="route__track">
        <div className="route__line" aria-hidden="true">
          <span className={`route__line-fill tone-${view.tone}`} style={{ width: `${progress}%` }} />
          <span className={`route__plane tone-${view.tone}`} style={{ left: `${progress}%` }}>
            <PlaneIcon width="20" height="20" />
          </span>
        </div>

        <div className="route__points">
          <div className="route__point">
            <span className="route__dot route__dot--origin" aria-hidden="true" />
            <span className="route__country">{shipment.originCountry}</span>
            <span className="route__city">{shipment.originCity}</span>
          </div>
          <div className="route__arrow" aria-hidden="true">
            <ArrowRightIcon width="18" height="18" />
          </div>
          <div className="route__point route__point--end">
            <span className="route__dot route__dot--dest" aria-hidden="true" />
            <span className="route__country">{shipment.destinationCountry}</span>
            <span className="route__city">{shipment.destinationCity}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
