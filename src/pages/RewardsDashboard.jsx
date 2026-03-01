import { useRef, useEffect } from 'react'
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
import carbonDividendImg from '../assets/carbon_refund.jpeg'
import flightImg from '../assets/flight.jpeg'
import ecoCarVideo from '../assets/eco_car.mp4'
import flyingVideo from '../assets/flying.mp4'
import hotelVideo from '../assets/hotel.mp4'
import solarVideo from '../assets/solar_panel.mp4'

const monthlyGreenSpending = [
  { month: 'Jul 2024', amount: 310, points: 155 },
  { month: 'Aug 2024', amount: 370, points: 185 },
  { month: 'Sep 2024', amount: 290, points: 145 },
  { month: 'Oct 2024', amount: 450, points: 225 },
  { month: 'Nov 2024', amount: 390, points: 195 },
  { month: 'Dec 2024', amount: 420, points: 210 },
  { month: 'Jan 2025', amount: 580, points: 290 },
  { month: 'Feb 2025', amount: 640, points: 320 },
]

const FUTURECARD_URL = 'https://www.futurecard.co/futurecard'
const TREE_TIER_THRESHOLD = 1500
const CHART_GRADIENT_ID = 'chartGradient'

const SERIF = "'DM Serif Display', Georgia, serif"
const AUTO_SCROLL_SPEED = 0.8

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

function LearnMore({ dark }) {
  return (
    <span className={`inline-flex items-center gap-2 font-semibold text-sm ${dark ? 'text-white/80' : 'text-[#0B3D2E]'}`}>
      Learn more
      <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </span>
  )
}

