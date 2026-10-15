import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { REGIONS, LANGUAGES, LANG_LOCALE, DEFAULT_REGION_INDEX } from './regions.js'
import translations from './translations.js'
import { setDateLocale } from '../utils/tracking.js'

const STORAGE_KEY = 'sf-korea-prefs'

/** Maps an English place name (as stored in shipment data) to a translation key. */
const PLACE_KEYS = {
  'South Korea': 'country.southKorea',
  Finland: 'country.finland',
  Seoul: 'city.seoul',
  Incheon: 'city.incheon',
  Helsinki: 'city.helsinki',
  'Seoul, South Korea': 'loc.seoulKR',
  'Incheon, South Korea': 'loc.incheonKR',
  'South Korea → Finland': 'loc.routeKRFI'
}

const LanguageContext = createContext(null)

function interpolate(template, vars) {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (match, name) =>
    Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match
  )
}

function readStoredState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    const regionIndex =
      Number.isInteger(parsed.regionIndex) && REGIONS[parsed.regionIndex]
        ? parsed.regionIndex
        : DEFAULT_REGION_INDEX
    const region = REGIONS[regionIndex]
    const lang = region.langs.includes(parsed.lang) ? parsed.lang : region.langs[0]
    return { regionIndex, lang }
  } catch {
    return null
  }
}

export function LanguageProvider({ children }) {
  const [state, setState] = useState(() => {
    return (
      readStoredState() || {
        regionIndex: DEFAULT_REGION_INDEX,
        lang: REGIONS[DEFAULT_REGION_INDEX].langs[0]
      }
    )
  })

  const { regionIndex, lang } = state
  const region = REGIONS[regionIndex]

  const t = useCallback(
    (key, vars) => {
      const dictionary = translations[lang] || translations.en
      const template = dictionary[key] ?? translations.en[key] ?? key
      return interpolate(template, vars)
    },
    [lang]
  )

  /** Translate a place value coming from the shipment data. */
  const trPlace = useCallback(
    (value) => {
      const key = PLACE_KEYS[value]
      return key ? t(key) : value
    },
    [t]
  )

  const selectRegion = useCallback((index) => {
    const next = REGIONS[index]
    if (!next) return
    setState({ regionIndex: index, lang: next.langs[0] })
  }, [])

  const selectLang = useCallback((nextLang) => {
    setState((prev) => (REGIONS[prev.regionIndex].langs.includes(nextLang) ? { ...prev, lang: nextLang } : prev))
  }, [])

  useEffect(() => {
    setDateLocale(LANG_LOCALE[lang] || 'en-GB')
    document.documentElement.lang = lang
    const dictionary = translations[lang] || translations.en
    if (dictionary['meta.title']) document.title = dictionary['meta.title']
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription && dictionary['meta.description']) {
      metaDescription.setAttribute('content', dictionary['meta.description'])
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ regionIndex, lang }))
    } catch {
      /* storage unavailable — ignore */
    }
  }, [regionIndex, lang])

  const value = useMemo(
    () => ({
      t,
      trPlace,
      lang,
      region,
      regionIndex,
      langs: region.langs,
      selectRegion,
      selectLang,
      languageName: LANGUAGES[lang] || lang
    }),
    [t, trPlace, lang, region, regionIndex, selectRegion, selectLang]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useI18n() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useI18n must be used within a LanguageProvider')
  return context
}
