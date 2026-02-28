import { Link } from 'react-router-dom'
import { useProfile } from '../context/ProfileContext'
import HeroMascot from '../components/HeroMascot'

const features = [
  { icon: '📊', title: 'Carbon Profile', desc: 'Connect your bank and see the carbon cost of every purchase.', to: '/profile', color: 'from-green-500 to-emerald-600' },
  { icon: '🧾', title: 'Receipt Scanner', desc: 'Scan receipts to track purchases and watch your impact.', to: '/scanner', color: 'from-amber-500 to-orange-600' },
  { icon: '🏆', title: 'Green Rewards', desc: 'Unlock cashback, rebates, and FutureCoins as you go green.', to: '/rewards', color: 'from-blue-500 to-indigo-600' },
  { icon: '🔗', title: 'Green Alternatives', desc: 'Find sustainable alternatives and earn points for every switch.', to: '/alternatives', color: 'from-purple-500 to-pink-600' },
]

export default function Landing() {
  const { greenScore = 100, devScore, setDevScore } = useProfile()
  const safeScore = (typeof greenScore === 'number' && !isNaN(greenScore)) ? greenScore : 100
  const pollutionIntensity = Math.max(0, (80 - safeScore) / 80)
  const cloudCount = isNaN(pollutionIntensity) ? 0 : Math.floor(pollutionIntensity * 30)

  return (
    <div className={`transition-colors duration-1000 relative overflow-hidden ${safeScore < 15 ? 'bg-slate-400' : 'bg-white'}`}>
      {/* Pollution overlay */}
      {cloudCount > 0 && (
        <div className="absolute inset-0 pointer-events-none z-[100]">
          {[...Array(cloudCount)].map((_, i) => (
            <div
              key={`cloud-${i}`}
              className="pollution-cloud"
              style={{
                left: `${(i * 137) % 100}%`,
                top: `${(i * 239) % 100}%`,
                width: `${150 + (i * 71) % 300}px`,
                height: `${100 + (i * 113) % 200}px`,
                '--x-dir': `${((i * 17) % 200) - 100}px`,
                '--y-dir': `${((i * 31) % 200) - 100}px`,
                '--duration': `${15 + (i * 7) % 15}s`,
                '--pollution-opacity': String(pollutionIntensity * 0.6),
                animationDelay: `${(i * -1.5) % 20}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Hero section with mascot */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Text */}
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
                FootPrint
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Every dollar you spend leaves a carbon footprint.
                <br />
                <span className="text-green-700 font-semibold">See yours. Shrink it. Get rewarded.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to="/profile"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-green-600 text-white font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
                >
                  Get Started
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-white text-gray-700 font-semibold text-lg hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  How It Works
                </a>
              </div>
            </div>

            {/* Mascot */}
            <div className="flex justify-center">
              <HeroMascot />
            </div>
          </div>
        </div>

        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
      </section>

      {/* Dev slider */}
      <div className="max-w-xs mx-auto my-6 px-4">
        <label className="block text-xs text-gray-400 mb-1 text-center">Dev State Tester</label>
        <input
          type="range"
          min="0"
          max="100"
          value={devScore ?? safeScore}
          onChange={(e) => setDevScore(Number(e.target.value))}
          className="w-full accent-green-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Critical (0)</span>
          <span>Thriving (100)</span>
        </div>
        {devScore !== null && (
          <button onClick={() => setDevScore(null)} className="mt-1 w-full text-xs text-green-600 hover:underline">
            Reset to real score
          </button>
        )}
      </div>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          The Core Loop
        </h2>
        <p className="text-center text-gray-500 mb-12 text-lg">
          Spend &rarr; Score &rarr; Shift &rarr; Reward
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f) => (
            <Link
              key={f.to}
              to={f.to}
              className="group relative p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} text-white text-2xl mb-4`}>
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              <span className="absolute top-6 right-6 text-gray-300 group-hover:text-gray-500 transition-colors text-xl">&rarr;</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-sm text-gray-400 border-t border-gray-100">
        FootPrint &copy; {new Date().getFullYear()} — Built for a greener future.
      </footer>
    </div>
  )
}
