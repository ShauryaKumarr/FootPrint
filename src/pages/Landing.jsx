import { useState } from 'react'
import { Link } from 'react-router-dom'

const categories = [
  {
    name: 'Transport',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17h8M8 17a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 104 0 2 2 0 00-4 0zM3 9h18l-2-5H5L3 9zm0 0v5a1 1 0 001 1h1m14-6v5a1 1 0 01-1 1h-1" />
      </svg>
    ),
    stat: '~4.6 tonnes CO₂/year',
    tip: 'Switch 2 car trips per week to transit and cut your transport footprint by 30%. We track every commute and show you greener routes.',
  },
  {
    name: 'Food',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
      </svg>
    ),
    stat: '~2.5 tonnes CO₂/year',
    tip: 'One plant-based day a week reduces your food footprint by 15%. FootPrint scores every grocery run and restaurant visit.',
  },
  {
    name: 'Energy',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    stat: '~1.8 tonnes CO₂/year',
    tip: 'Solar panels can cut your energy emissions by 80%. We identify rebates and savings based on your utility spending.',
  },
  {
    name: 'Fashion',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    stat: '~0.8 tonnes CO₂/year',
    tip: 'Buying secondhand or sustainable brands can halve your fashion footprint. We suggest swaps for every purchase.',
  },
  {
    name: 'Shopping',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
      </svg>
    ),
    stat: '~1.2 tonnes CO₂/year',
    tip: 'Refurbished electronics and bulk buying reduce waste and emissions. FootPrint finds green alternatives automatically.',
  },
]

