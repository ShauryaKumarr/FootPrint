import { useState, useEffect, useCallback } from 'react'
import { usePlaidLink } from 'react-plaid-link'
import { scoreTransactions, getBudgetStatus, getReductions, MONTHLY_BUDGET_KG } from '../utils/carbonScoring'
import { MOCK_TRANSACTIONS } from '../utils/mockTransactions'
import { useProfile } from '../context/ProfileContext'

const API_BASE = 'http://localhost:3001'

const SECTOR_META = {
  Transport: { icon: '✈️', color: 'bg-red-400',    text: 'text-red-600' },
  Food:      { icon: '🍔', color: 'bg-orange-400', text: 'text-orange-600' },
  Fashion:   { icon: '👗', color: 'bg-yellow-400', text: 'text-yellow-600' },
  Energy:    { icon: '⚡', color: 'bg-blue-400',   text: 'text-blue-600' },
  Shopping:  { icon: '🛒', color: 'bg-purple-400', text: 'text-purple-600' },
  Other:     { icon: '📦', color: 'bg-gray-400',   text: 'text-gray-600' },
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Carbon Profile</h1>
        <p className="text-gray-500 mb-8">
          Connect your bank account to auto-categorize every purchase and estimate its carbon footprint.
        </p>

        <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center mb-6">
          <div className="text-6xl mb-5">🏦</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect Your Bank</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Link your bank account via Plaid to import the last 30 days of transactions.
            We&apos;ll score every purchase for its carbon impact.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => openPlaid()}
              disabled={!plaidReady || loading}
              className="px-8 py-3.5 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Connecting...' : '🔗 Connect with Plaid'}
            </button>
            <button
              onClick={loadDemo}
              className="px-8 py-3.5 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              🎮 Try Demo Mode
            </button>
          </div>

          {!linkToken && (
            <p className="mt-4 text-xs text-gray-400">
              Plaid server not detected — use Demo Mode to explore, or start the backend with <code className="bg-gray-100 px-1.5 py-0.5 rounded">npm run server</code>
            </p>
          )}

          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 text-center">
          <p className="text-sm text-gray-600">
            <strong>Sandbox mode:</strong> Use credentials{' '}
            <code className="bg-white px-1.5 py-0.5 rounded text-green-700">user_good</code> /{' '}
            <code className="bg-white px-1.5 py-0.5 rounded text-green-700">pass_good</code> in the Plaid modal.
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
  const overallGradeColors = { A: 'from-green-500 to-emerald-500', B: 'from-emerald-500 to-teal-500', C: 'from-yellow-500 to-amber-500', D: 'from-orange-500 to-red-400', F: 'from-red-500 to-red-700' }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Carbon Profile</h1>
          <p className="text-gray-500 mt-1">
            {mode === 'demo' ? '🎮 Demo mode' : '🔗 Connected via Plaid'} — {summary.count} transactions scored
          </p>
        </div>
        <button onClick={disconnect} className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
          Disconnect
        </button>
      </div>

      {/* Top row: Overall grade + summary cards */}
      <div className="grid sm:grid-cols-5 gap-4 mb-8">
        <div className={`sm:col-span-1 rounded-2xl p-5 bg-gradient-to-br ${overallGradeColors[overallGrade]} text-white flex flex-col items-center justify-center`}>
          <p className="text-xs uppercase tracking-wider opacity-80 mb-1">Overall</p>
          <p className="text-5xl font-black">{overallGrade}</p>
          <p className="text-xs opacity-80 mt-1">{summary.greenPct}% green</p>
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
      <div className={`rounded-2xl border p-6 mb-8 ${budget.status === 'over' ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Carbon Budget</h3>
          <span className={`text-sm font-bold ${budget.color}`}>
            {Math.round(summary.totalCO2)} / {MONTHLY_BUDGET_KG} kg CO₂
            {budget.pct > 100 && ` (${budget.pct}%)`}
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-5 overflow-hidden mb-2">
          <div
            className={`h-full rounded-full ${budget.barColor} transition-all duration-1000`}
            style={{ width: `${Math.min(budget.pct, 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <p className={`text-sm font-medium ${budget.color}`}>{budget.message}</p>
          {budget.status === 'over' && (
            <span className="text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded-full font-semibold">
              {Math.round(summary.totalCO2 - MONTHLY_BUDGET_KG)} kg over
            </span>
          )}
        </div>
      </div>

      {/* Sector breakdown + Grade distribution */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Breakdown by Sector</h3>
          {sectorEntries.length === 0 ? (
            <p className="text-gray-400 text-sm italic">No categorized transactions</p>
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
                        <span className="text-sm font-semibold text-gray-800">{sector}</span>
                        <span className="text-xs text-gray-400">({data.count} txn{data.count !== 1 ? 's' : ''})</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-gray-700">{Math.round(data.co2)} kg</span>
                        <span className="text-xs text-gray-400 ml-1">({pct}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${meta.color} transition-all duration-700`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      ${data.spend.toFixed(2)} spent · {(data.co2 / data.spend).toFixed(2)} kg CO₂ per dollar
                    </p>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Grades</h3>
          <div className="grid grid-cols-5 gap-3 mb-5">
            {Object.entries(summary.gradeDistribution).map(([grade, count]) => {
              const colors = {
                A: 'bg-green-100 text-green-700 border-green-200',
                B: 'bg-emerald-100 text-emerald-700 border-emerald-200',
                C: 'bg-yellow-100 text-yellow-700 border-yellow-200',
                D: 'bg-orange-100 text-orange-700 border-orange-200',
                F: 'bg-red-100 text-red-700 border-red-200',
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
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-600 mb-2">Grade Scale</p>
            <div className="grid grid-cols-5 gap-1 text-[10px] text-gray-500 text-center">
              <span>≤1 kg</span><span>≤3 kg</span><span>≤8 kg</span><span>≤20 kg</span><span>&gt;20 kg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reduction suggestions */}
      <div className={`rounded-2xl border p-6 mb-8 ${
        budget.status === 'over'
          ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'
          : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
      }`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {budget.status === 'over' ? '🚨 Action Needed — Reduce Your Footprint' : '💡 Tips to Reduce Your Footprint'}
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {reductions.map((r, i) => (
            <div
              key={i}
              className={`rounded-xl p-4 border ${
                r.urgent
                  ? 'bg-white border-red-200 ring-1 ring-red-100'
                  : 'bg-white border-green-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{r.icon}</span>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{r.title}</h4>
                  <p className={`text-xs mt-1 ${r.urgent ? 'text-red-600 font-medium' : 'text-green-700'}`}>
                    {r.impact}
                  </p>
                  {r.sector !== 'Critical' && r.sector !== 'Warning' && (
                    <span className="inline-block mt-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {r.sector}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction list with sector filter */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Transactions <span className="text-gray-400 font-normal">({filteredTxns.length})</span>
          </h3>
        </div>

        {/* Sector filter pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {sectors.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                filter === s
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-sm font-bold shrink-0 ${t.bg} ${t.color}`}>
                  {t.grade}
                </span>
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">{t.name}</p>
                  <p className="text-xs text-gray-400">
                    {t.date} · <span className={SECTOR_META[t.sector]?.text || 'text-gray-500'}>{t.sector}</span>
                  </p>
                </div>
              </div>
              <div className="text-right ml-4 shrink-0">
                <p className="font-semibold text-gray-900">${t.amount.toFixed(2)}</p>
                <p className={`text-xs font-bold ${t.color}`}>{t.kgCO2} kg CO₂</p>
              </div>
            </div>
          ))}
          {filteredTxns.length === 0 && (
            <p className="text-gray-400 text-sm italic text-center py-8">No transactions in this sector</p>
          )}
        </div>
      </div>
    </div>
  )
}

function SummaryCard({ label, value, subtitle, icon, accent, alert }) {
  return (
    <div className={`rounded-2xl p-5 border ${
      alert ? 'bg-red-50 border-red-200' : accent ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">{label}</p>
        {icon && <span className="text-lg">{icon}</span>}
      </div>
      <p className={`text-2xl font-bold ${alert ? 'text-red-700' : accent ? 'text-green-700' : 'text-gray-900'}`}>{value}</p>
      <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
    </div>
  )
}
