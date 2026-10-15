import { useState } from 'react'
import { SearchIcon } from './Icons.jsx'
import { normalizeTrackingNumber } from '../utils/lookup.js'
import { useI18n } from '../i18n/LanguageContext.jsx'

/**
 * Controlled tracking-number search form.
 * Calls onSubmit(value) and surfaces validation errors inline.
 */
export default function TrackingSearch({ initialValue = '', onSubmit, error, loading }) {
  const [value, setValue] = useState(initialValue)
  const { t } = useI18n()

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(value)
  }

  function handleChange(event) {
    setValue(normalizeTrackingNumber(event.target.value))
  }

  return (
    <form className="track-search" onSubmit={handleSubmit} noValidate>
      <div className={`track-search__field ${error ? 'is-invalid' : ''}`}>
        <span className="track-search__icon" aria-hidden="true">
          <SearchIcon width="20" height="20" />
        </span>
        <label className="sr-only" htmlFor="tracking-input">
          {t('search.label')}
        </label>
        <input
          id="tracking-input"
          name="tracking"
          className="track-search__input"
          type="text"
          inputMode="text"
          autoComplete="off"
          spellCheck="false"
          placeholder={t('search.placeholder')}
          value={value}
          onChange={handleChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'tracking-error' : undefined}
        />
        <button className="btn btn--primary track-search__button" type="submit" disabled={loading}>
          <SearchIcon width="18" height="18" />
          <span>{loading ? t('search.tracking') : t('cta.track')}</span>
        </button>
      </div>

      {error && (
        <p className="track-search__error" id="tracking-error" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}
