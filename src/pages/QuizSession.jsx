import { useParams, Navigate } from 'react-router-dom'
import TopBar from '../components/layout/TopBar.jsx'
import QuizEngine from '../components/quiz/QuizEngine.jsx'
import { getQuizQuestions, getTopicContent } from '../utils/loadQuestions.js'
import topics from '../data/topics.json'

const VALID_DIFFICULTIES = ['easy', 'medium', 'hard']

export default function QuizSession() {
  const { topicId, difficulty = 'easy' } = useParams()
  const topic = topics.find((t) => t.id === topicId)
  if (!topic) return <Navigate to="/topics" replace />
  if (!VALID_DIFFICULTIES.includes(difficulty)) return <Navigate to={`/topics/${topicId}`} replace />

  const content = getTopicContent(topic)
  if (!content) return <Navigate to={`/topics/${topicId}`} replace />

  const questions = getQuizQuestions(topic, difficulty)

  return (
    <div className="pt-2">
      <TopBar title={topic.name} showBack subtitle={`Quiz · ${difficulty}`} />
      <QuizEngine
        topicId={topic.id}
        topicName={topic.name}
        difficulty={difficulty}
        questions={questions}
      />
    </div>
  )
}
