import { useState, useEffect, useCallback } from 'react'
import { usePlaidLink } from 'react-plaid-link'
import { scoreTransactions, getBudgetStatus, getReductions, MONTHLY_BUDGET_KG } from '../utils/carbonScoring'
import { MOCK_TRANSACTIONS } from '../utils/mockTransactions'
import { useProfile } from '../context/ProfileContext'
import natureVideo1 from '../assets/natureVideo1.mp4'
import natureVideo2 from '../assets/natureVideo2.mp4'

const API_BASE = 'http://localhost:3001'

function SectorIcon({ sector, className = 'w-4 h-4' }) {
  const props = { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (sector) {
    case 'Transport':
      return <svg {...props}><path d="M5 17h14M6 9l6-5 6 5M4 17l2-8h12l2 8" /><circle cx="7.5" cy="17" r="1.5" /><circle cx="16.5" cy="17" r="1.5" /></svg>
    case 'Food':
      return <svg {...props}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2l-4 6 4 6zM21 15v7" /></svg>
    case 'Fashion':
      return <svg {...props}><path d="M6.3 2h11.4L22 8l-4 2V22H6V10L2 8z" /></svg>
    case 'Energy':
      return <svg {...props}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
    case 'Shopping':
      return <svg {...props}><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" /></svg>
    default:
      return <svg {...props}><circle cx="12" cy="12" r="3" /><path d="M12 2v4m0 12v4m-7.07-3.93l2.83-2.83m8.48-8.48l2.83-2.83M2 12h4m12 0h4m-3.93 7.07l-2.83-2.83M6.76 6.76L3.93 3.93" /></svg>
  }
}

const SECTOR_META = {
  Transport: { label: 'Transport',   bar: 'bg-rose-500',    accent: 'border-l-rose-500',   tag: 'bg-rose-50 text-rose-700 ring-rose-200' },
  Food:      { label: 'Food & Drink', bar: 'bg-amber-500',  accent: 'border-l-amber-500',  tag: 'bg-amber-50 text-amber-700 ring-amber-200' },
  Fashion:   { label: 'Fashion',     bar: 'bg-violet-500',  accent: 'border-l-violet-500', tag: 'bg-violet-50 text-violet-700 ring-violet-200' },
  Energy:    { label: 'Energy',      bar: 'bg-sky-500',     accent: 'border-l-sky-500',    tag: 'bg-sky-50 text-sky-700 ring-sky-200' },
  Shopping:  { label: 'Shopping',    bar: 'bg-emerald-500', accent: 'border-l-emerald-500', tag: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
  Other:     { label: 'Other',       bar: 'bg-gray-400',    accent: 'border-l-gray-400',   tag: 'bg-gray-50 text-gray-600 ring-gray-200' },
}

export default function CarbonProfile() {
  const {
    bankConnected, connectionMode,
    connectBank, disconnectBank,
    scoredTransactions, transactionSummary,
  } = useProfile()

  const [linkToken, setLinkToken] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')
  const [expandedTxn, setExpandedTxn] = useState(null)

  const scored = scoredTransactions
  const summary = transactionSummary
  const connected = bankConnected
  const mode = connectionMode

  useEffect(() => {
    fetch(`${API_BASE}/api/create-link-token`, { method: 'POST' })
      .then(r => r.json())
      .then(data => setLinkToken(data.link_token))
      .catch(() => {})
  }, [])

  const onPlaidSuccess = useCallback(async (publicToken) => {
    setLoading(true)
    setError(null)
    try {
      await fetch(`${API_BASE}/api/exchange-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_token: publicToken }),
      })
      const res = await fetch(`${API_BASE}/api/transactions`)
      const data = await res.json()
      connectBank('plaid', scoreTransactions(data.transactions))
    } catch {
      setError('Failed to fetch transactions. Try demo mode instead.')
    } finally {
      setLoading(false)
    }
  }, [connectBank])

  const { open: openPlaid, ready: plaidReady } = usePlaidLink({
    token: linkToken,
    onSuccess: onPlaidSuccess,
  })

  const loadDemo = () => connectBank('demo', scoreTransactions(MOCK_TRANSACTIONS))

  const disconnect = () => {
    disconnectBank()
    setError(null)
    setFilter('all')
    setExpandedTxn(null)
  }

  /* ── Connect screen ── */
  if (!connected || !summary) {
    return (
      <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
        <video
          src={natureVideo1}
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 py-20">
          <h1 className="text-4xl text-white mb-3 drop-shadow-lg" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
            Carbon Profile
          </h1>
          <p className="text-white/80 mb-10 text-lg leading-relaxed max-w-xl drop-shadow-md">
            Connect your bank account and we'll categorize your purchases,
            estimate their carbon footprint, and show you where to cut back.
          </p>

          <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center mb-6 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-[#0B3D2E]/10 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-7 h-7 text-[#0B3D2E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h2 className="fc-heading text-2xl mb-2">Connect Your Bank</h2>
            <p className="text-[#374151] mb-8 max-w-sm mx-auto">
              We'll pull the last 30 days of transactions and score every purchase for its carbon impact.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openPlaid()}
                disabled={!plaidReady || loading}
                className="fc-btn disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Connecting…' : 'Connect with Plaid'}
              </button>
              <button onClick={loadDemo} className="fc-btn-outline">
                Try Demo Mode
              </button>
            </div>

            {!linkToken && (
              <p className="mt-5 text-xs text-[#4B5563]">
                Backend not detected — use Demo Mode, or start the server with <code className="bg-[#FFF5EB] px-1.5 py-0.5 rounded text-[#0B3D2E]">npm run server</code>
              </p>
            )}
            {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
          </div>

          <div className="bg-[#C5E867] p-5 text-center rounded-xl shadow-2xl">
            <p className="text-sm text-[#0B3D2E]/80">
              <strong>Sandbox:</strong> Use{' '}
              <code className="bg-white/40 px-1.5 py-0.5 rounded">user_good</code> /{' '}
              <code className="bg-white/40 px-1.5 py-0.5 rounded">pass_good</code> in the Plaid modal. No real data is used.
            </p>
          </div>
        </div>
      </div>
    )
  }

  /* ── Dashboard ── */
  const budget = getBudgetStatus(summary.totalCO2)
  const reductions = getReductions(summary.bySector, summary.totalCO2)
  const sectorEntries = Object.entries(summary.bySector).sort((a, b) => b[1].co2 - a[1].co2)
  const sectors = ['all', ...sectorEntries.map(([s]) => s)]
  const filteredTxns = filter === 'all' ? scored : scored.filter(t => t.sector === filter)
  const overallGrade = summary.greenPct >= 70 ? 'A' : summary.greenPct >= 50 ? 'B' : summary.greenPct >= 30 ? 'C' : summary.greenPct >= 15 ? 'D' : 'F'
  const isOver = budget.status === 'over'

  return (
    <div className="relative min-h-screen">
      <video
        src={natureVideo2}
        autoPlay muted loop playsInline
        className="fixed inset-0 w-full h-full object-cover"
      />
      <div className="fixed inset-0 bg-black/20" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-end justify-between mb-8 bg-white/95 rounded-2xl px-6 py-4 shadow-lg border border-gray-200/60">
        <div>
          <h1 className="fc-heading text-3xl">Carbon Profile</h1>
          <p className="text-[#374151] mt-1 text-sm">
            {mode === 'demo' ? 'Demo mode' : 'Connected via Plaid'} — {summary.count} transactions analyzed
          </p>
        </div>
        <button onClick={disconnect} className="text-sm text-[#6B7280] hover:text-red-500 transition-colors duration-200 pb-0.5">
          Disconnect
        </button>
      </div>

      {/* ── Summary strip ── */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
        {/* Overall grade ring */}
        <div className="col-span-2 lg:col-span-1 bg-white rounded-2xl border border-gray-200/60 p-5 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-default group">
          <div className="relative w-20 h-20 mb-2">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#E8E4DF" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15.915" fill="none"
                strokeWidth="3"
                strokeDasharray={`${summary.greenPct} ${100 - summary.greenPct}`}
                strokeLinecap="round"
                className={`${gradeStrokeColor(overallGrade)} transition-all duration-1000`}
              />
            </svg>
            <span className={`absolute inset-0 flex items-center justify-center text-3xl font-black ${gradeColor(overallGrade)} group-hover:scale-110 transition-transform duration-200`}>
              {overallGrade}
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-[#374151]">{summary.greenPct}% low-carbon</p>
        </div>

        <StatCard label="Total Spend" value={`$${summary.totalSpend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} sub="Last 30 days" />
        <StatCard label="CO₂ Produced" value={`${Math.round(summary.totalCO2)} kg`} sub={`${budget.pct}% of ${MONTHLY_BUDGET_KG} kg budget`} alert={isOver} />
        <StatCard label="Per Transaction" value={`${(summary.totalCO2 / summary.count).toFixed(1)} kg`} sub={`${summary.count} purchases`} />
        <StatCard label="Highest Sector" value={SECTOR_META[sectorEntries[0]?.[0]]?.label || '—'} sub={`${Math.round(sectorEntries[0]?.[1]?.co2 || 0)} kg CO₂`} />
      </div>

      {/* ── Budget bar ── */}
      <div className={`bg-white rounded-2xl border border-gray-200/60 shadow-lg p-6 mb-8 transition-all duration-300 ${isOver ? '!border-red-200 hover:!border-red-300' : 'hover:border-[#C5E867]'}`}>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="fc-heading text-lg">Monthly Budget</h2>
          <p className={`text-sm font-semibold tabular-nums ${isOver ? 'text-red-600' : 'text-[#0B3D2E]'}`}>
            {Math.round(summary.totalCO2)}<span className="font-normal text-[#374151]"> / {MONTHLY_BUDGET_KG} kg</span>
            {isOver && <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">{budget.pct}%</span>}
          </p>
        </div>
        <div className="w-full bg-[#E8E4DF] rounded-full h-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out ${isOver ? 'bg-red-500' : 'bg-[#0B3D2E]'}`}
            style={{ width: `${Math.min(budget.pct, 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2.5">
          <p className={`text-sm ${isOver ? 'text-red-600' : 'text-[#0B3D2E]/70'}`}>{budget.message}</p>
          {isOver && <p className="text-xs text-red-500 font-medium">{Math.round(summary.totalCO2 - MONTHLY_BUDGET_KG)} kg over limit</p>}
        </div>
      </div>

      {/* ── Sectors + Grades ── */}
      <div className="grid lg:grid-cols-5 gap-6 mb-8">
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200/60 shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="fc-heading text-lg mb-5">Spending by Sector</h2>
          {sectorEntries.length === 0 ? (
            <p className="text-[#374151] text-sm">No categorized transactions yet.</p>
          ) : (
            <div className="space-y-1">
              {sectorEntries.map(([sector, data]) => {
                const meta = SECTOR_META[sector] || SECTOR_META.Other
                const pct = summary.totalCO2 > 0 ? Math.round((data.co2 / summary.totalCO2) * 100) : 0
                return (
                  <div
                    key={sector}
                    className={`group rounded-xl border-l-[3px] ${meta.accent} pl-4 pr-3 py-3 hover:bg-[#FFF5EB]/60 transition-all duration-200 cursor-default`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <SectorIcon sector={sector} className="w-[18px] h-[18px] text-[#0B3D2E]/70" />
                        <span className="text-sm font-semibold text-[#0B3D2E]">{meta.label}</span>
                        <span className="text-[11px] text-[#4B5563]">{data.count}</span>
                      </div>
                      <span className="text-sm font-semibold text-[#0B3D2E] tabular-nums">
                        {Math.round(data.co2)} kg
                        <span className="text-[#4B5563] font-normal ml-1.5 text-xs">{pct}%</span>
                      </span>
                    </div>
                    <div className="w-full bg-[#E8E4DF] rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${meta.bar} transition-all duration-700`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="overflow-hidden max-h-0 group-hover:max-h-8 transition-all duration-300 ease-out">
                      <p className="text-[11px] text-[#4B5563] mt-1.5 tabular-nums">
                        ${data.spend.toFixed(2)} spent · {(data.co2 / data.spend).toFixed(2)} kg per dollar
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/60 shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="fc-heading text-lg mb-5">Grade Distribution</h2>
          <div className="space-y-2.5 mb-5">
            {Object.entries(summary.gradeDistribution).map(([grade, count]) => {
              const pct = summary.count > 0 ? Math.round((count / summary.count) * 100) : 0
              return (
                <div key={grade} className="flex items-center gap-3 group cursor-default">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-transform duration-200 group-hover:scale-110 ${gradeChipClass(grade)}`}>
                    {grade}
                  </span>
                  <div className="flex-1 relative">
                    <div className="w-full bg-[#E8E4DF] rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${gradeBarColor(grade)} transition-all duration-500`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                    <span className="text-xs text-[#374151] tabular-nums w-16 text-right">
                    {count} <span className="text-[#6B7280]">({pct}%)</span>
                  </span>
                </div>
              )
            })}
          </div>
          <div className="border-t border-[#E8E4DF] pt-3">
            <div className="flex justify-between text-[10px] text-[#6B7280] tabular-nums">
              <span>A ≤ 1 kg</span><span>B ≤ 3</span><span>C ≤ 8</span><span>D ≤ 20</span><span>F &gt; 20</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Reduction suggestions ── */}
      <div className={`bg-white rounded-2xl border border-gray-200/60 shadow-lg p-6 mb-8 transition-all duration-300 ${isOver ? '!border-red-200' : 'hover:border-[#C5E867]'}`}>
        <h2 className="fc-heading text-lg mb-1">
          {isOver ? 'Recommended Actions' : 'Ways to Reduce'}
        </h2>
        <p className="text-sm text-[#4B5563] mb-5">
          {isOver
            ? `You're ${Math.round(summary.totalCO2 - MONTHLY_BUDGET_KG)} kg over your monthly carbon budget. Start with your highest-impact sectors.`
            : 'Small changes in your top spending categories can make a meaningful difference.'}
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {reductions.map((r, i) => {
            const sectorMeta = SECTOR_META[r.sector]
            return (
              <div
                key={i}
                className={`rounded-xl p-4 border transition-all duration-200 cursor-default
                  ${r.urgent
                    ? 'border-red-200 bg-red-50/40 hover:bg-red-50 hover:border-red-300 hover:shadow-sm'
                    : 'border-[#E8E4DF] bg-white hover:bg-[#FFF5EB] hover:border-[#C5E867]/50 hover:shadow-sm'
                  } hover:-translate-y-0.5`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${r.urgent ? 'bg-red-100' : 'bg-[#0B3D2E]/5'}`}>
                    {r.urgent
                      ? <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      : <SectorIcon sector={r.sector} className="w-4 h-4 text-[#0B3D2E]/60" />
                    }
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-[#0B3D2E] text-sm leading-snug">{r.title}</h4>
                    <p className={`text-xs mt-1 leading-relaxed ${r.urgent ? 'text-red-600' : 'text-[#374151]'}`}>
                      {r.impact}
                    </p>
                    {sectorMeta && r.sector !== 'Critical' && r.sector !== 'Warning' && (
                      <span className={`inline-flex items-center gap-1 mt-2 text-[10px] font-medium px-2 py-0.5 rounded-full ring-1 ${sectorMeta.tag}`}>
                        {sectorMeta.label}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Transactions ── */}
      <div className="bg-white rounded-2xl border border-gray-200/60 shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="fc-heading text-lg">Transactions</h2>
          <span className="text-xs text-[#6B7280] tabular-nums">{filteredTxns.length} results</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {sectors.map((s) => {
            const meta = SECTOR_META[s]
            const active = filter === s
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  active
                    ? 'bg-[#0B3D2E] text-white shadow-sm'
                    : 'bg-[#FFF5EB] text-[#374151] hover:bg-[#E8E4DF] hover:text-[#0B3D2E]'
                }`}
              >
                {s === 'all' ? 'All' : (
                  <span className="inline-flex items-center gap-1.5">
                    <SectorIcon sector={s} className="w-3 h-3" />
                    {meta?.label || s}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <div className="space-y-0.5 max-h-[520px] overflow-y-auto">
          {filteredTxns.map((t) => {
            const meta = SECTOR_META[t.sector] || SECTOR_META.Other
            const isExpanded = expandedTxn === t.transaction_id
            return (
              <div
                key={t.transaction_id}
                onClick={() => setExpandedTxn(isExpanded ? null : t.transaction_id)}
                className={`rounded-xl transition-all duration-200 cursor-pointer border border-transparent
                  ${isExpanded
                    ? 'bg-[#FFF5EB] shadow-sm border-[#E8E4DF]'
                    : 'hover:bg-[#FFF5EB]/50'
                  }`}
              >
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-transform duration-200 ${isExpanded ? 'scale-110' : ''} ${gradeChipClass(t.grade)}`}>
                      {t.grade}
                    </span>
                    <div className="min-w-0">
                      <p className="font-medium text-[#0B3D2E] text-sm truncate">{t.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[11px] text-[#4B5563]">{t.date}</span>
                        <span className="text-[#9CA3AF]">·</span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#4B5563]">
                          <SectorIcon sector={t.sector} className="w-3 h-3" />
                          {meta.label}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4 shrink-0">
                    <p className="font-semibold text-[#0B3D2E] text-sm tabular-nums">${t.amount.toFixed(2)}</p>
                    <p className={`text-[11px] font-semibold tabular-nums ${gradeColor(t.grade)}`}>{t.kgCO2} kg CO₂</p>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-3 pb-3">
                    <div className="border-t border-[#E8E4DF] pt-3 grid grid-cols-3 gap-4 text-xs">
                      <div>
                        <p className="text-[#6B7280] mb-0.5">Intensity</p>
                        <p className="font-semibold text-[#0B3D2E] tabular-nums">{t.multiplier} kg/$</p>
                      </div>
                      <div>
                        <p className="text-[#6B7280] mb-0.5">Rating</p>
                        <p className="font-semibold text-[#0B3D2E]">{t.grade} — {t.label}</p>
                      </div>
                      <div>
                        <p className="text-[#6B7280] mb-0.5">Category</p>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full ring-1 ${meta.tag}`}>
                          <SectorIcon sector={t.sector} className="w-2.5 h-2.5" />
                          {meta.label}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
          {filteredTxns.length === 0 && (
            <p className="text-[#6B7280] text-sm text-center py-10">No transactions match this filter.</p>
          )}
        </div>
      </div>
      </div>
    </div>
  )
}

/* ── Helpers ── */

function StatCard({ label, value, sub, alert }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-200/60 shadow-lg p-5 hover:shadow-xl transition-all duration-300 cursor-default hover:-translate-y-0.5 ${alert ? '!border-red-200' : ''}`}>
      <p className="text-[10px] uppercase tracking-[0.12em] text-[#4B5563] mb-2">{label}</p>
      <p className={`text-xl font-bold tabular-nums ${alert ? 'text-red-600' : 'text-[#0B3D2E]'}`}>{value}</p>
      <p className="text-xs text-[#4B5563] mt-1">{sub}</p>
    </div>
  )
}

function gradeColor(g) {
  return { A: 'text-emerald-600', B: 'text-green-600', C: 'text-amber-600', D: 'text-orange-600', F: 'text-red-600' }[g] || 'text-gray-600'
}

function gradeStrokeColor(g) {
  return { A: 'stroke-emerald-500', B: 'stroke-green-500', C: 'stroke-amber-500', D: 'stroke-orange-500', F: 'stroke-red-500' }[g] || 'stroke-gray-400'
}

function gradeChipClass(g) {
  return {
    A: 'bg-emerald-100 text-emerald-700',
    B: 'bg-green-100 text-green-700',
    C: 'bg-amber-100 text-amber-700',
    D: 'bg-orange-100 text-orange-700',
    F: 'bg-red-100 text-red-700',
  }[g] || 'bg-gray-100 text-gray-700'
}

function gradeBarColor(g) {
  return { A: 'bg-emerald-500', B: 'bg-green-500', C: 'bg-amber-500', D: 'bg-orange-500', F: 'bg-red-500' }[g] || 'bg-gray-400'
}
