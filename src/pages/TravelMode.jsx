import { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { ChevronLeft, Lightbulb, Sparkles, BookOpenCheck, PencilLine, ListChecks, Check } from 'lucide-react'
import Card from '../components/ui/Card.jsx'
import Badge from '../components/ui/Badge.jsx'
import QuizEngine from '../components/quiz/QuizEngine.jsx'
import { getTopicContent } from '../utils/loadQuestions.js'
import topics from '../data/topics.json'

const STEPS = [
  { id: 'concept', label: 'Concept', icon: BookOpenCheck },
  { id: 'examples', label: 'Examples', icon: Lightbulb },
  { id: 'tricks', label: 'Tricks', icon: Sparkles },
  { id: 'practice', label: 'Practice', icon: PencilLine },
  { id: 'quiz', label: 'Quiz', icon: ListChecks }
]

export default function TravelMode() {
  const { topicId } = useParams()
  const [step, setStep] = useState(0)
  const [revealedPractice, setRevealedPractice] = useState({})

  const topic = topics.find((t) => t.id === topicId)
  if (!topic) return <Navigate to="/topics" replace />
  const content = getTopicContent(topic)
  if (!content) return <Navigate to={`/topics/${topicId}`} replace />

  const stepId = STEPS[step].id
  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1))

  return (
    <div className="fixed inset-0 z-40 bg-base dark:bg-base-dark flex flex-col">
      {/* Header — big tap target for back, step dots */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 safe-top">
        <Link
          to={`/topics/${topic.id}`}
          aria-label="Exit Travel Mode"
          className="w-11 h-11 flex items-center justify-center rounded-full bg-surface-raised dark:bg-surface-raised-dark shrink-0"
        >
          <ChevronLeft size={24} />
        </Link>
        <div className="flex-1">
          <p className="text-xs font-semibold text-ink-muted dark:text-ink-muted-dark mb-1">{topic.name} · Travel Mode</p>
          <div className="flex gap-1.5">
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-route-500' : 'bg-surface-raised dark:bg-surface-raised-dark'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Body — one lesson, minimal scroll, large type */}
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-4">
            {(() => {
              const Icon = STEPS[step].icon
              return <Icon size={22} className="text-route-500" />
            })()}
            <h1 className="font-display font-bold text-2xl">{STEPS[step].label}</h1>
          </div>

          {stepId === 'concept' && (
            <div className="flex flex-col gap-4">
              <Card className="p-5">
                <p className="text-lg leading-relaxed">{content.revision.summary}</p>
              </Card>
              {content.learn.sections.slice(0, 2).map((sec, i) => (
                <Card key={i} className="p-5">
                  <Badge tone={topic.color} className="mb-2">{sec.subtopic}</Badge>
                  <p className="text-base leading-relaxed">{sec.explanation}</p>
                </Card>
              ))}
            </div>
          )}

          {stepId === 'examples' && (
            <div className="flex flex-col gap-4">
              {content.solvedExamples.slice(0, 2).map((ex) => (
                <Card key={ex.id} className="p-5">
                  <Badge tone={topic.color} className="mb-2">{ex.subtopic}</Badge>
                  <p className="text-base font-medium mb-2">{ex.question}</p>
                  <p className="text-base text-ink-muted dark:text-ink-muted-dark whitespace-pre-line mb-2">
                    {ex.solution}
                  </p>
                  <p className="text-base font-semibold text-transit-600 dark:text-transit-400">
                    Answer: {ex.answer}
                  </p>
                </Card>
              ))}
            </div>
          )}

          {stepId === 'tricks' && (
            <div className="flex flex-col gap-4">
              {content.learn.sections.map((sec, i) => (
                <Card key={i} className="p-5">
                  <Badge tone={topic.color} className="mb-2">{sec.subtopic}</Badge>
                  <p className="text-base"><span className="font-semibold text-route-700 dark:text-route-300">Memory: </span>{sec.memoryTrick}</p>
                  <p className="text-base mt-2"><span className="font-semibold text-transit-700 dark:text-transit-300">Shortcut: </span>{sec.shortcutTrick}</p>
                </Card>
              ))}
            </div>
          )}

          {stepId === 'practice' && (
            <div className="flex flex-col gap-4">
              {content.practiceExamples.slice(0, 2).map((ex) => (
                <Card key={ex.id} className="p-5">
                  <Badge tone={topic.color} className="mb-2">{ex.subtopic}</Badge>
                  <p className="text-base font-medium mb-3">{ex.question}</p>
                  {revealedPractice[ex.id] ? (
                    <p className="text-base font-semibold text-transit-600 dark:text-transit-400">
                      Answer: {ex.answer}
                    </p>
                  ) : (
                    <button
                      onClick={() => setRevealedPractice((r) => ({ ...r, [ex.id]: true }))}
                      className="w-full py-3 rounded-xl bg-surface-raised dark:bg-surface-raised-dark font-semibold text-sm"
                    >
                      Tap to reveal answer
                    </button>
                  )}
                </Card>
              ))}
            </div>
          )}

          {stepId === 'quiz' && (
            <QuizEngine
              topicId={topic.id}
              topicName={topic.name}
              difficulty="easy"
              questions={content.quiz.easy}
            />
          )}
        </div>
      </div>

      {/* Footer — one big thumb-reachable action */}
      {stepId !== 'quiz' && (
        <div className="px-5 pb-6 pt-3 safe-bottom">
          <button
            onClick={goNext}
            className="w-full py-4 rounded-2xl bg-route-500 text-ink dark:text-base-dark font-bold text-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            {step === STEPS.length - 2 ? 'Continue to Quiz' : 'Continue'} <Check size={20} />
          </button>
        </div>
      )}
    </div>
  )
}
