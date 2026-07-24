import { Link } from 'react-router-dom'
import { PartyPopper, RotateCcw } from 'lucide-react'
import Card from '../ui/Card.jsx'
import Button from '../ui/Button.jsx'
import ProgressBar from '../ui/ProgressBar.jsx'

export default function QuizResult({ correctCount, total, topicId, topicName, onRetry }) {
  const pct = total ? Math.round((correctCount / total) * 100) : 0
  const message =
    pct >= 80 ? 'Excellent run — that topic is in good shape.' : pct >= 50 ? 'Solid progress. A bit more practice will lock it in.' : 'Good first pass — revisit this one soon while it\'s fresh.'
  const isWeak = pct < 70

  return (
    <Card className="p-6 text-center flex flex-col items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-route-100 dark:bg-route-700/20 flex items-center justify-center">
        <PartyPopper size={26} className="text-route-500" />
      </div>
      <div>
        <h2 className="font-display font-bold text-2xl">{pct}%</h2>
        <p className="text-sm text-ink-muted dark:text-ink-muted-dark mt-1">
          {correctCount} of {total} correct on {topicName}
        </p>
      </div>
      <div className="w-full">
        <ProgressBar value={pct} colorClass={pct >= 65 ? 'bg-transit-500' : 'bg-route-500'} />
      </div>
      <p className="text-sm">{message}</p>
      {isWeak && (
        <div className="w-full px-4 py-2.5 rounded-xl bg-alert-100 dark:bg-alert-600/20 text-alert-600 dark:text-alert-300 text-xs font-semibold">
          Marked as Weak (below 70%) — revisit this topic soon.
        </div>
      )}
      <div className="flex gap-3 w-full mt-2">
        <Button variant="secondary" onClick={onRetry} className="flex-1">
          <RotateCcw size={16} /> Retry
        </Button>
        <Button as={Link} to={`/topics/${topicId}`} variant="primary" className="flex-1">
          Done
        </Button>
      </div>
    </Card>
  )
}
