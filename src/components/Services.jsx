import { PlaneIcon, TruckIcon, PackageIcon, GlobeIcon } from './Icons.jsx'
import { useI18n } from '../i18n/LanguageContext.jsx'

const SERVICES = [
  { icon: PlaneIcon, titleKey: 'services.s1.title', textKey: 'services.s1.text' },
  { icon: TruckIcon, titleKey: 'services.s2.title', textKey: 'services.s2.text' },
  { icon: PackageIcon, titleKey: 'services.s3.title', textKey: 'services.s3.text' },
  { icon: GlobeIcon, titleKey: 'services.s4.title', textKey: 'services.s4.text' }
]

export default function Services() {
  const { t } = useI18n()

  return (
    <section className="services" id="services">
      <div className="container">
        <header className="section-head">
          <span className="section-head__eyebrow">{t('services.eyebrow')}</span>
          <h2 className="section-head__title" id="network">
            {t('services.title')}
          </h2>
          <p className="section-head__text">{t('services.text')}</p>
        </header>

        <div className="services__grid">
          {SERVICES.map(({ icon: Icon, titleKey, textKey }) => (
            <article key={titleKey} className="service-card">
              <span className="service-card__icon" aria-hidden="true">
                <Icon width="24" height="24" />
              </span>
              <h3 className="service-card__title">{t(titleKey)}</h3>
              <p className="service-card__text">{t(textKey)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
