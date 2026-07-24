import { NavLink } from 'react-router-dom'
import { Home, Map, TrendingUp, RotateCcw, Settings } from 'lucide-react'

const ITEMS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/topics', label: 'Topics', icon: Map },
  { to: '/progress', label: 'Progress', icon: TrendingUp },
  { to: '/revision', label: 'Revision', icon: RotateCcw },
  { to: '/settings', label: 'Settings', icon: Settings }
]

export default function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-30 bg-surface/95 dark:bg-surface-dark/95 backdrop-blur border-t border-black/5 dark:border-white/5 safe-bottom"
      aria-label="Primary"
    >
      <ul className="flex justify-between max-w-md mx-auto px-2">
        {ITEMS.map(({ to, label, icon: Icon, end }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition-colors ${
                  isActive
                    ? 'text-route-600 dark:text-route-500'
                    : 'text-ink-muted dark:text-ink-muted-dark'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
