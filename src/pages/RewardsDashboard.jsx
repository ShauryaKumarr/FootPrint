import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import teslaImg from '../assets/tesla.jpeg'
import hiltonImg from '../assets/hilton.jpeg'
import futurecardImg from '../assets/futurecard.jpeg'
import solarImg from '../assets/solar.jpeg'
import carbonDividendImg from '../assets/carbon_refund.jpeg'
import flightImg from '../assets/flight.jpeg'

// Past 3 months green spending (for chart)
const monthlyGreenSpending = [
  { month: 'Dec 2024', amount: 420, points: 210 },
  { month: 'Jan 2025', amount: 580, points: 290 },
  { month: 'Feb 2025', amount: 640, points: 320 },
]

const FUTURECARD_URL = 'https://www.futurecard.co/futurecard'
const TREE_TIER_THRESHOLD = 1500

const CHART_GRADIENT_ID = 'chartGradient'

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-slate-800/95 backdrop-blur border border-slate-700/50 rounded-xl shadow-xl px-4 py-3 text-white">
      <p className="font-semibold text-slate-100">{d.month}</p>
      <p className="text-sm text-slate-300">Spending: ${d.amount}</p>
      <p className="text-sm text-teal-300 font-medium">Points: {d.points}</p>
    </div>
  )
}

