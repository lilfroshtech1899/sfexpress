import TrackingSearch from './TrackingSearch.jsx'
import { useI18n } from '../i18n/LanguageContext.jsx'

export default function Hero({ onTrack, error, loading, initialValue }) {
  const { t } = useI18n()

  return (
    <section className="hero" id="track">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="hero__eyebrow">{t('hero.eyebrow')}</span>
          <h1 className="hero__title">{t('hero.title')}</h1>
          <p className="hero__subtitle">{t('hero.subtitle')}</p>
        </div>

        <div className="hero__search-card">
          <p className="hero__search-title">{t('hero.searchTitle')}</p>
          <TrackingSearch
            initialValue={initialValue}
            onSubmit={onTrack}
            error={error}
            loading={loading}
          />
        </div>

        <ul className="hero__features">
          <li>
            <strong>{t('hero.f1.title')}</strong>
            <span>{t('hero.f1.text')}</span>
          </li>
          <li>
            <strong>{t('hero.f2.title')}</strong>
            <span>{t('hero.f2.text')}</span>
          </li>
          <li>
            <strong>{t('hero.f3.title')}</strong>
            <span>{t('hero.f3.text')}</span>
          </li>
        </ul>
      </div>
    </section>
  )
}
