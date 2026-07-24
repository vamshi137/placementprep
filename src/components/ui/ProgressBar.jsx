export default function ProgressBar({ value = 0, colorClass = 'bg-route-500', trackClass = '', height = 'h-2' }) {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div
      className={`w-full ${height} rounded-full bg-surface-raised dark:bg-surface-raised-dark overflow-hidden ${trackClass}`}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full ${colorClass} transition-all duration-500 ease-out`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
