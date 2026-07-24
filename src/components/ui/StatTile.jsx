import Card from './Card.jsx'

export default function StatTile({ icon: Icon, label, value, accentClass = 'text-route-500' }) {
  return (
    <Card className="p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted dark:text-ink-muted-dark">
          {label}
        </span>
        {Icon && <Icon size={16} className={accentClass} strokeWidth={2.5} />}
      </div>
      <span className="font-display text-2xl font-bold">{value}</span>
    </Card>
  )
}
