import { CheckIcon, ClockIcon, AlertIcon, TruckIcon } from './Icons.jsx'

const ICONS = {
  info: ClockIcon,
  current: TruckIcon,
  done: CheckIcon,
  warn: AlertIcon,
  pending: ClockIcon
}

/**
 * Coloured status pill. `tone` maps to a semantic colour class
 * (done = green, current = red, warn = amber, pending = grey).
 */
export default function StatusBadge({ tone = 'pending', label, size = 'md', icon = true }) {
  const Icon = ICONS[tone] || ClockIcon
  return (
    <span className={`badge badge--${tone} badge--${size}`} role="status">
      {icon && <Icon width="16" height="16" className="badge__icon" />}
      <span className="badge__label">{label}</span>
    </span>
  )
}
