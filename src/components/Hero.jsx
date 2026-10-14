import TrackingSearch from './TrackingSearch.jsx'

export default function Hero({ onTrack, error, loading, initialValue }) {
  return (
    <section className="hero" id="track">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="hero__eyebrow">SF Express Korea · International Express</span>
          <h1 className="hero__title">Track your shipment in real time</h1>
          <p className="hero__subtitle">
            Enter your tracking number to follow your parcel's journey from South Korea to its
            destination, with clear milestone updates at every step.
          </p>
        </div>

        <div className="hero__search-card">
          <p className="hero__search-title">Track &amp; Trace</p>
          <TrackingSearch
            initialValue={initialValue}
            onSubmit={onTrack}
            error={error}
            loading={loading}
          />
        </div>

        <ul className="hero__features">
          <li>
            <strong>Express Delivery</strong>
            <span>Priority international handling</span>
          </li>
          <li>
            <strong>End-to-end visibility</strong>
            <span>Milestone status at every stage</span>
          </li>
          <li>
            <strong>Secure &amp; reliable</strong>
            <span>Tracked from origin to destination</span>
          </li>
        </ul>
      </div>
    </section>
  )
}
