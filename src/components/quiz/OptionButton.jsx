import { Check, X } from 'lucide-react'

export default function OptionButton({ label, index, state, onClick, disabled }) {
  // state: 'idle' | 'selected' | 'correct' | 'incorrect' | 'reveal-correct'
  const base =
    'w-full text-left px-4 py-3.5 rounded-xl border-2 flex items-center justify-between gap-3 transition-colors duration-150 font-medium text-sm'

  const styles = {
    idle: 'border-transparent bg-surface-raised dark:bg-surface-raised-dark hover:border-route-300',
    selected: 'border-route-500 bg-route-50 dark:bg-route-700/10',
    correct: 'border-transit-500 bg-transit-100 dark:bg-transit-700/20 text-transit-700 dark:text-transit-300',
    incorrect: 'border-alert-500 bg-alert-100 dark:bg-alert-600/20 text-alert-600 dark:text-alert-300',
    'reveal-correct': 'border-transit-500 bg-transit-100 dark:bg-transit-700/20 text-transit-700 dark:text-transit-300'
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles[state] || styles.idle} disabled:cursor-default`}
    >
      <span className="flex items-center gap-3">
        <span className="w-6 h-6 rounded-full bg-surface dark:bg-surface-dark flex items-center justify-center text-xs font-bold shrink-0">
          {String.fromCharCode(65 + index)}
        </span>
        {label}
      </span>
      {state === 'correct' || state === 'reveal-correct' ? (
        <Check size={18} className="shrink-0" />
      ) : state === 'incorrect' ? (
        <X size={18} className="shrink-0" />
      ) : null}
    </button>
  )
}
