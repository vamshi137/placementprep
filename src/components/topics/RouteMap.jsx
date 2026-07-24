import { Bus } from 'lucide-react'

const ROW_HEIGHT = 64
const AMPLITUDE = 46 // how far the route swings left/right
const CENTER_X = 130

/**
 * Renders topics as stops along a winding dotted route (bus-commute metaphor).
 * The bus marker sits at the first topic that isn't yet mastered — i.e.
 * "where you are on the journey" — or past the last stop if everything's mastered.
 */
export default function RouteMap({ topics, topicStats }) {
  const width = CENTER_X * 2
  const height = ROW_HEIGHT * topics.length + 40

  const statsByTopic = new Map(topicStats.map((s) => [s.topicId, s]))

  const points = topics.map((topic, i) => {
    const y = 30 + i * ROW_HEIGHT
    const swing = i % 2 === 0 ? -1 : 1
    const x = CENTER_X + swing * AMPLITUDE
    return { topic, x, y, stats: statsByTopic.get(topic.id) }
  })

  const currentIndex = points.findIndex((p) => (p.stats?.mastery ?? 0) < 65 && p.topic.status === 'available')
  const markerIndex = currentIndex === -1 ? Math.min(points.length - 1, topics.filter(t => t.status === 'available').length - 1) : currentIndex
  const marker = points[Math.max(markerIndex, 0)]

  const pathD = points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `Q ${CENTER_X} ${(points[i - 1].y + p.y) / 2}, ${p.x} ${p.y}`))
    .join(' ')

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} className="overflow-visible">
      <path
        d={pathD}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="1 14"
        strokeLinecap="round"
        className="text-ink-muted/40 dark:text-ink-muted-dark/40"
      />
      {points.map((p, i) => {
        const mastered = (p.stats?.mastery ?? 0) >= 65
        const attempted = (p.stats?.attempted ?? 0) > 0
        const available = p.topic.status === 'available'
        return (
          <g key={p.topic.id}>
            <circle
              cx={p.x}
              cy={p.y}
              r={10}
              className={
                !available
                  ? 'fill-surface-raised dark:fill-surface-raised-dark'
                  : mastered
                  ? 'fill-transit-500'
                  : attempted
                  ? 'fill-route-500'
                  : 'fill-surface dark:fill-surface-dark stroke-route-500'
              }
              strokeWidth={!available || mastered || attempted ? 0 : 2}
            />
            <text
              x={p.x + (i % 2 === 0 ? 20 : -20)}
              y={p.y + 4}
              textAnchor={i % 2 === 0 ? 'start' : 'end'}
              className="fill-ink dark:fill-ink-dark text-[11px] font-semibold font-body"
            >
              {p.topic.name}
            </text>
          </g>
        )
      })}
      {marker && (
        <g transform={`translate(${marker.x}, ${marker.y})`}>
          <circle r="16" className="fill-route-500" opacity="0.15" />
          <foreignObject x="-11" y="-11" width="22" height="22">
            <div className="w-full h-full rounded-full bg-route-500 flex items-center justify-center shadow-card">
              <Bus size={13} className="text-ink dark:text-base-dark" strokeWidth={2.5} />
            </div>
          </foreignObject>
        </g>
      )}
    </svg>
  )
}
