import { useEffect, useRef, useState } from 'react'
import { Timer as TimerIcon } from 'lucide-react'

/**
 * Counts up (not down) so a slow bus-wifi moment never force-submits an answer —
 * it just quietly logs how long the question took, for the Progress page.
 */
export default function Timer({ questionKey, onTick }) {
  const [seconds, setSeconds] = useState(0)
  const tickRef = useRef(onTick)
  tickRef.current = onTick

  useEffect(() => {
    setSeconds(0)
    const id = setInterval(() => {
      setSeconds((s) => {
        const next = s + 1
        tickRef.current?.(next)
        return next
      })
    }, 1000)
    return () => clearInterval(id)
  }, [questionKey])

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  return (
    <div className="flex items-center gap-1.5 text-ink-muted dark:text-ink-muted-dark">
      <TimerIcon size={14} />
      <span className="font-mono text-xs tabular-nums">{mm}:{ss}</span>
    </div>
  )
}
