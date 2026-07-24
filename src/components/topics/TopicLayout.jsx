import * as Icons from 'lucide-react'
import Badge from '../ui/Badge.jsx'

const TONE_TEXT = { route: 'text-route-500', transit: 'text-transit-500' }
const TONE_BG = {
  route: 'bg-route-100 dark:bg-route-700/20',
  transit: 'bg-transit-100 dark:bg-transit-700/20'
}

export default function TopicLayout({ topic, activeTab, onTabChange, tabs, children }) {
  const Icon = Icons[topic.icon] || Icons.BookOpen

  return (
    <div>
      <div className="flex items-start gap-4 mb-5">
        <div className={`w-14 h-14 rounded-xl2 flex items-center justify-center shrink-0 ${TONE_BG[topic.color]}`}>
          <Icon size={26} className={TONE_TEXT[topic.color]} strokeWidth={2.25} />
        </div>
        <div className="min-w-0">
          <Badge tone={topic.color}>{topic.category}</Badge>
          <p className="text-sm text-ink-muted dark:text-ink-muted-dark mt-1.5">{topic.description}</p>
        </div>
      </div>

      <div className="flex gap-1 p-1 rounded-xl bg-surface-raised dark:bg-surface-raised-dark mb-5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === tab.id
                ? 'bg-surface dark:bg-surface-dark shadow-card dark:shadow-card-dark'
                : 'text-ink-muted dark:text-ink-muted-dark'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {children}
    </div>
  )
}
