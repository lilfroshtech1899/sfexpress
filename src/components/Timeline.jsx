import { STAGE_ICONS, CheckIcon, ClockIcon } from './Icons.jsx'

const STATE_LABEL = {
  completed: 'Completed',
  current: 'Current stage',
  pending: 'Upcoming'
}

/**
 * Vertical tracking timeline with connector line, stage icons,
 * timestamps, state labels and explanatory messages.
 */
export default function Timeline({ stages }) {
  return (
    <ol className="timeline">
      {stages.map((stage) => {
        const Icon = STAGE_ICONS[stage.key] || ClockIcon
        return (
          <li key={stage.key} className={`timeline__item is-${stage.state}`}>
            <div className="timeline__rail" aria-hidden="true">
              <span className="timeline__node">
                {stage.state === 'completed' ? (
                  <CheckIcon width="18" height="18" />
                ) : (
                  <Icon width="18" height="18" />
                )}
              </span>
            </div>

            <div className="timeline__body">
              <div className="timeline__head">
                <h4 className="timeline__title">{stage.title}</h4>
                <span className={`timeline__state timeline__state--${stage.state}`}>
                  {STATE_LABEL[stage.state]}
                </span>
              </div>

              <p className="timeline__message">{stage.description}</p>

              <div className="timeline__meta">
                <span className="timeline__time">
                  {stage.timestampKind === 'recorded' ? 'Recorded' : 'Estimated'}: {stage.timestampLabel}
                </span>
                {stage.location && <span className="timeline__location">{stage.location}</span>}
              </div>

              {stage.timestampKind === 'estimated' && (
                <span className="timeline__tag">Scheduled milestone</span>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
