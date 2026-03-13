import { createContext, useContext, useState, useEffect } from 'react'
import { ref, onValue } from 'firebase/database'
import { db } from '../config/firebase'
import defaultContent from '../config/defaultContent'

const ContentContext = createContext(null)

function deepMerge(defaults, overrides) {
  if (!overrides) return defaults
  const result = { ...defaults }
  for (const key of Object.keys(overrides)) {
    if (
      defaults[key] &&
      typeof defaults[key] === 'object' &&
      !Array.isArray(defaults[key]) &&
      typeof overrides[key] === 'object' &&
      !Array.isArray(overrides[key])
    ) {
      result[key] = deepMerge(defaults[key], overrides[key])
    } else if (overrides[key] !== undefined && overrides[key] !== null) {
      result[key] = overrides[key]
    }
  }
  return result
}

export function ContentProvider({ children }) {
  const [firebaseContent, setFirebaseContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const contentRef = ref(db, 'content')
    const unsubscribe = onValue(
      contentRef,
      (snapshot) => {
        setFirebaseContent(snapshot.val())
        setLoading(false)
      },
      () => {
        setLoading(false)
      }
    )
    return () => unsubscribe()
  }, [])

  const content = deepMerge(defaultContent, firebaseContent)

  return (
    <ContentContext.Provider value={{ content, loading }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) {
    return { content: defaultContent, loading: false }
  }
  return ctx
}
