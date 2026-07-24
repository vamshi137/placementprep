// Eagerly imports every JSON file under data/questions at build time.
// To add a new topic's content each week: drop a file here, set
// `questionFile` in topics.json to match, and nothing else needs to change.
const modules = import.meta.glob('../data/questions/*.json', { eager: true })

function unwrap(mod) {
  return mod.default ?? mod
}

/** Full content object for a topic: learn sections, examples, quiz tiers, revision. */
export function getTopicContent(topic) {
  if (!topic?.questionFile) return null
  const path = `../data/questions/${topic.questionFile}`
  const mod = modules[path]
  if (!mod) return null
  return unwrap(mod)
}

/** Questions for one difficulty tier ('easy' | 'medium' | 'hard'). */
export function getQuizQuestions(topic, difficulty) {
  const content = getTopicContent(topic)
  return content?.quiz?.[difficulty] ?? []
}

/** All quiz questions across every tier, flattened — used for revision lookups. */
export function getAllQuizQuestions(topic) {
  const content = getTopicContent(topic)
  if (!content) return []
  return [...(content.quiz?.easy ?? []), ...(content.quiz?.medium ?? []), ...(content.quiz?.hard ?? [])]
}

/** Scans every loaded question file (all difficulty tiers) for a single question by id. */
export function findQuestionById(questionId) {
  for (const mod of Object.values(modules)) {
    const data = unwrap(mod)
    const all = [...(data.quiz?.easy ?? []), ...(data.quiz?.medium ?? []), ...(data.quiz?.hard ?? [])]
    const match = all.find((q) => q.id === questionId)
    if (match) return { ...match, topicId: data.topicId }
  }
  return null
}
