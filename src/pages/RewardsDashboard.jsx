const tiers = [
  {
    name: 'Seedling',
    icon: '🌱',
    threshold: 0,
    perks: ['Basic carbon tracking', 'Monthly summary reports'],
    unlocked: true,
  },
  {
    name: 'Sapling',
    icon: '🌿',
    threshold: 500,
    perks: [
      'FutureCoins — redeem for refurbished goods',
      'Energy bill credits',
      'Carbon offset matching',
    ],
    unlocked: true,
  },
  {
    name: 'Tree',
    icon: '🌳',
    threshold: 1500,
    perks: [
      '5% cashback on sustainable purchases',
      'EV rebate tracking',
      'Energy-efficient home purchase incentives',
      'FutureCard eligibility',
    ],
    unlocked: false,
  },
]

export default function RewardsDashboard() {
  const currentPoints = 820
  const nextTier = tiers.find((t) => !t.unlocked)
  const progress = nextTier
    ? Math.min(100, Math.round((currentPoints / nextTier.threshold) * 100))
    : 100

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Green Rewards</h1>
      <p className="text-gray-500 mb-8">
        Level up your green score to unlock cashback, rebates, and FutureCoins.
      </p>

      {/* Progress bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
          <span className="text-sm font-bold text-green-600">{currentPoints} FutureCoins</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
        {nextTier && (
          <p className="text-sm text-gray-500">
            {nextTier.threshold - currentPoints} points until <strong>{nextTier.name}</strong> tier
          </p>
        )}
      </div>

      {/* Tiers */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-2xl p-6 border-2 transition-all ${
              tier.unlocked
                ? 'border-green-300 bg-green-50/50'
                : 'border-gray-200 bg-white opacity-60'
            }`}
          >
            <div className="text-4xl mb-3">{tier.icon}</div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{tier.name}</h3>
            <p className="text-xs text-gray-400 mb-3">
              {tier.unlocked ? '✅ Unlocked' : `🔒 ${tier.threshold} pts`}
            </p>
            <ul className="space-y-1.5">
              {tier.perks.map((perk, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Real-world impact cards */}
      <h3 className="text-xl font-bold text-gray-900 mb-4">Real-World Impact</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <ImpactCard
          icon="💰"
          title="Carbon Tax Dividend"
          value="$142"
          desc="Estimated annual return to your household"
        />
        <ImpactCard
          icon="✈️"
          title="Flight Carbon Credits"
          value="$23"
          desc="Your LAX → JFK flight carbon credit cost"
        />
        <ImpactCard
          icon="🏨"
          title="Hotel Carbon Offset"
          value="$8"
          desc="3-night stay in NYC offset cost"
        />
        <ImpactCard
          icon="🚗"
          title="EV Rebate Eligible"
          value="$7,500"
          desc="Federal tax credit you could claim"
        />
      </div>
    </div>
  )
}

function ImpactCard({ icon, title, value, desc }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-start gap-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-400 mt-1">{desc}</p>
      </div>
    </div>
  )
}
