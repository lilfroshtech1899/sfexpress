import { REGIONS, LANGUAGES } from '../i18n/regions.js'
import { useI18n } from '../i18n/LanguageContext.jsx'

/**
 * Region + language switcher shown in the top bar.
 * Selecting a region switches the whole portal to that region's primary
 * language; the language menu then offers every language available there
 * (English is always included).
 */
export default function RegionSwitcher() {
  const { regionIndex, lang, langs, t, selectRegion, selectLang } = useI18n()

  return (
    <span className="topbar__lang">
      <label className="sr-only" htmlFor="region-select">
        {t('lang.region')}
      </label>
      <select
        id="region-select"
        className="topbar__select"
        value={regionIndex}
        onChange={(event) => selectRegion(Number(event.target.value))}
        title={t('lang.region')}
      >
        {REGIONS.map((region, index) => (
          <option key={region.label} value={index}>
            {region.label}
          </option>
        ))}
      </select>

      <label className="sr-only" htmlFor="language-select">
        {t('lang.language')}
      </label>
      <select
        id="language-select"
        className="topbar__select topbar__select--lang"
        value={lang}
        onChange={(event) => selectLang(event.target.value)}
        title={t('lang.language')}
      >
        {langs.map((code) => (
          <option key={code} value={code}>
            {LANGUAGES[code] || code}
          </option>
        ))}
      </select>
    </span>
  )
}
