import { Link } from 'react-router-dom'
import { BookmarkCheck, RotateCcw, Sparkles } from 'lucide-react'
import TopBar from '../components/layout/TopBar.jsx'
import Card from '../components/ui/Card.jsx'
import Badge from '../components/ui/Badge.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import { findQuestionById } from '../utils/loadQuestions.js'
import topics from '../data/topics.json'

function ReviewCard({ questionId }) {
  const q = findQuestionById(questionId)
  if (!q) return null
  const topic = topics.find((t) => t.id === q.topicId)

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <Badge tone={topic?.color || 'neutral'}>{topic?.name || 'Unknown topic'}</Badge>
        <Link to={`/topics/${q.topicId}/quiz`} className="text-ink-muted dark:text-ink-muted-dark">
          <RotateCcw size={14} />
        </Link>
      </div>
      <p className="text-sm font-medium mb-2">{q.question}</p>
      <p className="text-xs text-ink-muted dark:text-ink-muted-dark">
        <span className="font-semibold text-transit-600 dark:text-transit-400">
          Answer: {q.options[q.answerIndex]}.
        </span>{' '}
        {q.explanation}
      </p>
    </Card>
  )
}

export default function Revision() {
  const { bookmarks, revisionQueue } = useProgress()
  const missedIds = revisionQueue.map((a) => a.questionId).filter((id) => !bookmarks.includes(id))

  const isEmpty = bookmarks.length === 0 && missedIds.length === 0

  return (
    <div className="pt-2">
      <TopBar title="Revision" subtitle="Bookmarks and recent misses" />

      {isEmpty ? (
        <Card>
          <EmptyState
            icon={Sparkles}
            title="Nothing to revise yet"
            body="Bookmark tricky questions during a quiz, or miss a few — they'll collect here for quick review."
          />
        </Card>
      ) : (
        <>
          {bookmarks.length > 0 && (
            <div className="mb-5">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-muted dark:text-ink-muted-dark mb-2 px-1 flex items-center gap-1.5">
                <BookmarkCheck size={13} /> Bookmarked
              </h2>
              <div className="flex flex-col gap-2.5">
                {bookmarks.map((id) => (
                  <ReviewCard key={id} questionId={id} />
                ))}
              </div>
            </div>
          )}

          {missedIds.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-muted dark:text-ink-muted-dark mb-2 px-1">
                Recently missed
              </h2>
              <div className="flex flex-col gap-2.5">
                {missedIds.map((id) => (
                  <ReviewCard key={id} questionId={id} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
