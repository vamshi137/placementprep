import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

export default function TopBar({ title, subtitle, showBack = false, right = null }) {
  const navigate = useNavigate()
  return (
    <header className="sticky top-0 z-20 bg-base/90 dark:bg-base-dark/90 backdrop-blur safe-top">
      <div className="max-w-md mx-auto px-5 pt-4 pb-3 flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="w-9 h-9 -ml-2 flex items-center justify-center rounded-full hover:bg-surface-raised dark:hover:bg-surface-raised-dark"
          >
            <ChevronLeft size={22} />
          </button>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="font-display font-bold text-xl leading-tight truncate">{title}</h1>
          {subtitle && (
            <p className="text-xs text-ink-muted dark:text-ink-muted-dark truncate">{subtitle}</p>
          )}
        </div>
        {right}
      </div>
    </header>
  )
}
