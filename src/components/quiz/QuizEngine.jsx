import { useState, useCallback, useMemo, useRef } from 'react'
import { useProgress } from '../../context/ProgressContext.jsx'
import QuestionCard from './QuestionCard.jsx'
import QuizResult from './QuizResult.jsx'
import ProgressBar from '../ui/ProgressBar.jsx'

/**
 * Drives a quiz session for any topic/difficulty tier. Owns question order,
 * the currently selected answer, and reports each attempt + the final
 * session score to ProgressContext so mastery, streaks, weak-topic flags
 * and revision all update automatically.
 *
 * Pass in `questions` (array) and `topicId`/`topicName`/`difficulty` —
 * nothing else about a topic needs to be known here, so adding a new topic
 * each week never requires touching this file.
 */
export default function QuizEngine({ topicId, topicName, difficulty = 'easy', questions }) {
  const { recordAttempt, recordQuizCompletion, bookmarks, toggleBookmark } = useProgress()
  const [order] = useState(() => questions)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const [sessionKey, setSessionKey] = useState(0)
  const timeRef = useRef(0)

  const question = order[currentIndex]
  const total = order.length

  const handleTick = useCallback((s) => {
    timeRef.current = s
  }, [])

  const handleSelect = useCallback(
    (optionIndex) => {
      if (selected !== null || !question) return
      setSelected(optionIndex)
      const correct = optionIndex === question.answerIndex
      if (correct) setCorrectCount((c) => c + 1)
      recordAttempt({
        topicId,
        subtopicId: question.subtopic ?? null,
        questionId: question.id,
        correct,
        timeTakenSec: timeRef.current
      })
    },
    [selected, question, topicId, recordAttempt]
  )

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= total) {
      const finalCorrect = correctCount
      recordQuizCompletion({ topicId, difficulty, correct: finalCorrect, total })
      setFinished(true)
    } else {
      setSelected(null)
      setCurrentIndex((i) => i + 1)
    }
  }, [currentIndex, total, correctCount, topicId, difficulty, recordQuizCompletion])

  const handleRetry = useCallback(() => {
    setCurrentIndex(0)
    setSelected(null)
    setCorrectCount(0)
    setFinished(false)
    setSessionKey((k) => k + 1)
  }, [])

  const progressPct = useMemo(() => (total ? (currentIndex / total) * 100 : 0), [currentIndex, total])

  if (!question && !finished) {
    return <p className="text-sm text-ink-muted dark:text-ink-muted-dark">No questions available yet.</p>
  }

  if (finished) {
    return (
      <QuizResult
        correctCount={correctCount}
        total={total}
        topicId={topicId}
        topicName={topicName}
        onRetry={handleRetry}
      />
    )
  }

  return (
    <div key={sessionKey}>
      <div className="mb-4">
        <ProgressBar value={progressPct} />
      </div>

      <QuestionCard
        question={question}
        index={currentIndex}
        total={total}
        selected={selected}
        onSelect={handleSelect}
        onTick={handleTick}
        isBookmarked={bookmarks.includes(question.id)}
        onToggleBookmark={() => toggleBookmark(question.id)}
      />

      {selected !== null && (
        <button
          onClick={handleNext}
          className="mt-4 w-full py-3 rounded-xl bg-route-500 text-ink dark:text-base-dark font-semibold text-sm hover:bg-route-600 transition-colors"
        >
          {currentIndex + 1 >= total ? 'See results' : 'Next question'}
        </button>
      )}
    </div>
  )
}
