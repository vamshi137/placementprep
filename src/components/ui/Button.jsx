const VARIANTS = {
  primary:
    'bg-route-500 text-ink dark:text-base-dark hover:bg-route-600 active:bg-route-700 shadow-sm',
  secondary:
    'bg-surface-raised dark:bg-surface-raised-dark text-ink dark:text-ink-dark hover:brightness-95 dark:hover:brightness-110',
  ghost: 'bg-transparent text-ink dark:text-ink-dark hover:bg-surface-raised dark:hover:bg-surface-raised-dark',
  danger: 'bg-alert-500 text-white hover:bg-alert-600'
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  as: Tag = 'button',
  ...props
}) {
  return (
    <Tag
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-semibold text-sm transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
