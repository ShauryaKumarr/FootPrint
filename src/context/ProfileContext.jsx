import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react'
import { computeSummary, getGrade } from '../utils/carbonScoring'

const ProfileContext = createContext(null)
const MASCOT_NAME_KEY = 'footprint-mascot-name'
const PROFILE_STORAGE_KEY = 'footprint-profile'

function loadPersistedProfile() {
  try {
    const raw = sessionStorage.getItem(PROFILE_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch { return null }
}

function persistProfile(data) {
  try { sessionStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(data)) } catch {}
}

function receiptToScored(item, index) {
  const amount = Math.abs(parseFloat(item.price) || 0)
  const kgCO2 = parseFloat(item.co2) || 0
  const gradeInfo = getGrade(kgCO2)
  return {
    transaction_id: `receipt-${Date.now()}-${index}`,
    name: item.name || 'Receipt Item',
    date: new Date().toISOString().slice(0, 10),
    amount,
    kgCO2,
    sector: item.category || 'Other',
    multiplier: amount > 0 ? kgCO2 / amount : 0,
    ...gradeInfo,
    source: item.source || 'receipt',
  }
}

export function ProfileProvider({ children }) {
  const saved = loadPersistedProfile()

  const [bankConnected, setBankConnected] = useState(saved?.bankConnected ?? false)
  const [connectionMode, setConnectionMode] = useState(saved?.connectionMode ?? null)
  const [scoredTransactions, setScoredTransactions] = useState(saved?.scoredTransactions ?? [])
  const [devScore, setDevScore] = useState(null)
  const [mascotName, setMascotNameState] = useState(() => {
    try { return localStorage.getItem(MASCOT_NAME_KEY) || '' } catch { return '' }
  })

  const transactionSummary = useMemo(
    () => scoredTransactions.length > 0 ? computeSummary(scoredTransactions) : null,
    [scoredTransactions]
  )

  useEffect(() => {
    try { localStorage.setItem(MASCOT_NAME_KEY, mascotName) } catch {}
  }, [mascotName])

  useEffect(() => {
    persistProfile({ bankConnected, connectionMode, scoredTransactions })
  }, [bankConnected, connectionMode, scoredTransactions])

  const setMascotName = useCallback((name) => {
    setMascotNameState((prev) => {
      const val = typeof name === 'function' ? name(prev) : name
      return String(val ?? '').trim().slice(0, 20)
    })
  }, [])

  const connectBank = useCallback((mode, scored) => {
    setBankConnected(true)
    if (mode) setConnectionMode(mode)
    if (scored && scored.length > 0) {
      setScoredTransactions(scored)
    }
  }, [])

  const disconnectBank = useCallback(() => {
    setBankConnected(false)
    setConnectionMode(null)
    setScoredTransactions([])
    try { sessionStorage.removeItem(PROFILE_STORAGE_KEY) } catch {}
  }, [])

  const addReceiptItems = useCallback((items) => {
    const converted = items.map((item, i) => receiptToScored(item, i))
    setScoredTransactions((prev) => [...converted, ...prev])
  }, [])

  const totalSpend = transactionSummary?.totalSpend ?? 0
  const totalCO2 = transactionSummary?.totalCO2 ?? 0
  const greenScore = devScore !== null
    ? devScore
    : transactionSummary
      ? transactionSummary.greenPct
      : 100

  return (
    <ProfileContext.Provider value={{
      bankConnected, connectionMode, connectBank, disconnectBank,
      transactions: scoredTransactions,
      scoredTransactions, transactionSummary,
      totalSpend, totalCO2, greenScore,
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