export default function RewardsDashboard() {
  const currentPoints = 820
  const progress = Math.min(100, Math.round((currentPoints / TREE_TIER_THRESHOLD) * 100))
  const pointsToNextTier = TREE_TIER_THRESHOLD - currentPoints
  const totalSpending = monthlyGreenSpending.reduce((s, m) => s + m.amount, 0)
  const totalPoints = monthlyGreenSpending.reduce((s, m) => s + m.points, 0)
  const carouselRef = useRef(null)
  const pausedRef = useRef(false)
  const rafRef = useRef(null)

  const scrollCarousel = (dir) => {
    if (!carouselRef.current) return
    carouselRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' })
  }

  useEffect(() => {
    const tick = () => {
      const el = carouselRef.current
      if (el && !pausedRef.current) {
        el.scrollLeft += AUTO_SCROLL_SPEED
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
          el.scrollLeft = 0
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className="min-h-screen bg-[#FFF5EB]">

      {/* ── Header ── */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 pt-12 sm:pt-16 pb-6">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0B3D2E]/50 mb-3">REWARDS</p>
        <h1 className="text-4xl sm:text-5xl text-[#0B3D2E]" style={{ fontFamily: SERIF }}>
          Green Rewards
        </h1>
        <p className="text-[#4A5568] mt-3 text-base sm:text-lg max-w-2xl">
          Level up your green score to unlock cashback, rebates, and FutureCoins.
        </p>
      </div>

      {/* ── Chart card ── */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 pb-10">
        <section className="fc-card overflow-hidden">
          <div className="p-6 sm:p-10">
            <h2 className="text-xl sm:text-2xl text-[#0B3D2E] mb-1" style={{ fontFamily: SERIF }}>
              Green spending &amp; tier progress
            </h2>
            <p className="text-sm text-[#4A5568] mb-6">
              Past 8 months total:{' '}
              <strong className="text-[#0B3D2E]">${totalSpending.toLocaleString()}</strong> green spending &rarr;{' '}
              <strong className="text-[#0B3D2E]">{totalPoints} points</strong> earned
            </p>
            <div className="rounded-xl bg-[#FFF5EB] p-4 sm:p-5 border border-[#E8E4DF]">
              <div className="h-72 sm:h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyGreenSpending} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id={CHART_GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0B3D2E" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#0B3D2E" stopOpacity={0.03} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E8E4DF" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 13, fill: '#4A5568' }} axisLine={{ stroke: '#E8E4DF' }} tickLine={false} />
                    <YAxis tick={{ fontSize: 13, fill: '#4A5568' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                    <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#0B3D2E', strokeWidth: 1, strokeOpacity: 0.2 }} />
                    <Area type="monotone" dataKey="amount" stroke="#0B3D2E" strokeWidth={2.5} fill={`url(#${CHART_GRADIENT_ID})`} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="border-t border-[#E8E4DF] pt-6 mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#4A5568]">
                  Progress to <strong className="text-[#0B3D2E]">Tree</strong> tier (5% cashback)
                </span>
                <span className="text-sm font-bold text-[#0B3D2E]">{currentPoints} / {TREE_TIER_THRESHOLD} pts</span>
              </div>
              <div className="w-full bg-[#E8E4DF] rounded-full h-3 overflow-hidden">
                <div className="h-full rounded-full bg-[#0B3D2E] transition-all duration-700" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-sm text-[#4A5568] mt-3">
                <strong>{pointsToNextTier} points</strong> to unlock 5% cashback &amp; FutureCard benefits
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ── FutureCard CTA ── */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 pb-16">
        <a
          href={FUTURECARD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group block fc-card-lime overflow-hidden rounded-2xl transition-all hover:shadow-xl cursor-pointer"
        >
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="sm:w-80 lg:w-96 shrink-0 aspect-video sm:aspect-auto sm:min-h-[220px] bg-[#0B3D2E]/5 overflow-hidden">
              <img
                src={futurecardImg}
                alt="FutureCard"
                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <div className="p-8 sm:p-10 flex-1 flex flex-col justify-center">
              <p className="text-xs font-semibold text-[#0B3D2E]/50 uppercase tracking-[0.15em] mb-2">You qualify</p>
              <h3 className="text-2xl sm:text-3xl text-[#0B3D2E] mb-3" style={{ fontFamily: SERIF }}>
                Get your FutureCard
              </h3>
              <p className="text-[#0B3D2E]/70 text-base mb-5 max-w-md">
                Earn cashback on green spending. No annual fee, no credit check.
              </p>
              <LearnMore />
            </div>
          </div>
        </a>
      </div>

      {/* ── Your green purchases ── */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 pb-20">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0B3D2E]/50 mb-3">YOUR PURCHASES</p>
        <h2 className="text-3xl sm:text-5xl text-[#0B3D2E] mb-10" style={{ fontFamily: SERIF }}>
          Your green purchases
        </h2>

        <div className="space-y-8">
          {/* Tesla — with driving video */}
          <div className="group rounded-3xl overflow-hidden cursor-pointer bg-gradient-to-br from-[#e8f0e8] to-white border border-[#E8E4DF] hover:shadow-xl transition-all duration-300">
            <div className="aspect-video bg-[#E8E4DF] overflow-hidden">
              <video src={ecoCarVideo} autoPlay muted loop playsInline className="w-full h-full object-cover" />
            </div>
            <div className="px-6 sm:px-10 py-6 sm:py-8">
              <p className="text-xs font-semibold text-[#0B3D2E]/50 uppercase tracking-wider mb-1">EV purchase</p>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B3D2E] mb-1" style={{ fontFamily: SERIF }}>Tesla Model 3</h3>
              <p className="text-sm text-[#4A5568] mb-4">Jan 18, 2025 &middot; $42,990</p>
              <p className="text-sm font-semibold text-[#0B3D2E] mb-1">Tax rebate you&apos;ll get</p>
              <p className="text-sm text-[#4A5568] leading-relaxed mb-5">
                Eligible for up to <strong className="text-[#0B3D2E]">$7,500</strong> federal EV tax credit.
                We&apos;ll remind you at tax time.
              </p>
              <LearnMore />
            </div>
          </div>

          {/* Hilton — with hotel video */}
          <div className="group rounded-3xl overflow-hidden cursor-pointer bg-gradient-to-br from-[#eee8df] to-white border border-[#E8E4DF] hover:shadow-xl transition-all duration-300">
            <div className="aspect-video bg-[#E8E4DF] overflow-hidden">
              <video src={hotelVideo} autoPlay muted loop playsInline className="w-full h-full object-cover" />
            </div>
            <div className="px-6 sm:px-10 py-6 sm:py-8">
              <p className="text-xs font-semibold text-[#0B3D2E]/50 uppercase tracking-wider mb-1">Upcoming trip</p>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B3D2E] mb-1" style={{ fontFamily: SERIF }}>Hilton New York Midtown</h3>
              <p className="text-sm text-[#4A5568] mb-4">Mar 12–15, 2025 &middot; 3 nights</p>
              <p className="text-sm font-semibold text-[#0B3D2E] mb-1">Points you&apos;ll earn</p>
              <p className="text-sm text-[#4A5568] leading-relaxed mb-5">
                Approximately <strong className="text-[#0B3D2E]">480 points</strong> (green hotel bonus).
                Book with your linked card to count.
              </p>
              <LearnMore />
            </div>
          </div>
        </div>
      </div>

      {/* ── Suggested alternatives — dark band ── */}
      <div className="bg-[#1A1A1A] py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-3 sm:px-6">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-3">ALTERNATIVES</p>
          <h2 className="text-3xl sm:text-5xl text-white mb-3" style={{ fontFamily: SERIF }}>
            Suggested alternatives
          </h2>
          <p className="text-white/60 text-base mb-12 max-w-2xl">
            Based on your spending, these swaps could lower your bills and increase your green score.
          </p>

          <div className="space-y-8">
            {/* Solar — with solar panel video */}
            <div className="group rounded-3xl overflow-hidden cursor-pointer bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] border border-white/10 hover:border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="aspect-video bg-white/5 overflow-hidden">
                <video src={solarVideo} autoPlay muted loop playsInline className="w-full h-full object-cover" />
              </div>
              <div className="px-6 sm:px-10 py-6 sm:py-8">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">Energy</p>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1" style={{ fontFamily: SERIF }}>Electricity &rarr; Solar</h3>
                <p className="text-sm text-white/50 mb-4">Current: ~$187/mo</p>
                <p className="text-sm text-white/70 leading-relaxed mb-5">
                  Estimated savings with solar: <strong className="text-white">$1,200/year</strong>. Local installers in your area offer rebates.
                </p>
                <LearnMore dark />
              </div>
            </div>

            {/* Transport — with flying video */}
            <div className="group rounded-3xl overflow-hidden cursor-pointer bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] border border-white/10 hover:border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="aspect-video bg-white/5 overflow-hidden">
                <video src={flyingVideo} autoPlay muted loop playsInline className="w-full h-full object-cover" />
              </div>
              <div className="px-6 sm:px-10 py-6 sm:py-8">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">Transport</p>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1" style={{ fontFamily: SERIF }}>Commute &rarr; Transit</h3>
                <p className="text-sm text-white/50 mb-4">Earn up to 5% back on eligible transit</p>
                <p className="text-sm text-white/70 leading-relaxed mb-5">
                  Switching two trips per week could save ~<strong className="text-white">$340/year</strong> in fuel and earn extra FutureCoins.
                </p>
                <LearnMore dark />
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <span className="inline-flex items-center gap-2 text-white/60 font-semibold text-sm cursor-pointer hover:text-white/90 transition-colors">
              Learn more
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* ── Real-world impact — auto-scrolling carousel ── */}
      <div className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-3 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0B3D2E]/50 mb-3">IMPACT</p>
              <h2 className="text-3xl sm:text-5xl text-[#0B3D2E]" style={{ fontFamily: SERIF }}>
                Real-world impact
              </h2>
              <p className="text-[#4A5568] text-base mt-3 max-w-xl">
                How your choices translate into dollars, offsets, and eligibility for credits.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 shrink-0 ml-6">
              <button
                onClick={() => scrollCarousel(-1)}
                className="w-10 h-10 rounded-full border border-[#E8E4DF] flex items-center justify-center text-[#0B3D2E] hover:bg-[#0B3D2E] hover:text-white transition-colors"
                aria-label="Scroll left"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scrollCarousel(1)}
                className="w-10 h-10 rounded-full border border-[#E8E4DF] flex items-center justify-center text-[#0B3D2E] hover:bg-[#0B3D2E] hover:text-white transition-colors"
                aria-label="Scroll right"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          ref={carouselRef}
          onMouseEnter={() => { pausedRef.current = true }}
          onMouseLeave={() => { pausedRef.current = false }}
          className="max-w-6xl mx-auto px-3 sm:px-6 flex gap-6 overflow-x-auto hide-scrollbar pb-4"
        >
          <ImpactCard
            imageSrc={carbonDividendImg}
            imageAlt="Savings and sustainability"
            label="Carbon dividend"
            title="Carbon tax dividend"
            value="$142"
            valueLabel="Est. annual return"
            body="Under carbon-pricing proposals, your lower-carbon spending means you receive more back than you pay in."
          />
          <ImpactCard
            imageSrc={flightImg}
            imageAlt="Flight and travel"
            label="Travel"
            title="Flight carbon credits"
            value="$23"
            valueLabel="Offset cost (LAX–JFK)"
            body="Cost to offset your round-trip emissions at verified rates through forestry or renewable projects."
          />
          <ImpactCard
            imageSrc={hiltonImg}
            imageAlt="Hotel stay"
            label="Accommodation"
            title="Hotel carbon offset"
            value="$8"
            valueLabel="3-night NYC stay"
            body="Our estimate to neutralize the footprint of your upcoming stay. Many properties offer offsets at checkout."
          />
          <ImpactCard
            imageSrc={teslaImg}
            imageAlt="Electric vehicle"
            label="EV incentive"
            title="EV rebate eligible"
            value="$7,500"
            valueLabel="Federal tax credit"
            body="Your Tesla Model 3 qualifies for the full credit. We'll help you keep the right documentation."
          />
        </div>
      </div>
    </div>
  )
}

function ImpactCard({ imageSrc, imageAlt, label, title, value, valueLabel, body }) {
  return (
    <div className="group shrink-0 w-[320px] sm:w-[360px] fc-card overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300">
      <div className="aspect-video bg-[#E8E4DF] overflow-hidden">
        <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
      </div>
      <div className="p-6">
        {label && <p className="text-xs font-semibold text-[#0B3D2E]/50 uppercase tracking-wider mb-1">{label}</p>}
        <h3 className="text-lg font-bold text-[#0B3D2E] mb-2" style={{ fontFamily: SERIF }}>{title}</h3>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-3xl font-extrabold text-[#0B3D2E] tracking-tight" style={{ fontFamily: SERIF }}>{value}</span>
          <span className="text-xs text-[#4A5568]">{valueLabel}</span>
        </div>
        <p className="text-sm text-[#4A5568] leading-relaxed mb-4">{body}</p>
        <LearnMore />
      </div>
    </div>
  )
}
