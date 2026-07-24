import { useState, useEffect, useCallback } from 'react'

/**
 * Persists state to localStorage. Falls back gracefully if storage
 * is unavailable (private browsing, quota exceeded, etc.).
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage unavailable — app continues to work in-memory for this session
    }
  }, [key, value])

  const reset = useCallback(() => setValue(initialValue), [initialValue])

  return [value, setValue, reset]
}
