import { Link } from 'react-router-dom'
import { Flame, Target, AlertTriangle, ArrowRight, Bus } from 'lucide-react'
import TopBar from '../components/layout/TopBar.jsx'
import Card from '../components/ui/Card.jsx'
import StatTile from '../components/ui/StatTile.jsx'
import Button from '../components/ui/Button.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import topics from '../data/topics.json'

export default function Dashboard() {
  const { streak, overall, weakAreas, sessionWeakTopicIds, topicStats } = useProgress()
  const weakCount = new Set([...sessionWeakTopicIds, ...weakAreas.map((w) => w.topicId)]).size

  const availableTopics = topics.filter((t) => t.status === 'available')
  const nextTopic =
    availableTopics.find((t) => {
      const s = topicStats.find((s) => s.topicId === t.id)
      return !s || s.mastery < 65
    }) || availableTopics[0]

  const hasActivity = overall.totalAttempted > 0

  return (
    <div className="pt-2">
      <TopBar title="PlacementPrep" subtitle="Your commute, your prep." />

      <Card className="p-5 mb-4 bg-route-500 !shadow-none">
        <div className="flex items-center gap-2 text-ink mb-1">
          <Bus size={18} />
          <span className="text-xs font-semibold uppercase tracking-wide">Today's stop</span>
        </div>
        <h2 className="font-display font-bold text-lg text-ink mb-3">
          {nextTopic ? nextTopic.name : 'All caught up'}
        </h2>
        {nextTopic && (
          <Link
            to={`/topics/${nextTopic.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-semibold text-sm bg-ink/90 text-route-50 hover:bg-ink transition-colors"
          >
            Continue journey <ArrowRight size={16} />
          </Link>
        )}
      </Card>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <StatTile icon={Flame} label="Streak" value={`${streak.current}d`} accentClass="text-route-500" />
        <StatTile icon={Target} label="Accuracy" value={`${overall.accuracy}%`} accentClass="text-transit-500" />
        <StatTile
          icon={AlertTriangle}
          label="Weak areas"
          value={weakCount}
          accentClass="text-alert-500"
        />
      </div>

      {!hasActivity && (
        <Card>
          <EmptyState
            icon={Bus}
            title="First stop coming up"
            body="Pick a topic and answer a few questions — your dashboard fills in as you go."
            action={
              <Button as={Link} to="/topics" variant="primary" className="mt-1">
                Browse topics
              </Button>
            }
          />
        </Card>
      )}

      {weakCount > 0 && (
        <Link to="/weak-areas" className="block">
          <Card className="p-4 flex items-center justify-between border border-alert-300/40">
            <div>
              <p className="text-sm font-semibold text-alert-600 dark:text-alert-300">Needs attention</p>
              <p className="text-xs text-ink-muted dark:text-ink-muted-dark mt-0.5">
                {weakCount} topic{weakCount > 1 ? 's' : ''} flagged weak
              </p>
            </div>
            <ArrowRight size={18} className="text-alert-500" />
          </Card>
        </Link>
      )}
    </div>
  )
}
