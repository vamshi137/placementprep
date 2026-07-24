import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowRight, ThumbsUp } from 'lucide-react'
import TopBar from '../components/layout/TopBar.jsx'
import Card from '../components/ui/Card.jsx'
import Badge from '../components/ui/Badge.jsx'
import ProgressBar from '../components/ui/ProgressBar.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import topics from '../data/topics.json'

export default function WeakAreas() {
  const { weakAreas, sessionWeakTopicIds, sessions, topicStats } = useProgress()

  // Merge two signals: (1) latest-quiz accuracy under 70%, (2) overall mastery
  // under 65% with enough history. A topic can appear from either signal.
  const combinedIds = new Set([...sessionWeakTopicIds, ...weakAreas.map((w) => w.topicId)])
  const rows = [...combinedIds]
    .map((topicId) => {
      const topic = topics.find((t) => t.id === topicId)
      if (!topic) return null
      const session = sessions[topicId]
      const stat = topicStats.find((s) => s.topicId === topicId)
      const reason = session && session.accuracy < 70
        ? `Last quiz: ${session.accuracy}%`
        : `Overall mastery: ${stat?.mastery ?? 0}%`
      const barValue = session && session.accuracy < 70 ? session.accuracy : stat?.mastery ?? 0
      return { topic, reason, barValue }
    })
    .filter(Boolean)
    .sort((a, b) => a.barValue - b.barValue)

  return (
    <div className="pt-2">
      <TopBar title="Weak areas" showBack subtitle="Latest quiz below 70%, or low overall mastery" />

      {rows.length === 0 ? (
        <Card>
          <EmptyState
            icon={ThumbsUp}
            title="Nothing flagged"
            body="Score below 70% on any quiz, or fall under 65% overall mastery after a few attempts, and a topic shows up here first."
          />
        </Card>
      ) : (
        <div className="flex flex-col gap-2.5">
          {rows.map(({ topic, reason, barValue }) => (
            <Link key={topic.id} to={`/topics/${topic.id}`}>
              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm flex items-center gap-1.5">
                    <AlertTriangle size={14} className="text-alert-500" />
                    {topic.name}
                  </span>
                  <ArrowRight size={16} className="text-ink-muted dark:text-ink-muted-dark" />
                </div>
                <ProgressBar value={barValue} colorClass="bg-alert-500" />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-ink-muted dark:text-ink-muted-dark">{reason}</p>
                  <Badge tone="alert">Weak</Badge>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
