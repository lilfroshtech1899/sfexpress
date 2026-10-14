import { AlertIcon } from './Icons.jsx'

/**
 * Disclosure separating simulated demonstration milestones from
 * verified carrier updates.
 */
export default function Notice() {
  return (
    <aside className="notice" role="note">
      <span className="notice__icon" aria-hidden="true">
        <AlertIcon width="20" height="20" />
      </span>
      <div className="notice__body">
        <strong>Demonstration tracking data</strong>
        <p>
          This portal shows <em>simulated</em> milestone events generated from the supplied
          schedule. It is not connected to a live carrier-tracking service, so no real scans,
          locations or delivery confirmations are displayed. Delivery is only ever marked as
          complete once an explicit delivery confirmation is recorded.
        </p>
      </div>
    </aside>
  )
}
