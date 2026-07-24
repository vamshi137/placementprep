import { Link } from 'react-router-dom'
import { Flame, Target, ListChecks } from 'lucide-react'
import TopBar from '../components/layout/TopBar.jsx'
import Card from '../components/ui/Card.jsx'
import StatTile from '../components/ui/StatTile.jsx'
import ProgressBar from '../components/ui/ProgressBar.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import Button from '../components/ui/Button.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import topics from '../data/topics.json'

export default function ProgressPage() {
  const { overall, streak, topicStats } = useProgress()
  const availableTopics = topics.filter((t) => t.status === 'available')
  const hasActivity = overall.totalAttempted > 0

  return (
    <div className="pt-2">
      <TopBar title="Progress" subtitle="How your prep is tracking" />

      <div className="grid grid-cols-3 gap-3 mb-5">
        <StatTile icon={Flame} label="Streak" value={`${streak.current}d`} accentClass="text-route-500" />
        <StatTile icon={Target} label="Accuracy" value={`${overall.accuracy}%`} accentClass="text-transit-500" />
        <StatTile icon={ListChecks} label="Answered" value={overall.totalAttempted} accentClass="text-route-500" />
      </div>

      {!hasActivity ? (
        <Card>
          <EmptyState
            icon={Target}
            title="No attempts yet"
            body="Complete a quiz and your mastery breakdown will show up here, topic by topic."
            action={
              <Button as={Link} to="/topics" variant="primary">
                Browse topics
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="flex flex-col gap-2.5">
          {availableTopics.map((topic) => {
            const stats = topicStats.find((s) => s.topicId === topic.id)
            return (
              <Card key={topic.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm">{topic.name}</span>
                  <span className="text-sm font-mono text-ink-muted dark:text-ink-muted-dark">
                    {stats?.mastery ?? 0}%
                  </span>
                </div>
                <ProgressBar
                  value={stats?.mastery ?? 0}
                  colorClass={(stats?.mastery ?? 0) >= 65 ? 'bg-transit-500' : 'bg-route-500'}
                />
                <p className="text-xs text-ink-muted dark:text-ink-muted-dark mt-2">
                  {stats?.attempted ?? 0} attempted · {stats?.accuracy ?? 0}% accuracy
                </p>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
