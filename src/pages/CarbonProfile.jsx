export default function CarbonProfile() {
  const categories = [
    { name: 'Transport', icon: '✈️', pct: 35, color: 'bg-red-400' },
    { name: 'Food', icon: '🍔', pct: 25, color: 'bg-orange-400' },
    { name: 'Fashion', icon: '👗', pct: 15, color: 'bg-yellow-400' },
    { name: 'Energy', icon: '⚡', pct: 12, color: 'bg-blue-400' },
    { name: 'Shopping', icon: '🛒', pct: 8, color: 'bg-purple-400' },
    { name: 'Other', icon: '📦', pct: 5, color: 'bg-gray-400' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Carbon Profile</h1>
      <p className="text-gray-500 mb-8">
        Connect your bank account to auto-categorize purchases and estimate your carbon footprint.
      </p>

      {/* Plaid connect placeholder */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8 text-center">
        <div className="text-5xl mb-4">🏦</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Connect Your Bank</h2>
        <p className="text-gray-500 mb-6">
          Link your bank account via Plaid to automatically import and analyze transactions.
        </p>
        <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-md shadow-green-200">
          Connect with Plaid
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <SummaryCard label="Total Spend" value="$2,340" subtitle="This month" />
        <SummaryCard label="CO₂ Produced" value="487 kg" subtitle="Estimated" />
        <SummaryCard label="Green Score" value="62%" subtitle="B rating" accent />
      </div>

      {/* Category breakdown */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Breakdown by Category</h3>
        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat.name} className="flex items-center gap-3">
              <span className="text-xl w-8">{cat.icon}</span>
              <span className="w-24 text-sm font-medium text-gray-700">{cat.name}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full ${cat.color} transition-all duration-700`}
                  style={{ width: `${cat.pct}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-gray-600 w-10 text-right">{cat.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Placeholder transaction list */}
      <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
        <p className="text-gray-400 text-sm italic">
          Transactions will appear here once your bank account is connected.
        </p>
      </div>
    </div>
  )
}

function SummaryCard({ label, value, subtitle, accent }) {
  return (
    <div className={`rounded-2xl p-5 border ${accent ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${accent ? 'text-green-700' : 'text-gray-900'}`}>{value}</p>
      <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
    </div>
  )
}
