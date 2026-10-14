import { STAGE_ICONS, CheckIcon } from './Icons.jsx'
import { formatShortDate } from '../utils/tracking.js'

/**
 * Horizontal milestone rail (scrolls on small screens).
 * Green = completed, red = current, grey = pending.
 */
export default function ProgressStepper({ stages }) {
  return (
    <div className="stepper-wrap" role="group" aria-label="Shipment milestone progress">
      <ol className="stepper">
        {stages.map((stage, index) => {
          const Icon = STAGE_ICONS[stage.key] || CheckIcon
          return (
            <li key={stage.key} className={`stepper__item is-${stage.state}`}>
              <span className="stepper__rail" aria-hidden="true" />
              <span className="stepper__dot">
                {stage.state === 'completed' ? (
                  <CheckIcon width="18" height="18" />
                ) : (
                  <Icon width="18" height="18" />
                )}
              </span>
              <span className="stepper__label">{stage.title}</span>
              <span className="stepper__date">{formatShortDate(stage.date)}</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
