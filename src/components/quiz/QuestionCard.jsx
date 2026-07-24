import { Bookmark, BookmarkCheck } from 'lucide-react'
import Card from '../ui/Card.jsx'
import Badge from '../ui/Badge.jsx'
import OptionButton from './OptionButton.jsx'
import Timer from './Timer.jsx'

const DIFFICULTY_TONE = { easy: 'transit', medium: 'route', hard: 'alert' }

export default function QuestionCard({
  question,
  index,
  total,
  selected,
  onSelect,
  onTick,
  isBookmarked,
  onToggleBookmark
}) {
  const answered = selected !== null

  const stateFor = (optIndex) => {
    if (!answered) return 'idle'
    if (optIndex === question.answerIndex) return 'correct'
    if (optIndex === selected) return 'incorrect'
    return 'idle'
  }

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-ink-muted dark:text-ink-muted-dark">
          Question {index + 1} of {total}
        </span>
        <div className="flex items-center gap-3">
          <Timer questionKey={question.id} onTick={onTick} />
          <button
            onClick={onToggleBookmark}
            aria-label={isBookmarked ? 'Remove from revision' : 'Save for revision'}
            className="text-ink-muted dark:text-ink-muted-dark hover:text-route-500"
          >
            {isBookmarked ? <BookmarkCheck size={16} className="text-route-500" /> : <Bookmark size={16} />}
          </button>
        </div>
      </div>

      <Badge tone={DIFFICULTY_TONE[question.difficulty] || 'neutral'} className="mb-3 capitalize">
        {question.difficulty}
      </Badge>

      <h2 className="font-display font-semibold text-lg leading-snug mb-4">{question.question}</h2>

      <div className="flex flex-col gap-2.5">
        {question.options.map((opt, i) => (
          <OptionButton
            key={i}
            label={opt}
            index={i}
            state={stateFor(i)}
            disabled={answered}
            onClick={() => !answered && onSelect(i)}
          />
        ))}
      </div>

      {answered && (
        <div className="mt-4 flex flex-col gap-2.5">
          <div className="p-3.5 rounded-xl bg-surface-raised dark:bg-surface-raised-dark text-sm">
            <span className="font-semibold">Why: </span>
            {question.explanation}
          </div>
          {selected !== question.answerIndex && question.whyWrong?.[selected] && (
            <div className="p-3.5 rounded-xl bg-alert-100 dark:bg-alert-600/10 text-sm text-alert-600 dark:text-alert-300">
              <span className="font-semibold">
                Why option {String.fromCharCode(65 + selected)} is wrong:{' '}
              </span>
              {question.whyWrong[selected]}
            </div>
          )}
          {question.shortcut && (
            <div className="p-3.5 rounded-xl bg-route-50 dark:bg-route-700/10 text-sm">
              <span className="font-semibold text-route-700 dark:text-route-300">Shortcut: </span>
              {question.shortcut}
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
