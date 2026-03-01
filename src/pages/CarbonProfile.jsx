import { useState, useEffect, useCallback } from 'react'
import { usePlaidLink } from 'react-plaid-link'
import { scoreTransactions, getBudgetStatus, getReductions, MONTHLY_BUDGET_KG } from '../utils/carbonScoring'
import { MOCK_TRANSACTIONS } from '../utils/mockTransactions'
import { useProfile } from '../context/ProfileContext'

const API_BASE = 'http://localhost:3001'

const SECTOR_META = {
  Transport: { icon: '✈️', color: 'bg-[#0B3D2E]',   text: 'text-[#0B3D2E]' },
  Food:      { icon: '🍔', color: 'bg-[#0B3D2E]/80', text: 'text-[#0B3D2E]' },
  Fashion:   { icon: '👗', color: 'bg-[#C5E867]',     text: 'text-[#0B3D2E]' },
  Energy:    { icon: '⚡', color: 'bg-[#0B3D2E]/60', text: 'text-[#0B3D2E]' },
  Shopping:  { icon: '🛒', color: 'bg-[#C5E867]/80',  text: 'text-[#0B3D2E]' },
  Other:     { icon: '📦', color: 'bg-[#4A5568]',     text: 'text-[#4A5568]' },
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

      const results = scoreTransactions(data.transactions)
      connectBank('plaid', results)
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

  const loadDemo = () => {
    const results = scoreTransactions(MOCK_TRANSACTIONS)
    connectBank('demo', results)
  }

  const disconnect = () => {
    disconnectBank()
    setError(null)
    setFilter('all')
  }

  if (!connected || !summary) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1
          className="text-3xl text-[#0B3D2E] mb-2"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          Carbon Profile
        </h1>
        <p className="text-[#4A5568] mb-8">
          Connect your bank account to auto-categorize every purchase and estimate its carbon footprint.
        </p>

        <div className="fc-card p-10 text-center mb-6">
          <div className="text-6xl mb-5">🏦</div>
          <h2
            className="text-2xl text-[#0B3D2E] mb-2"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Connect Your Bank
          </h2>
          <p className="text-[#4A5568] mb-8 max-w-md mx-auto">
            Link your bank account via Plaid to import the last 30 days of transactions.
            We&apos;ll score every purchase for its carbon impact.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => openPlaid()}
              disabled={!plaidReady || loading}
              className="fc-btn disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Connecting...' : '🔗 Connect with Plaid'}
            </button>
            <button
              onClick={loadDemo}
              className="fc-btn-outline"
            >
              🎮 Try Demo Mode
            </button>
          </div>

          {!linkToken && (
            <p className="mt-4 text-xs text-[#4A5568]/60">
              Plaid server not detected — use Demo Mode to explore, or start the backend with <code className="bg-[#FFF5EB] px-1.5 py-0.5 rounded text-[#0B3D2E]">npm run server</code>
            </p>
          )}

          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        </div>

        <div className="fc-card-lime p-6 text-center">
          <p className="text-sm text-[#0B3D2E]/80">
            <strong>Sandbox mode:</strong> Use credentials{' '}
            <code className="bg-white/50 px-1.5 py-0.5 rounded text-[#0B3D2E]">user_good</code> /{' '}
            <code className="bg-white/50 px-1.5 py-0.5 rounded text-[#0B3D2E]">pass_good</code> in the Plaid modal.
            No real bank data is used.
          </p>
        </div>
      </div>
    )
  }

  const budget = getBudgetStatus(summary.totalCO2)
  const reductions = getReductions(summary.bySector, summary.totalCO2)
  const sectorEntries = Object.entries(summary.bySector).sort((a, b) => b[1].co2 - a[1].co2)
  const sectors = ['all', ...sectorEntries.map(([s]) => s)]
  const filteredTxns = filter === 'all' ? scored : scored.filter(t => t.sector === filter)

  const overallGrade = summary.greenPct >= 70 ? 'A' : summary.greenPct >= 50 ? 'B' : summary.greenPct >= 30 ? 'C' : summary.greenPct >= 15 ? 'D' : 'F'

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="text-3xl text-[#0B3D2E]"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Carbon Profile
          </h1>
          <p className="text-[#4A5568] mt-1">
            {mode === 'demo' ? '🎮 Demo mode' : '🔗 Connected via Plaid'} — {summary.count} transactions scored
          </p>
        </div>
        <button onClick={disconnect} className="text-sm text-[#4A5568] hover:text-[#0B3D2E] transition-colors">
          Disconnect
        </button>
      </div>

      {/* Top row: grade + summary */}
      <div className="grid sm:grid-cols-5 gap-4 mb-8">
        <div className="sm:col-span-1 rounded-2xl p-5 bg-[#0B3D2E] text-white flex flex-col items-center justify-center">
          <p className="text-xs uppercase tracking-wider opacity-70 mb-1">Overall</p>
          <p className="text-5xl font-black">{overallGrade}</p>
          <p className="text-xs opacity-70 mt-1">{summary.greenPct}% green</p>
        </div>
        <SummaryCard
          label="Total Spend"
          value={`$${summary.totalSpend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          subtitle="Last 30 days"
          icon="💳"
        />
        <SummaryCard
          label="CO₂ Produced"
          value={`${Math.round(summary.totalCO2)} kg`}
          subtitle={budget.pct > 100 ? `${budget.pct}% of budget` : `${budget.pct}% of ${MONTHLY_BUDGET_KG} kg`}
          icon="🌫️"
          alert={budget.status === 'over'}
        />
        <SummaryCard
          label="Avg per Txn"
          value={`${(summary.totalCO2 / summary.count).toFixed(1)} kg`}
          subtitle={`Across ${summary.count} purchases`}
          icon="📊"
        />
        <SummaryCard
          label="Top Sector"
          value={sectorEntries[0]?.[0] || '—'}
          subtitle={`${Math.round(sectorEntries[0]?.[1]?.co2 || 0)} kg CO₂`}
          icon={SECTOR_META[sectorEntries[0]?.[0]]?.icon || '📦'}
        />
      </div>

      {/* Monthly Carbon Budget */}
      <div className={`fc-card p-6 mb-8 ${budget.status === 'over' ? '!border-red-200 !bg-red-50' : ''}`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-[#0B3D2E]">Monthly Carbon Budget</h3>
          <span className={`text-sm font-bold ${budget.status === 'over' ? 'text-red-600' : 'text-[#0B3D2E]'}`}>
            {Math.round(summary.totalCO2)} / {MONTHLY_BUDGET_KG} kg CO₂
            {budget.pct > 100 && ` (${budget.pct}%)`}
          </span>
        </div>
        <div className="w-full bg-[#E8E4DF] rounded-full h-5 overflow-hidden mb-2">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${budget.status === 'over' ? 'bg-red-500' : 'bg-[#0B3D2E]'}`}
            style={{ width: `${Math.min(budget.pct, 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <p className={`text-sm font-medium ${budget.status === 'over' ? 'text-red-600' : 'text-[#0B3D2E]'}`}>{budget.message}</p>
          {budget.status === 'over' && (
            <span className="text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded-full font-semibold">
              {Math.round(summary.totalCO2 - MONTHLY_BUDGET_KG)} kg over
            </span>
          )}
        </div>
      </div>

      {/* Sector breakdown + Grades */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="fc-card p-6">
          <h3 className="text-lg font-semibold text-[#0B3D2E] mb-4">Breakdown by Sector</h3>
          {sectorEntries.length === 0 ? (
            <p className="text-[#4A5568] text-sm italic">No categorized transactions</p>
          ) : (
            <div className="space-y-4">
              {sectorEntries.map(([sector, data]) => {
                const meta = SECTOR_META[sector] || SECTOR_META.Other
                const pct = summary.totalCO2 > 0 ? Math.round((data.co2 / summary.totalCO2) * 100) : 0
                return (
                  <div key={sector}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{meta.icon}</span>
                        <span className="text-sm font-semibold text-[#0B3D2E]">{sector}</span>
                        <span className="text-xs text-[#4A5568]">({data.count} txn{data.count !== 1 ? 's' : ''})</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-[#0B3D2E]">{Math.round(data.co2)} kg</span>
                        <span className="text-xs text-[#4A5568] ml-1">({pct}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-[#E8E4DF] rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${meta.color} transition-all duration-700`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#4A5568] mt-1">
                      ${data.spend.toFixed(2)} spent · {(data.co2 / data.spend).toFixed(2)} kg CO₂ per dollar
                    </p>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="fc-card p-6">
          <h3 className="text-lg font-semibold text-[#0B3D2E] mb-4">Transaction Grades</h3>
          <div className="grid grid-cols-5 gap-3 mb-5">
            {Object.entries(summary.gradeDistribution).map(([grade, count]) => {
              const colors = {
                A: 'bg-[#C5E867]/30 text-[#0B3D2E] border-[#C5E867]',
                B: 'bg-[#C5E867]/20 text-[#0B3D2E] border-[#C5E867]/60',
                C: 'bg-yellow-50 text-yellow-700 border-yellow-200',
                D: 'bg-orange-50 text-orange-700 border-orange-200',
                F: 'bg-red-50 text-red-700 border-red-200',
              }
              const pct = summary.count > 0 ? Math.round((count / summary.count) * 100) : 0
              return (
                <div key={grade} className={`rounded-xl p-3 text-center border ${colors[grade]}`}>
                  <p className="text-2xl font-bold">{grade}</p>
                  <p className="text-xs mt-1">{count}</p>
                  <p className="text-[10px] opacity-60">{pct}%</p>
                </div>
              )
            })}
          </div>
          <div className="bg-[#FFF5EB] rounded-xl p-4">
            <p className="text-xs font-semibold text-[#0B3D2E] mb-2">Grade Scale</p>
            <div className="grid grid-cols-5 gap-1 text-[10px] text-[#4A5568] text-center">
              <span>≤1 kg</span><span>≤3 kg</span><span>≤8 kg</span><span>≤20 kg</span><span>&gt;20 kg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reduction suggestions */}
      <div className={`fc-card p-6 mb-8 ${budget.status === 'over' ? '!border-red-200 !bg-red-50' : ''}`}>
        <h3 className="text-lg font-semibold text-[#0B3D2E] mb-4">
          {budget.status === 'over' ? '🚨 Action Needed — Reduce Your Footprint' : '💡 Tips to Reduce Your Footprint'}
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {reductions.map((r, i) => (
            <div
              key={i}
              className={`rounded-xl p-4 border ${
                r.urgent
                  ? 'bg-white border-red-200 ring-1 ring-red-100'
                  : 'bg-white border-[#E8E4DF]'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{r.icon}</span>
                <div>
                  <h4 className="font-semibold text-[#0B3D2E] text-sm">{r.title}</h4>
                  <p className={`text-xs mt-1 ${r.urgent ? 'text-red-600 font-medium' : 'text-[#0B3D2E]/70'}`}>
                    {r.impact}
                  </p>
                  {r.sector !== 'Critical' && r.sector !== 'Warning' && (
                    <span className="inline-block mt-2 text-[10px] font-semibold uppercase tracking-wider text-[#4A5568] bg-[#FFF5EB] px-2 py-0.5 rounded-full">
                      {r.sector}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction list */}
      <div className="fc-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#0B3D2E]">
            Transactions <span className="text-[#4A5568] font-normal">({filteredTxns.length})</span>
          </h3>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {sectors.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                filter === s
                  ? 'bg-[#0B3D2E] text-white'
                  : 'bg-[#FFF5EB] text-[#4A5568] hover:bg-[#E8E4DF]'
              }`}
            >
              {s === 'all' ? 'All' : `${SECTOR_META[s]?.icon || '📦'} ${s}`}
            </button>
          ))}
        </div>

        <div className="space-y-1.5 max-h-[500px] overflow-y-auto">
          {filteredTxns.map((t) => (
            <div
              key={t.transaction_id}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-[#FFF5EB] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-sm font-bold shrink-0 ${t.bg} ${t.color}`}>
                  {t.grade}
                </span>
                <div className="min-w-0">
                  <p className="font-medium text-[#0B3D2E] truncate">{t.name}</p>
                  <p className="text-xs text-[#4A5568]">
                    {t.date} · <span className={SECTOR_META[t.sector]?.text || 'text-[#4A5568]'}>{t.sector}</span>
                  </p>
                </div>
              </div>
              <div className="text-right ml-4 shrink-0">
                <p className="font-semibold text-[#0B3D2E]">${t.amount.toFixed(2)}</p>
                <p className={`text-xs font-bold ${t.color}`}>{t.kgCO2} kg CO₂</p>
              </div>
            </div>
          ))}
          {filteredTxns.length === 0 && (
            <p className="text-[#4A5568] text-sm italic text-center py-8">No transactions in this sector</p>
          )}
        </div>
      </div>
    </div>
  )
}

function SummaryCard({ label, value, subtitle, icon, alert }) {
  return (
    <div className={`fc-card p-5 ${alert ? '!border-red-200 !bg-red-50' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-[#4A5568]">{label}</p>
        {icon && <span className="text-lg">{icon}</span>}
      </div>
      <p className={`text-2xl font-bold ${alert ? 'text-red-700' : 'text-[#0B3D2E]'}`}>{value}</p>
      <p className="text-xs text-[#4A5568] mt-1">{subtitle}</p>
    </div>
  )
}
