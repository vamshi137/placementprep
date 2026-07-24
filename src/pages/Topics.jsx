import TopBar from '../components/layout/TopBar.jsx'
import Card from '../components/ui/Card.jsx'
import TopicCard from '../components/topics/TopicCard.jsx'
import RouteMap from '../components/topics/RouteMap.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import topics from '../data/topics.json'

export default function Topics() {
  const { topicStats } = useProgress()

  const byCategory = topics.reduce((acc, t) => {
    acc[t.category] = acc[t.category] || []
    acc[t.category].push(t)
    return acc
  }, {})

  return (
    <div className="pt-2">
      <TopBar title="Your route" subtitle={`${topics.length} topics on the map`} />

      <Card className="p-4 mb-5">
        <RouteMap topics={topics} topicStats={topicStats} />
      </Card>

      {Object.entries(byCategory).map(([category, list]) => (
        <div key={category} className="mb-5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-muted dark:text-ink-muted-dark mb-2 px-1">
            {category}
          </h2>
          <div className="flex flex-col gap-2.5">
            {list.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                stats={topicStats.find((s) => s.topicId === topic.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
