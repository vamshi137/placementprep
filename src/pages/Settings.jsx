import { useState } from 'react'
import { Moon, Sun, Trash2, Info } from 'lucide-react'
import TopBar from '../components/layout/TopBar.jsx'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { useProgress } from '../context/ProgressContext.jsx'

export default function Settings() {
  const { theme, toggleTheme } = useTheme()
  const { clearAllProgress } = useProgress()
  const [confirmingReset, setConfirmingReset] = useState(false)

  const handleReset = () => {
    if (!confirmingReset) {
      setConfirmingReset(true)
      return
    }
    clearAllProgress()
    setConfirmingReset(false)
  }

  return (
    <div className="pt-2">
      <TopBar title="Settings" />

      <Card className="p-4 flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {theme === 'dark' ? <Moon size={18} className="text-route-500" /> : <Sun size={18} className="text-route-500" />}
          <div>
            <p className="text-sm font-semibold">Dark mode</p>
            <p className="text-xs text-ink-muted dark:text-ink-muted-dark">Easier on the eyes for night commutes</p>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          role="switch"
          aria-checked={theme === 'dark'}
          className={`w-12 h-7 rounded-full flex items-center px-1 transition-colors ${
            theme === 'dark' ? 'bg-route-500 justify-end' : 'bg-surface-raised dark:bg-surface-raised-dark justify-start'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-white shadow" />
        </button>
      </Card>

      <Card className="p-4 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <Trash2 size={18} className="text-alert-500" />
          <div>
            <p className="text-sm font-semibold">Reset progress</p>
            <p className="text-xs text-ink-muted dark:text-ink-muted-dark">
              Clears all attempts, streaks and bookmarks on this device
            </p>
          </div>
        </div>
        <Button
          variant={confirmingReset ? 'danger' : 'secondary'}
          onClick={handleReset}
          className="w-full"
        >
          {confirmingReset ? 'Tap again to confirm' : 'Reset all progress'}
        </Button>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <Info size={18} className="text-ink-muted dark:text-ink-muted-dark" />
          <div>
            <p className="text-sm font-semibold">PlacementPrep</p>
            <p className="text-xs text-ink-muted dark:text-ink-muted-dark">
              All data stays on this device — no account, no backend.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