export default function Landing() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="bg-[#FFF5EB]">
      {/* ===== Hero ===== */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0B3D2E]/60 mb-6">
            FOOTPRINT CARBON TRACKER
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl text-[#0B3D2E] leading-tight mb-6"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Designed To Track Your Carbon Footprint
          </h1>
          <p className="text-lg text-[#4A5568] max-w-2xl mx-auto mb-10 leading-relaxed">
            Every dollar you spend has a carbon cost. FootPrint shows you yours, helps you shrink it, and rewards you for going green.
          </p>
          <Link to="/profile" className="fc-btn text-base">
            Get Started
          </Link>
        </div>

        <div className="max-w-3xl mx-auto mt-14">
          <div className="bg-[#0B3D2E] rounded-3xl p-8 sm:p-12 text-center">
            <p className="text-[#C5E867] text-5xl sm:text-7xl mb-4" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
              🐾
            </p>
            <p className="text-white/80 text-sm sm:text-base max-w-md mx-auto">
              Your personal carbon companion — tracking, scoring, and rewarding every step toward a lighter footprint.
            </p>
          </div>
        </div>
      </section>

      {/* ===== "You won't need another app" ===== */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0B3D2E]/60 mb-3 text-center">
            EVERY ACTION COUNTS
          </p>
          <h2
            className="text-3xl sm:text-4xl text-[#0B3D2E] text-center mb-4"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            You won&apos;t need another app
          </h2>
          <p className="text-center text-[#4A5568] max-w-lg mx-auto mb-12">
            Your everyday spending deserves carbon transparency.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                title: 'Real-Time Carbon Scoring',
                desc: 'Connect your bank account and every purchase is automatically scored for its environmental impact.',
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
              },
              {
                title: 'Green Rewards',
                desc: 'Earn FutureCoins for every sustainable choice you make — redeem for offsets, cashback, or donations.',
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'No Hidden Costs',
                desc: 'FootPrint is completely free to use. No subscriptions, no premium tiers — just transparency.',
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                title: 'Smart Alternatives',
                desc: 'Find sustainable swaps for any product — we compare prices, impact, and show you what you save.',
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                ),
              },
            ].map((card) => (
              <div key={card.title} className="fc-card p-6 sm:p-8">
                <div className="w-12 h-12 rounded-xl bg-[#0B3D2E]/5 flex items-center justify-center text-[#0B3D2E] mb-4">
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#0B3D2E] mb-2">{card.title}</h3>
                <p className="text-sm text-[#4A5568] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Category tabs ===== */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0B3D2E]/60 mb-3 text-center">
            WHERE YOUR CARBON GOES
          </p>
          <h2
            className="text-3xl sm:text-4xl text-[#0B3D2E] text-center mb-10"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Track where you spend the most
          </h2>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat, i) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === i
                    ? 'bg-[#0B3D2E] text-white'
                    : 'bg-[#FFF5EB] text-[#4A5568] hover:bg-[#0B3D2E]/5'
                }`}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>

          <div className="fc-card p-8 sm:p-10 max-w-2xl mx-auto text-center">
            <div className="w-14 h-14 rounded-full bg-[#C5E867] flex items-center justify-center text-[#0B3D2E] mx-auto mb-5">
              {categories[activeCategory].icon}
            </div>
            <h3 className="text-xl font-semibold text-[#0B3D2E] mb-2">{categories[activeCategory].name}</h3>
            <p className="text-2xl font-bold text-[#0B3D2E] mb-4">{categories[activeCategory].stat}</p>
            <p className="text-[#4A5568] text-sm leading-relaxed max-w-md mx-auto">{categories[activeCategory].tip}</p>
          </div>
        </div>
      </section>

      {/* ===== Easy Wins bento ===== */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0B3D2E]/60 mb-3 text-center">
            QUICK IMPACT
          </p>
          <h2
            className="text-3xl sm:text-4xl text-[#0B3D2E] text-center mb-12"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Easy Wins
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="fc-card-lime p-7 sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-semibold text-[#0B3D2E] mb-2">Instant Scoring</h3>
              <p className="text-sm text-[#0B3D2E]/70 leading-relaxed">
                Connect your bank and see the carbon cost of every purchase instantly. No manual entry required.
              </p>
            </div>
            <div className="fc-card p-7">
              <h3 className="text-lg font-semibold text-[#0B3D2E] mb-2">Receipt Scanner</h3>
              <p className="text-sm text-[#4A5568] leading-relaxed">
                Snap a photo of any receipt. Our OCR extracts every item and scores it for carbon impact.
              </p>
            </div>
            <div className="fc-card-lime p-7">
              <h3 className="text-lg font-semibold text-[#0B3D2E] mb-2">Link, Track & Earn</h3>
              <p className="text-sm text-[#0B3D2E]/70 leading-relaxed">
                Connect your accounts and keep earning green points with every sustainable purchase.
              </p>
            </div>
            <div className="fc-card p-7">
              <h3 className="text-lg font-semibold text-[#0B3D2E] mb-2">Your Green Wallet</h3>
              <p className="text-sm text-[#4A5568] leading-relaxed">
                FutureCoins, rebates, and offsets — all managed in one place so nothing slips through.
              </p>
            </div>
            <div className="fc-card p-7">
              <h3 className="text-lg font-semibold text-[#0B3D2E] mb-2">Carbon Profile</h3>
              <p className="text-sm text-[#4A5568] leading-relaxed">
                Monthly breakdown by sector — see where your biggest impact is and where to improve first.
              </p>
            </div>
            <div className="fc-card p-7">
              <h3 className="text-lg font-semibold text-[#0B3D2E] mb-2">Smart Suggestions</h3>
              <p className="text-sm text-[#4A5568] leading-relaxed">
                Personalized reduction tips based on your actual spending patterns and carbon profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Trust section ===== */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl sm:text-4xl text-[#0B3D2E] mb-4"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            All the rewards, zero worry
          </h2>
          <p className="text-[#4A5568] max-w-lg mx-auto mb-12">
            Your data is secured with industry-leading standards. We never sell your information.
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: 'Bank-Level Encryption',
                desc: '256-bit AES encryption protects all your financial data in transit and at rest.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
              },
              {
                title: 'Plaid Secured',
                desc: 'We use Plaid — the same provider trusted by Venmo, Robinhood, and thousands of banks.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                title: 'Carbon Verified',
                desc: 'Our scoring methodology is based on published EPA emission factors and peer-reviewed data.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
              },
            ].map((badge) => (
              <div key={badge.title} className="fc-card p-6 sm:p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-[#C5E867]/40 flex items-center justify-center text-[#0B3D2E] mx-auto mb-4">
                  {badge.icon}
                </div>
                <h3 className="text-base font-semibold text-[#0B3D2E] mb-2">{badge.title}</h3>
                <p className="text-sm text-[#4A5568] leading-relaxed">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
