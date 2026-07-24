import { Link } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { Lock } from 'lucide-react'
import Card from '../ui/Card.jsx'
import Badge from '../ui/Badge.jsx'

const TONE_TEXT = {
  route: 'text-route-500',
  transit: 'text-transit-500'
}
const TONE_BG = {
  route: 'bg-route-100 dark:bg-route-700/20',
  transit: 'bg-transit-100 dark:bg-transit-700/20'
}

export default function TopicCard({ topic, stats }) {
  const Icon = Icons[topic.icon] || Icons.BookOpen
  const isAvailable = topic.status === 'available'
  const mastery = stats?.mastery ?? 0

  const content = (
    <Card className={`p-4 flex items-center gap-4 ${isAvailable ? 'active:scale-[0.98] transition-transform' : 'opacity-60'}`}>
      <div
        className={`w-12 h-12 rounded-xl2 flex items-center justify-center shrink-0 ${TONE_BG[topic.color]}`}
      >
        <Icon size={22} className={TONE_TEXT[topic.color]} strokeWidth={2.25} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-display font-semibold text-sm truncate">{topic.name}</h3>
          {!isAvailable && <Lock size={12} className="text-ink-muted dark:text-ink-muted-dark shrink-0" />}
        </div>
        <p className="text-xs text-ink-muted dark:text-ink-muted-dark truncate mt-0.5">
          {topic.description}
        </p>
      </div>
      <div className="shrink-0 text-right">
        {isAvailable ? (
          <Badge tone={stats?.attempted ? 'route' : 'neutral'}>
            {stats?.attempted ? `${mastery}%` : 'Start'}
          </Badge>
        ) : (
          <Badge tone="neutral">Soon</Badge>
        )}
      </div>
    </Card>
  )

  if (!isAvailable) {
    return <div aria-disabled="true">{content}</div>
  }

  return (
    <Link to={`/topics/${topic.id}`} className="block">
      {content}
    </Link>
  )
}
