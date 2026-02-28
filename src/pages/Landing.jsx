import { Link } from 'react-router-dom'

const features = [
  {
    icon: '📊',
    title: 'Carbon Profile',
    desc: 'Connect your bank and see the carbon cost of every purchase.',
    to: '/profile',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: '🧾',
    title: 'Receipt Scanner',
    desc: 'Scan receipts to track purchases and watch your impact in real time.',
    to: '/scanner',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: '🏆',
    title: 'Green Rewards',
    desc: 'Unlock cashback, rebates, and FutureCoins as you go green.',
    to: '/rewards',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: '🔗',
    title: 'Green Alternatives',
    desc: 'Find sustainable alternatives and earn points for every switch.',
    to: '/alternatives',
    color: 'from-purple-500 to-pink-600',
  },
]

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-7xl mb-6">🐾</div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
            FootPrint
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Every dollar you spend leaves a carbon footprint.
            <br />
            <span className="text-green-700 font-semibold">See yours. Shrink it. Get rewarded.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
      </section>

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
              <span className="absolute top-6 right-6 text-gray-300 group-hover:text-gray-500 transition-colors text-xl">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Mascot teaser */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-6xl mb-4">🌱 &rarr; 🌿 &rarr; 🌳 &rarr; 🌸</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Meet Your Mascot</h3>
          <p className="text-gray-600 text-lg">
            Your plant companion grows with your green choices — and wilts when you slip.
            It lives across every page as your personal carbon conscience.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-sm text-gray-400 border-t border-gray-100">
        FootPrint &copy; {new Date().getFullYear()} — Built for a greener future.
      </footer>
    </div>
  )
}