export default function RewardsDashboard() {
  const currentPoints = 820
  const progress = Math.min(100, Math.round((currentPoints / TREE_TIER_THRESHOLD) * 100))
  const pointsToNextTier = TREE_TIER_THRESHOLD - currentPoints
  const threeMonthTotal = monthlyGreenSpending.reduce((s, m) => s + m.amount, 0)
  const threeMonthPoints = monthlyGreenSpending.reduce((s, m) => s + m.points, 0)

  return (
    <div className="min-h-screen rewards-page-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 heading-font">
            Green Rewards
          </h1>
          <p className="text-slate-600 mt-2 text-base sm:text-lg max-w-xl section-subtitle">
            Level up your green score to unlock cashback, rebates, and FutureCoins.
          </p>
        </header>

        {/* Chart card – premium styling */}
        <section className="rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white/90 backdrop-blur shadow-xl shadow-slate-200/30 overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 section-subtitle heading-font">
              Green spending & tier progress
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Past 3 months total:{' '}
              <strong className="text-slate-700">${threeMonthTotal.toLocaleString()}</strong> green spending →{' '}
              <strong className="text-teal-600">{threeMonthPoints} points</strong> earned
            </p>
            <div className="rounded-xl bg-linear-to-br from-slate-50 to-teal-50/30 p-4 sm:p-5 border border-slate-100">
              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyGreenSpending}
                    margin={{ top: 12, right: 12, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id={CHART_GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#0d9488" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12, fill: '#64748b', fontFamily: 'inherit' }}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: '#64748b', fontFamily: 'inherit' }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `$${v}`}
                    />
                    <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#94a3b8', strokeWidth: 1 }} />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#0d9488"
                      strokeWidth={2.5}
                      fill={`url(#${CHART_GRADIENT_ID})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="border-t border-slate-100 pt-5 mt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">
                  Progress to <strong className="text-slate-800">Tree</strong> tier (5% cashback)
                </span>
                <span className="text-sm font-bold text-teal-600">
                  {currentPoints} / {TREE_TIER_THRESHOLD} pts
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-linear-to-r from-teal-500 to-cyan-500 transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-slate-500 mt-2">
                <strong>{pointsToNextTier} points</strong> to unlock 5% cashback & FutureCard benefits
              </p>
            </div>
          </div>
        </section>

        {/* FutureCard CTA – below chart, with image */}
        <section className="mb-10">
          <a
            href={FUTURECARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white/90 backdrop-blur shadow-xl shadow-slate-200/30 overflow-hidden transition-all hover:shadow-2xl hover:shadow-teal-200/20 hover:border-teal-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-6">
              <div className="aspect-2/1 sm:aspect-auto sm:w-72 sm:min-h-[180px] bg-slate-100 relative overflow-hidden">
                <img
                  src={futurecardImg}
                  alt="FutureCard"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center">
                <p className="text-sm font-medium text-teal-600 uppercase tracking-wider mb-1">
                  You qualify
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                  Get your FutureCard
                </h3>
                <p className="text-slate-600 text-sm sm:text-base mb-4">
                  Earn cashback on green spending. No annual fee, no credit check.
                </p>
                <span className="inline-flex items-center gap-2 text-teal-600 font-semibold group-hover:gap-3 transition-all">
                  Learn more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          </a>
        </section>

        {/* Your green purchases */}
        <section className="mb-10">
          <h2 className="text-2xl sm:text-3xl section-title mb-4">Your green purchases</h2>
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            <article className="rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur shadow-lg overflow-hidden flex flex-col">
              <div className="aspect-video bg-slate-100 relative overflow-hidden">
                <img
                  src={teslaImg}
                  alt="Tesla Model 3"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">EV purchase</p>
                <h3 className="font-bold text-slate-900 text-lg mt-1 heading-font">Tesla Model 3</h3>
                <p className="text-sm text-slate-500">Jan 18, 2025 · $42,990</p>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-sm font-semibold text-teal-600">Tax rebate you’ll get</p>
                  <p className="text-sm text-slate-600 mt-0.5">
                    You’re eligible for up to <strong>$7,500</strong> federal EV tax credit. We’ll remind you at tax time and
                    help you claim it.
                  </p>
                </div>
              </div>
            </article>
            <article className="rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur shadow-lg overflow-hidden flex flex-col">
              <div className="aspect-video bg-slate-100 relative overflow-hidden">
                <img
                  src={hiltonImg}
                  alt="Hilton New York Midtown"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Upcoming trip</p>
                <h3 className="font-bold text-slate-900 text-lg mt-1 heading-font">Hilton New York Midtown</h3>
                <p className="text-sm text-slate-500">Mar 12–15, 2025 · 3 nights</p>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-sm font-semibold text-teal-600">Points you’ll earn</p>
                  <p className="text-sm text-slate-600 mt-0.5">
                    This stay will earn you approximately <strong>480 points</strong> (green hotel bonus). Book with your
                    linked card to count.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Suggested alternatives */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl section-title mb-1">Suggested alternatives</h2>
          <p className="text-slate-600 text-sm sm:text-base mb-6 max-w-2xl section-subtitle">
            Based on your spending, these swaps could lower your bills and increase your green score.
          </p>
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            <article className="rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur shadow-lg overflow-hidden flex flex-col">
              <div className="aspect-16/10 bg-slate-100 overflow-hidden">
                <img
                  src={solarImg}
                  alt="Rooftop solar panels"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider">Energy</p>
                <h3 className="font-bold text-slate-900 text-lg mt-1 heading-font">Electricity → Solar</h3>
                <p className="text-sm text-slate-500 mt-1">Current: ~$187/mo</p>
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  <p className="text-sm text-slate-600">
                    Estimated savings with solar: <strong className="text-slate-900">$1,200/year</strong>. Local installers in your area offer rebates; we track eligibility in your Carbon Profile.
                  </p>
                  <a href="/profile" className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-600 hover:text-teal-700 mt-2">
                    View options
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </a>
                </div>
              </div>
            </article>
            <article className="rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur shadow-lg overflow-hidden flex flex-col">
              <div className="aspect-16/10 bg-slate-100 overflow-hidden">
                <img
                  src={flightImg}
                  alt="Public transit"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider">Transport</p>
                <h3 className="font-bold text-slate-900 text-lg mt-1 heading-font">Commute → Transit</h3>
                <p className="text-sm text-slate-500 mt-1">Earn up to 5% back on eligible transit</p>
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  <p className="text-sm text-slate-600">
                    Switching two trips per week to bus or rail could save ~<strong className="text-slate-900">$340/year</strong> in fuel and earn extra FutureCoins. Link your transit card in Profile.
                  </p>
                  <a href="/profile" className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-600 hover:text-teal-700 mt-2">
                    Set up
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Real-world impact – horizontal list layout */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl section-title mb-1">Real-world impact</h2>
          <p className="text-slate-600 text-sm sm:text-base mb-8 max-w-2xl section-subtitle">
            How your choices translate into dollars, offsets, and eligibility for credits.
          </p>
          <div className="space-y-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur shadow-xl">
            <ImpactRow
              imageSrc={carbonDividendImg}
              imageAlt="Savings and sustainability"
              label="Carbon dividend"
              title="Carbon tax dividend"
              value="$142"
              valueLabel="Est. annual return"
              body="Under current carbon-pricing proposals, households receive a per-capita dividend. Your lower-carbon spending puts you ahead—you’re likely to receive more back than you pay in."
              accent="teal"
            />
            <ImpactRow
              imageSrc={flightImg}
              imageAlt="Flight and travel"
              label="Travel"
              title="Flight carbon credits"
              value="$23"
              valueLabel="Offset cost (LAX–JFK)"
              body="Cost to offset your round-trip emissions at verified rates. You can buy credits (e.g. forestry or renewable projects) through our partners in the app."
              accent="cyan"
            />
            <ImpactRow
              imageSrc={hiltonImg}
              imageAlt="Hotel stay"
              label="Accommodation"
              title="Hotel carbon offset"
              value="$8"
              valueLabel="3-night NYC stay"
              body="Many properties offer optional offsets at checkout. This is our estimate to neutralize the footprint of your upcoming stay."
              accent="emerald"
            />
            <ImpactRow
              imageSrc={teslaImg}
              imageAlt="Electric vehicle"
              label="EV incentive"
              title="EV rebate eligible"
              value="$7,500"
              valueLabel="Federal tax credit"
              body="Your Tesla Model 3 purchase qualifies for the full credit. We’ll remind you at tax time and help you keep the right documentation."
              accent="teal"
            />
          </div>
        </section>
      </div>
    </div>
  )
}

function ImpactRow({ imageSrc, imageAlt, label, title, value, valueLabel, body, accent }) {
  const accentColors = {
    teal: 'border-l-teal-500 bg-teal-50/30',
    cyan: 'border-l-cyan-500 bg-cyan-50/20',
    emerald: 'border-l-emerald-500 bg-emerald-50/30',
  }
  const accentClass = accentColors[accent] || accentColors.teal

  return (
    <article className={`flex flex-col sm:flex-row border-b border-slate-100 last:border-b-0 ${accentClass} border-l-4`}>
      <div className="sm:w-48 lg:w-56 shrink-0 aspect-video sm:aspect-square sm:min-h-[140px] bg-slate-100 overflow-hidden">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-center">
        {label && (
          <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider">{label}</p>
        )}
        <h3 className="font-bold text-slate-900 text-lg sm:text-xl mt-1 heading-font">
          {title}
        </h3>
        <div className="flex flex-wrap items-baseline gap-2 mt-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight heading-font">
            {value}
          </span>
          <span className="text-xs text-slate-500">{valueLabel}</span>
        </div>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">{body}</p>
      </div>
    </article>
  )
}
