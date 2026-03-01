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
    <div className="bg-[#0B3D2E] border border-[#0B3D2E]/20 rounded-xl shadow-xl px-4 py-3 text-white">
      <p className="font-semibold">{d.month}</p>
      <p className="text-sm text-white/70">Spending: ${d.amount}</p>
      <p className="text-sm text-[#C5E867] font-medium">Points: {d.points}</p>
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
    <div className="min-h-screen bg-[#FFF5EB]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <header className="mb-10">
          <h1
            className="text-3xl sm:text-4xl text-[#0B3D2E]"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Green Rewards
          </h1>
          <p className="text-[#4A5568] mt-2 text-base sm:text-lg max-w-xl">
            Level up your green score to unlock cashback, rebates, and FutureCoins.
          </p>
        </header>

        {/* Chart card */}
        <section className="fc-card overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <h2
              className="text-lg sm:text-xl text-[#0B3D2E] mb-1"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Green spending &amp; tier progress
            </h2>
            <p className="text-sm text-[#4A5568] mb-6">
              Past 3 months total:{' '}
              <strong className="text-[#0B3D2E]">${threeMonthTotal.toLocaleString()}</strong> green spending &rarr;{' '}
              <strong className="text-[#0B3D2E]">{threeMonthPoints} points</strong> earned
            </p>
            <div className="rounded-xl bg-[#FFF5EB] p-4 sm:p-5 border border-[#E8E4DF]">
              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyGreenSpending} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id={CHART_GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0B3D2E" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#0B3D2E" stopOpacity={0.03} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E8E4DF" vertical={false} />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12, fill: '#4A5568', fontFamily: 'inherit' }}
                      axisLine={{ stroke: '#E8E4DF' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: '#4A5568', fontFamily: 'inherit' }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `$${v}`}
                    />
                    <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#0B3D2E', strokeWidth: 1, strokeOpacity: 0.2 }} />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#0B3D2E"
                      strokeWidth={2.5}
                      fill={`url(#${CHART_GRADIENT_ID})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="border-t border-[#E8E4DF] pt-5 mt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#4A5568]">
                  Progress to <strong className="text-[#0B3D2E]">Tree</strong> tier (5% cashback)
                </span>
                <span className="text-sm font-bold text-[#0B3D2E]">
                  {currentPoints} / {TREE_TIER_THRESHOLD} pts
                </span>
              </div>
              <div className="w-full bg-[#E8E4DF] rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#0B3D2E] transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-[#4A5568] mt-2">
                <strong>{pointsToNextTier} points</strong> to unlock 5% cashback &amp; FutureCard benefits
              </p>
            </div>
          </div>
        </section>

        {/* FutureCard CTA – lime accent */}
        <section className="mb-10">
          <a
            href={FUTURECARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group block fc-card-lime overflow-hidden transition-all hover:shadow-lg"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-6">
              <div className="aspect-2/1 sm:aspect-auto sm:w-72 sm:min-h-[180px] bg-[#0B3D2E]/5 relative overflow-hidden rounded-tl-[1rem] rounded-bl-none sm:rounded-bl-[1rem]">
                <img
                  src={futurecardImg}
                  alt="FutureCard"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center">
                <p className="text-sm font-semibold text-[#0B3D2E]/60 uppercase tracking-wider mb-1">
                  You qualify
                </p>
                <h3
                  className="text-xl sm:text-2xl text-[#0B3D2E] mb-2"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  Get your FutureCard
                </h3>
                <p className="text-[#0B3D2E]/70 text-sm sm:text-base mb-4">
                  Earn cashback on green spending. No annual fee, no credit check.
                </p>
                <span className="inline-flex items-center gap-2 text-[#0B3D2E] font-semibold group-hover:gap-3 transition-all text-sm">
                  Learn more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          </a>
        </section>

        {/* Green purchases */}
        <section className="mb-10">
          <h2
            className="text-2xl sm:text-3xl text-[#0B3D2E] mb-5"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Your green purchases
          </h2>
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            <article className="fc-card overflow-hidden flex flex-col">
              <div className="aspect-video bg-[#E8E4DF] relative overflow-hidden">
                <img src={teslaImg} alt="Tesla Model 3" className="w-full h-full object-cover" />
              </div>
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <p className="text-xs font-medium text-[#4A5568] uppercase tracking-wider">EV purchase</p>
                <h3 className="font-bold text-[#0B3D2E] text-lg mt-1">Tesla Model 3</h3>
                <p className="text-sm text-[#4A5568]">Jan 18, 2025 &middot; $42,990</p>
                <div className="mt-4 pt-4 border-t border-[#E8E4DF]">
                  <p className="text-sm font-semibold text-[#0B3D2E]">Tax rebate you&apos;ll get</p>
                  <p className="text-sm text-[#4A5568] mt-0.5">
                    You&apos;re eligible for up to <strong className="text-[#0B3D2E]">$7,500</strong> federal EV tax credit.
                    We&apos;ll remind you at tax time and help you claim it.
                  </p>
                </div>
              </div>
            </article>
            <article className="fc-card overflow-hidden flex flex-col">
              <div className="aspect-video bg-[#E8E4DF] relative overflow-hidden">
                <img src={hiltonImg} alt="Hilton New York Midtown" className="w-full h-full object-cover" />
              </div>
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <p className="text-xs font-medium text-[#4A5568] uppercase tracking-wider">Upcoming trip</p>
                <h3 className="font-bold text-[#0B3D2E] text-lg mt-1">Hilton New York Midtown</h3>
                <p className="text-sm text-[#4A5568]">Mar 12–15, 2025 &middot; 3 nights</p>
                <div className="mt-4 pt-4 border-t border-[#E8E4DF]">
                  <p className="text-sm font-semibold text-[#0B3D2E]">Points you&apos;ll earn</p>
                  <p className="text-sm text-[#4A5568] mt-0.5">
                    This stay will earn you approximately <strong className="text-[#0B3D2E]">480 points</strong> (green
                    hotel bonus). Book with your linked card to count.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Suggested alternatives */}
        <section className="mb-12">
          <h2
            className="text-2xl sm:text-3xl text-[#0B3D2E] mb-1"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Suggested alternatives
          </h2>
          <p className="text-[#4A5568] text-sm sm:text-base mb-6 max-w-2xl">
            Based on your spending, these swaps could lower your bills and increase your green score.
          </p>
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            <article className="fc-card overflow-hidden flex flex-col">
              <div className="aspect-16/10 bg-[#E8E4DF] overflow-hidden">
                <img src={solarImg} alt="Rooftop solar panels" className="w-full h-full object-cover" />
              </div>
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <p className="text-xs font-semibold text-[#0B3D2E] uppercase tracking-wider">Energy</p>
                <h3 className="font-bold text-[#0B3D2E] text-lg mt-1">Electricity &rarr; Solar</h3>
                <p className="text-sm text-[#4A5568] mt-1">Current: ~$187/mo</p>
                <div className="mt-4 pt-4 border-t border-[#E8E4DF] space-y-2">
                  <p className="text-sm text-[#4A5568]">
                    Estimated savings with solar: <strong className="text-[#0B3D2E]">$1,200/year</strong>. Local installers
                    in your area offer rebates; we track eligibility in your Carbon Profile.
                  </p>
                  <a href="/profile" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0B3D2E] hover:opacity-70 mt-2">
                    View options
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
            <article className="fc-card overflow-hidden flex flex-col">
              <div className="aspect-16/10 bg-[#E8E4DF] overflow-hidden">
                <img src={flightImg} alt="Public transit" className="w-full h-full object-cover" />
              </div>
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <p className="text-xs font-semibold text-[#0B3D2E] uppercase tracking-wider">Transport</p>
                <h3 className="font-bold text-[#0B3D2E] text-lg mt-1">Commute &rarr; Transit</h3>
                <p className="text-sm text-[#4A5568] mt-1">Earn up to 5% back on eligible transit</p>
                <div className="mt-4 pt-4 border-t border-[#E8E4DF] space-y-2">
                  <p className="text-sm text-[#4A5568]">
                    Switching two trips per week to bus or rail could save ~<strong className="text-[#0B3D2E]">$340/year</strong> in
                    fuel and earn extra FutureCoins. Link your transit card in Profile.
                  </p>
                  <a href="/profile" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0B3D2E] hover:opacity-70 mt-2">
                    Set up
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Real-world impact */}
        <section className="mb-12">
          <h2
            className="text-2xl sm:text-3xl text-[#0B3D2E] mb-1"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Real-world impact
          </h2>
          <p className="text-[#4A5568] text-sm sm:text-base mb-8 max-w-2xl">
            How your choices translate into dollars, offsets, and eligibility for credits.
          </p>
          <div className="space-y-0 overflow-hidden fc-card">
            <ImpactRow
              imageSrc={carbonDividendImg}
              imageAlt="Savings and sustainability"
              label="Carbon dividend"
              title="Carbon tax dividend"
              value="$142"
              valueLabel="Est. annual return"
              body="Under current carbon-pricing proposals, households receive a per-capita dividend. Your lower-carbon spending puts you ahead—you're likely to receive more back than you pay in."
            />
            <ImpactRow
              imageSrc={flightImg}
              imageAlt="Flight and travel"
              label="Travel"
              title="Flight carbon credits"
              value="$23"
              valueLabel="Offset cost (LAX–JFK)"
              body="Cost to offset your round-trip emissions at verified rates. You can buy credits (e.g. forestry or renewable projects) through our partners in the app."
            />
            <ImpactRow
              imageSrc={hiltonImg}
              imageAlt="Hotel stay"
              label="Accommodation"
              title="Hotel carbon offset"
              value="$8"
              valueLabel="3-night NYC stay"
              body="Many properties offer optional offsets at checkout. This is our estimate to neutralize the footprint of your upcoming stay."
            />
            <ImpactRow
              imageSrc={teslaImg}
              imageAlt="Electric vehicle"
              label="EV incentive"
              title="EV rebate eligible"
              value="$7,500"
              valueLabel="Federal tax credit"
              body="Your Tesla Model 3 purchase qualifies for the full credit. We'll remind you at tax time and help you keep the right documentation."
            />
          </div>
        </section>
      </div>
    </div>
  )
}

function ImpactRow({ imageSrc, imageAlt, label, title, value, valueLabel, body }) {
  return (
    <article className="flex flex-col sm:flex-row border-b border-[#E8E4DF] last:border-b-0">
      <div className="sm:w-48 lg:w-56 shrink-0 aspect-video sm:aspect-square sm:min-h-[140px] bg-[#E8E4DF] overflow-hidden">
        <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
      </div>
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-center">
        {label && (
          <p className="text-xs font-semibold text-[#0B3D2E]/60 uppercase tracking-wider">{label}</p>
        )}
        <h3 className="font-bold text-[#0B3D2E] text-lg sm:text-xl mt-1">{title}</h3>
        <div className="flex flex-wrap items-baseline gap-2 mt-2">
          <span
            className="text-2xl sm:text-3xl font-extrabold text-[#0B3D2E] tracking-tight"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            {value}
          </span>
          <span className="text-xs text-[#4A5568]">{valueLabel}</span>
        </div>
        <p className="text-sm text-[#4A5568] mt-2 leading-relaxed">{body}</p>
      </div>
    </article>
  )
}
