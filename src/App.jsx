import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ShipmentSummary from './components/ShipmentSummary.jsx'
import ProgressStepper from './components/ProgressStepper.jsx'
import Timeline from './components/Timeline.jsx'
import RouteMap from './components/RouteMap.jsx'
import ShipmentDetails from './components/ShipmentDetails.jsx'
import StatusBadge from './components/StatusBadge.jsx'
import DemoControls from './components/DemoControls.jsx'
import Services from './components/Services.jsx'
import Footer from './components/Footer.jsx'

import { lookupTracking } from './utils/lookup.js'
import { getTrackingView, formatDate } from './utils/tracking.js'
import { useI18n } from './i18n/LanguageContext.jsx'

function toDateInputValue(date) {
  const d = new Date(date)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export default function App() {
  const { t } = useI18n()
  const [activeShipment, setActiveShipment] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [now, setNow] = useState(() => new Date())

  const [liveMode, setLiveMode] = useState(true)
  const [previewDate, setPreviewDate] = useState(() => toDateInputValue(new Date()))

  const resultsRef = useRef(null)

  // Keep the "live" status current without a full reload.
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60 * 1000)
    return () => window.clearInterval(id)
  }, [])

  const referenceDate = liveMode ? now : new Date(`${previewDate}T12:00:00`)

  const view = useMemo(
    () => (activeShipment ? getTrackingView(activeShipment, referenceDate, t) : null),
    [activeShipment, referenceDate, t]
  )

  const handleTrack = useCallback(
    (value) => {
      setLoading(true)
      setError('')

      // Small simulated round-trip so the lookup feels realistic.
      window.setTimeout(() => {
        const result = lookupTracking(value, t)

        if (result.ok) {
          setActiveShipment(result.shipment)
          setLiveMode(true)
          setPreviewDate(toDateInputValue(new Date()))
          setError('')
          window.requestAnimationFrame(() => {
            resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          })
        } else {
          setActiveShipment(null)
          setError(result.reason)
        }
        setLoading(false)
      }, 400)
    },
    [t]
  )

  return (
    <div className="app" id="top">
      <a className="skip-link" href="#results">
        {t('skip')}
      </a>

      <Header />

      <main>
        <Hero initialValue="" onTrack={handleTrack} error={error} loading={loading} />

        {activeShipment && view && (
          <section className="results container" id="results" ref={resultsRef} aria-live="polite">
            <div className="results__head">
              <div>
                <span className="results__eyebrow">{t('results.eyebrow')}</span>
                <h2 className="results__title">{t('results.title')}</h2>
              </div>
              <DemoControls
                value={previewDate}
                onChange={(value) => {
                  setPreviewDate(value)
                  setLiveMode(false)
                }}
                onReset={() => {
                  setLiveMode(true)
                  setPreviewDate(toDateInputValue(new Date()))
                }}
                isLive={liveMode}
                liveLabel={formatDate(referenceDate)}
              />
            </div>

            <ShipmentSummary shipment={activeShipment} view={view} />

            <section className="card stepper-card" aria-labelledby="progress-heading">
              <header className="card__head">
                <h3 className="card__title" id="progress-heading">
                  {t('results.progress')}
                </h3>
                <span className="chip chip--ghost">{t('results.stages', { n: view.stages.length })}</span>
              </header>

              <ProgressStepper stages={view.stages} />

              <div className="timeline-card__legend">
                <span className="legend legend--completed">{t('legend.completed')}</span>
                <span className="legend legend--current">{t('legend.current')}</span>
                <span className="legend legend--pending">{t('legend.pending')}</span>
              </div>
            </section>

            <div className="results__grid">
              <div className="results__col results__col--main">
                <RouteMap shipment={activeShipment} view={view} />
                <ShipmentDetails shipment={activeShipment} view={view} />
              </div>

              <div className="results__col results__col--side">
                <section className="card timeline-card" aria-labelledby="timeline-heading">
                  <header className="card__head">
                    <h3 className="card__title" id="timeline-heading">
                      {t('results.timeline')}
                    </h3>
                    <StatusBadge tone={view.tone} label={view.statusLabel} size="sm" />
                  </header>

                  <Timeline stages={view.stages} />
                </section>
              </div>
            </div>
          </section>
        )}

        {!activeShipment && (
          <section className="results container results--empty" id="results" ref={resultsRef}>
            <div className="empty-state" role="status">
              <h2 className="empty-state__title">
                {error ? t('empty.notFound') : t('empty.title')}
              </h2>
              <p className="empty-state__text">{error || t('empty.text')}</p>
            </div>
          </section>
        )}

        <Services />
      </main>

      <Footer />
    </div>
  )
}
