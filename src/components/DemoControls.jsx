import { useState } from 'react'
import { ClockIcon } from './Icons.jsx'

/**
 * Optional demonstration control. The live status always uses the real
 * current date; this lets reviewers preview how the schedule resolves on
 * other dates. It never changes the underlying shipment data.
 */
export default function DemoControls({ value, onChange, onReset, isLive, liveLabel }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="demo-controls">
      <button
        type="button"
        className="demo-controls__toggle"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <ClockIcon width="16" height="16" />
        {isLive ? `Live status · ${liveLabel}` : `Preview: ${liveLabel}`}
        <span className="demo-controls__chevron" aria-hidden="true">
          {open ? '▲' : '▼'}
        </span>
      </button>

      {open && (
        <div className="demo-controls__panel">
          <p className="demo-controls__hint">
            Status is derived from the real current date. Preview another date to see how the
            schedule resolves — this does not alter the shipment.
          </p>
          <div className="demo-controls__row">
            <label htmlFor="preview-date">Preview date</label>
            <input
              id="preview-date"
              type="date"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
            <button type="button" className="btn btn--ghost btn--sm" onClick={onReset}>
              Use today
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
