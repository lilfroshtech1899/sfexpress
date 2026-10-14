import { PlaneIcon, TruckIcon, PackageIcon, GlobeIcon } from './Icons.jsx'

const SERVICES = [
  {
    icon: PlaneIcon,
    title: 'International Express',
    text: 'Time-definite cross-border delivery with priority customs handling.'
  },
  {
    icon: TruckIcon,
    title: 'Express Delivery',
    text: 'Fast, tracked door-to-door delivery for time-critical shipments.'
  },
  {
    icon: PackageIcon,
    title: 'E-commerce Logistics',
    text: 'Scalable fulfilment and last-mile delivery for online retailers.'
  },
  {
    icon: GlobeIcon,
    title: 'Global Network',
    text: 'Connected coverage reaching destinations across Europe and beyond.'
  }
]

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <header className="section-head">
          <span className="section-head__eyebrow">Our services</span>
          <h2 className="section-head__title" id="network">
            Delivery built for international reliability
          </h2>
          <p className="section-head__text">
            From origin pickup in South Korea to final delivery in Finland, every shipment is handled
            with the same care and visibility.
          </p>
        </header>

        <div className="services__grid">
          {SERVICES.map(({ icon: Icon, title, text }) => (
            <article key={title} className="service-card">
              <span className="service-card__icon" aria-hidden="true">
                <Icon width="24" height="24" />
              </span>
              <h3 className="service-card__title">{title}</h3>
              <p className="service-card__text">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
