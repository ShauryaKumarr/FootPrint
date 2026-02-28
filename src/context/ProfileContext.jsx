import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const ProfileContext = createContext(null)
const MASCOT_NAME_KEY = 'footprint-mascot-name'

export function ProfileProvider({ children }) {
  const [bankConnected, setBankConnected] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [totalSpend, setTotalSpend] = useState(0)
  const [totalCO2, setTotalCO2] = useState(0)
  const [devScore, setDevScore] = useState(null)
  const [mascotName, setMascotNameState] = useState(() => {
    try {
      return localStorage.getItem(MASCOT_NAME_KEY) || ''
    } catch { return '' }
  })

  useEffect(() => {
    try { localStorage.setItem(MASCOT_NAME_KEY, mascotName) } catch {}
  }, [mascotName])

  const setMascotName = useCallback((name) => {
    setMascotNameState((prev) => {
      const val = typeof name === 'function' ? name(prev) : name
      return String(val ?? '').trim().slice(0, 20)
    })
  }, [])

  const connectBank = useCallback(() => setBankConnected(true), [])

  const addReceiptItems = useCallback((items) => {
    const tagged = items.map((i) => ({ ...i, source: i.source || 'receipt' }))
    setTransactions((prev) => [...tagged, ...prev])
    setTotalSpend((s) => s + items.reduce((sum, i) => sum + (parseFloat(i.price) || 0), 0))
    setTotalCO2((c) => c + items.reduce((sum, i) => sum + (parseFloat(i.co2) || 0), 0))
  }, [])

  const greenScore = devScore !== null
    ? devScore
    : totalCO2 > 0
      ? Math.max(0, Math.min(100, 100 - (totalCO2 / 5)))
      : 100

  return (
    <ProfileContext.Provider value={{
      bankConnected, connectBank,
      transactions, totalSpend, totalCO2, greenScore,
      addReceiptItems,
      mascotName, setMascotName,
      devScore, setDevScore,
    }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider')
  return ctx
}
