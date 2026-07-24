import { createContext, useContext, useMemo, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import {
  computeTopicStats,
  computeWeakAreas,
  computeRevisionQueue,
  computeStreak,
  computeOverallStats,
  isSessionWeak
} from '../utils/progressEngine.js'
import topics from '../data/topics.json'

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const [attempts, setAttempts] = useLocalStorage('pp:attempts', [])
  const [bookmarks, setBookmarks] = useLocalStorage('pp:bookmarks', [])
  // Latest completed quiz session per topic: { [topicId]: { correct, total, accuracy, difficulty, timestamp } }
  const [sessions, setSessions] = useLocalStorage('pp:sessions', {})

  const recordAttempt = useCallback(
    ({ topicId, subtopicId, questionId, correct, timeTakenSec }) => {
      setAttempts((prev) => [
        ...prev,
        { topicId, subtopicId, questionId, correct, timeTakenSec, timestamp: Date.now() }
      ])
    },
    [setAttempts]
  )

  const recordQuizCompletion = useCallback(
    ({ topicId, difficulty, correct, total }) => {
      const accuracy = total ? Math.round((correct / total) * 100) : 0
      setSessions((prev) => ({
        ...prev,
        [topicId]: { correct, total, accuracy, difficulty, timestamp: Date.now() }
      }))
    },
    [setSessions]
  )

  const toggleBookmark = useCallback(
    (questionId) => {
      setBookmarks((prev) =>
        prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId]
      )
    },
    [setBookmarks]
  )

  const clearAllProgress = useCallback(() => {
    setAttempts([])
    setBookmarks([])
    setSessions({})
  }, [setAttempts, setBookmarks, setSessions])

  const derived = useMemo(() => {
    const topicStats = computeTopicStats(topics, attempts)
    const weakAreas = computeWeakAreas(topicStats)
    const revisionQueue = computeRevisionQueue(attempts)
    const streak = computeStreak(attempts.map((a) => a.timestamp))
    const overall = computeOverallStats(attempts)

    // Topics flagged weak because their *latest quiz* scored under 70%,
    // even if they don't yet have enough history for mastery-based detection.
    const sessionWeakTopicIds = Object.entries(sessions)
      .filter(([, session]) => isSessionWeak(session))
      .map(([topicId]) => topicId)

    return { topicStats, weakAreas, revisionQueue, streak, overall, sessionWeakTopicIds }
  }, [attempts, sessions])

  const value = {
    attempts,
    bookmarks,
    sessions,
    recordAttempt,
    recordQuizCompletion,
    toggleBookmark,
    clearAllProgress,
    ...derived
  }

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within a ProgressProvider')
  return ctx
}
