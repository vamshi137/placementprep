export default function EmptyState({ icon: Icon, title, body, action }) {
  return (
    <div className="flex flex-col items-center text-center gap-3 py-12 px-6">
      {Icon && (
        <div className="w-12 h-12 rounded-full bg-surface-raised dark:bg-surface-raised-dark flex items-center justify-center">
          <Icon size={22} className="text-ink-muted dark:text-ink-muted-dark" />
        </div>
      )}
      <h3 className="font-display font-semibold text-base">{title}</h3>
      <p className="text-sm text-ink-muted dark:text-ink-muted-dark max-w-xs">{body}</p>
      {action}
    </div>
  )
}
