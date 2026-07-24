const TONE_CLASSES = {
  route: 'bg-route-100 text-route-700 dark:bg-route-700/20 dark:text-route-300',
  transit: 'bg-transit-100 text-transit-700 dark:bg-transit-700/20 dark:text-transit-300',
  alert: 'bg-alert-100 text-alert-600 dark:bg-alert-600/20 dark:text-alert-300',
  neutral: 'bg-surface-raised text-ink-muted dark:bg-surface-raised-dark dark:text-ink-muted-dark'
}

export default function Badge({ children, tone = 'neutral', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
