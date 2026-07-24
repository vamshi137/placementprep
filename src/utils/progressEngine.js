// All functions here are pure (input -> output, no side effects) so the
// scoring rules can change week to week without touching storage or UI code.

const DAY_MS = 24 * 60 * 60 * 1000

/** Mastery is a 0-100 score blending accuracy with recent practice volume. */
export function computeMastery(attemptsForTopic) {
  if (!attemptsForTopic.length) return 0
  const recent = attemptsForTopic.slice(-20) // weight recent attempts more
  const correct = recent.filter((a) => a.correct).length
  const accuracy = correct / recent.length
  const volumeFactor = Math.min(recent.length / 15, 1) // needs ~15 attempts to be "confident"
  return Math.round(accuracy * 100 * (0.5 + 0.5 * volumeFactor))
}

export function computeTopicStats(topics, attempts) {
  return topics.map((topic) => {
    const topicAttempts = attempts.filter((a) => a.topicId === topic.id)
    const correct = topicAttempts.filter((a) => a.correct).length
    const lastAttempt = topicAttempts[topicAttempts.length - 1]
    return {
      topicId: topic.id,
      attempted: topicAttempts.length,
      correct,
      accuracy: topicAttempts.length ? Math.round((correct / topicAttempts.length) * 100) : 0,
      mastery: computeMastery(topicAttempts),
      lastPracticed: lastAttempt ? lastAttempt.timestamp : null
    }
  })
}

/** Weak areas: topics with real attempt history but low mastery, worst first. */
export function computeWeakAreas(topicStats, { minAttempts = 4, masteryThreshold = 65 } = {}) {
  return topicStats
    .filter((s) => s.attempted >= minAttempts && s.mastery < masteryThreshold)
    .sort((a, b) => a.mastery - b.mastery)
}

/** Questions answered incorrectly on their most recent attempt — feeds Revision. */
export function computeRevisionQueue(attempts) {
  const latestByQuestion = new Map()
  for (const a of attempts) {
    latestByQuestion.set(a.questionId, a) // later attempts overwrite earlier ones
  }
  return [...latestByQuestion.values()]
    .filter((a) => !a.correct)
    .sort((a, b) => b.timestamp - a.timestamp)
}

export function computeStreak(activeDates) {
  if (!activeDates.length) return { current: 0, longest: 0 }
  const daySet = new Set(activeDates.map((ts) => new Date(ts).toDateString()))
  const days = [...daySet]
    .map((d) => new Date(d).getTime())
    .sort((a, b) => a - b)

  let longest = 1
  let run = 1
  for (let i = 1; i < days.length; i++) {
    if (days[i] - days[i - 1] === DAY_MS) {
      run += 1
      longest = Math.max(longest, run)
    } else {
      run = 1
    }
  }

  const today = new Date().toDateString()
  const yesterday = new Date(Date.now() - DAY_MS).toDateString()
  let current = 0
  if (daySet.has(today) || daySet.has(yesterday)) {
    current = 1
    let cursor = daySet.has(today) ? new Date(today).getTime() : new Date(yesterday).getTime()
    while (daySet.has(new Date(cursor - DAY_MS).toDateString())) {
      current += 1
      cursor -= DAY_MS
    }
  }

  return { current, longest }
}

export function computeOverallStats(attempts) {
  const totalAttempted = attempts.length
  const totalCorrect = attempts.filter((a) => a.correct).length
  return {
    totalAttempted,
    totalCorrect,
    accuracy: totalAttempted ? Math.round((totalCorrect / totalAttempted) * 100) : 0
  }
}

/**
 * A topic is "weak" the instant a completed quiz session scores below 70%,
 * regardless of attempt count — this is a faster, more actionable signal
 * than the mastery-based weak-area detection above, which needs history.
 */
export function isSessionWeak(session, threshold = 70) {
  return Boolean(session) && session.accuracy < threshold
}
