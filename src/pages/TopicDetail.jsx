import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { PlayCircle, Lightbulb, AlertOctagon, Sparkles, GraduationCap, Building2, Bus, ChevronRight } from 'lucide-react'
import TopBar from '../components/layout/TopBar.jsx'
import TopicLayout from '../components/topics/TopicLayout.jsx'
import Card from '../components/ui/Card.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import ProgressBar from '../components/ui/ProgressBar.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import { getTopicContent } from '../utils/loadQuestions.js'
import topics from '../data/topics.json'

const TABS = [
  { id: 'learn', label: 'Learn' },
  { id: 'examples', label: 'Examples' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'revision', label: 'Revise' }
]

const DIFFICULTIES = [
  { id: 'easy', label: 'Easy', tone: 'transit' },
  { id: 'medium', label: 'Medium', tone: 'route' },
  { id: 'hard', label: 'Hard', tone: 'alert' }
]

export default function TopicDetail() {
  const { topicId } = useParams()
  const [activeTab, setActiveTab] = useState('learn')
  const { topicStats, sessions } = useProgress()

  const topic = topics.find((t) => t.id === topicId)
  if (!topic) return <Navigate to="/topics" replace />

  const stats = topicStats.find((s) => s.topicId === topic.id)
  const session = sessions[topic.id]
  const content = getTopicContent(topic)

  return (
    <div className="pt-2">
      <TopBar title={topic.name} showBack subtitle={topic.category} />

      {topic.status !== 'available' || !content ? (
        <Card className="p-6 text-center">
          <p className="font-semibold mb-1">Coming soon</p>
          <p className="text-sm text-ink-muted dark:text-ink-muted-dark mb-3">
            This topic's content is scheduled for a future weekly update. It'll cover:
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {topic.subtopics.map((s) => (
              <Badge key={s} tone="neutral">{s}</Badge>
            ))}
          </div>
        </Card>
      ) : (
        <TopicLayout topic={topic} activeTab={activeTab} onTabChange={setActiveTab} tabs={TABS}>
          <Button as={Link} to={`/topics/${topic.id}/travel`} variant="secondary" className="w-full mb-4">
            <Bus size={16} /> Start Travel Mode (5-min micro lessons)
          </Button>

          {activeTab === 'learn' && (
            <div className="flex flex-col gap-3">
              <Card className="p-5">
                <h3 className="font-display font-bold mb-1">{content.learn.title}</h3>
                <p className="text-sm text-ink-muted dark:text-ink-muted-dark">{content.learn.intro}</p>
              </Card>

              {content.learn.sections.map((sec, i) => (
                <Card key={i} className="p-5">
                  <Badge tone={topic.color} className="mb-2">{sec.subtopic}</Badge>
                  <h4 className="font-semibold text-sm mb-1.5">Explanation</h4>
                  <p className="text-sm text-ink-muted dark:text-ink-muted-dark leading-relaxed mb-3">
                    {sec.explanation}
                  </p>

                  <h4 className="font-semibold text-sm mb-1.5">Real-life example</h4>
                  <p className="text-sm text-ink-muted dark:text-ink-muted-dark leading-relaxed mb-3">
                    {sec.realLifeExample}
                  </p>

                  <div className="grid grid-cols-1 gap-2.5 mb-3">
                    <div className="p-3 rounded-xl bg-route-50 dark:bg-route-700/10">
                      <p className="text-xs font-semibold text-route-700 dark:text-route-300 flex items-center gap-1.5 mb-1">
                        <Sparkles size={13} /> Memory trick
                      </p>
                      <p className="text-sm">{sec.memoryTrick}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-transit-100 dark:bg-transit-700/10">
                      <p className="text-xs font-semibold text-transit-700 dark:text-transit-300 flex items-center gap-1.5 mb-1">
                        <Lightbulb size={13} /> Shortcut trick
                      </p>
                      <p className="text-sm">{sec.shortcutTrick}</p>
                    </div>
                  </div>

                  {sec.formulaCard?.length > 0 && (
                    <div className="mb-3 p-3 rounded-xl bg-surface-raised dark:bg-surface-raised-dark">
                      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted dark:text-ink-muted-dark mb-1.5">
                        Formula card
                      </p>
                      <ul className="flex flex-col gap-1">
                        {sec.formulaCard.map((f, fi) => (
                          <li key={fi} className="font-mono text-sm">{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {sec.commonMistakes?.length > 0 && (
                    <div className="mb-3 p-3 rounded-xl bg-alert-100 dark:bg-alert-600/10">
                      <p className="text-xs font-semibold text-alert-600 dark:text-alert-300 flex items-center gap-1.5 mb-1.5">
                        <AlertOctagon size={13} /> Common mistakes
                      </p>
                      <ul className="flex flex-col gap-1 list-disc list-inside">
                        {sec.commonMistakes.map((m, mi) => (
                          <li key={mi} className="text-sm">{m}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <div className="p-3 rounded-xl border border-route-300/40">
                      <p className="text-xs font-semibold flex items-center gap-1.5 mb-1">
                        <GraduationCap size={13} /> TalentSprint tip
                      </p>
                      <p className="text-sm">{sec.talentSprintTip}</p>
                    </div>
                    <div className="p-3 rounded-xl border border-transit-300/40">
                      <p className="text-xs font-semibold flex items-center gap-1.5 mb-1">
                        <Building2 size={13} /> TCS NQT tip
                      </p>
                      <p className="text-sm">{sec.tcsNqtTip}</p>
                    </div>
                  </div>
                </Card>
              ))}

              <Button onClick={() => setActiveTab('examples')} variant="primary" className="mt-1">
                See solved examples <ChevronRight size={16} />
              </Button>
            </div>
          )}

          {activeTab === 'examples' && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted dark:text-ink-muted-dark px-1">
                Solved examples
              </h3>
              {content.solvedExamples.map((ex) => (
                <Card key={ex.id} className="p-4">
                  <Badge tone={topic.color} className="mb-2">{ex.subtopic}</Badge>
                  <p className="text-sm font-medium mb-2">{ex.question}</p>
                  <p className="text-sm text-ink-muted dark:text-ink-muted-dark whitespace-pre-line mb-2">
                    {ex.solution}
                  </p>
                  <p className="text-sm font-semibold text-transit-600 dark:text-transit-400">
                    Answer: {ex.answer}
                  </p>
                </Card>
              ))}

              <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted dark:text-ink-muted-dark px-1 mt-2">
                Practice examples — try before revealing
              </h3>
              {content.practiceExamples.map((ex) => (
                <PracticeCard key={ex.id} example={ex} topicColor={topic.color} />
              ))}
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="flex flex-col gap-3">
              <Card className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold">Mastery</span>
                  <span className="text-sm font-mono">{stats?.mastery ?? 0}%</span>
                </div>
                <ProgressBar value={stats?.mastery ?? 0} colorClass="bg-transit-500" />
                {session && (
                  <p className="text-xs text-ink-muted dark:text-ink-muted-dark mt-3">
                    Last quiz ({session.difficulty}): {session.accuracy}%
                    {session.accuracy < 70 && <span className="text-alert-500 font-semibold"> · Weak</span>}
                  </p>
                )}
              </Card>

              {DIFFICULTIES.map((d) => {
                const qCount = content.quiz[d.id]?.length ?? 0
                return (
                  <Card key={d.id} className="p-4 flex items-center justify-between">
                    <div>
                      <Badge tone={d.tone} className="mb-1 capitalize">{d.label}</Badge>
                      <p className="text-xs text-ink-muted dark:text-ink-muted-dark">{qCount} questions</p>
                    </div>
                    <Button as={Link} to={`/topics/${topic.id}/quiz/${d.id}`} variant="primary">
                      <PlayCircle size={16} /> Start
                    </Button>
                  </Card>
                )
              })}
            </div>
          )}

          {activeTab === 'revision' && (
            <div className="flex flex-col gap-3">
              <Card className="p-5">
                <h4 className="font-semibold text-sm mb-2">Quick revision sheet</h4>
                <ul className="flex flex-col gap-1.5 list-disc list-inside">
                  {content.revision.quickSheet.map((line, i) => (
                    <li key={i} className="text-sm">{line}</li>
                  ))}
                </ul>
              </Card>
              <Card className="p-5">
                <h4 className="font-semibold text-sm mb-2">One-minute revision</h4>
                <ul className="flex flex-col gap-1.5 list-disc list-inside">
                  {content.revision.oneMinute.map((line, i) => (
                    <li key={i} className="text-sm">{line}</li>
                  ))}
                </ul>
              </Card>
              <Card className="p-5">
                <h4 className="font-semibold text-sm mb-2">Topic summary</h4>
                <p className="text-sm text-ink-muted dark:text-ink-muted-dark leading-relaxed">
                  {content.revision.summary}
                </p>
              </Card>
            </div>
          )}
        </TopicLayout>
      )}
    </div>
  )
}

function PracticeCard({ example, topicColor }) {
  const [revealed, setRevealed] = useState(false)
  return (
    <Card className="p-4">
      <Badge tone={topicColor} className="mb-2">{example.subtopic}</Badge>
      <p className="text-sm font-medium mb-3">{example.question}</p>
      {revealed ? (
        <div>
          <p className="text-sm font-semibold text-transit-600 dark:text-transit-400 mb-1">
            Answer: {example.answer}
          </p>
          <p className="text-xs text-ink-muted dark:text-ink-muted-dark">{example.hint}</p>
        </div>
      ) : (
        <button
          onClick={() => setRevealed(true)}
          className="text-xs font-semibold text-route-600 dark:text-route-400"
        >
          Reveal answer
        </button>
      )}
    </Card>
  )
}
