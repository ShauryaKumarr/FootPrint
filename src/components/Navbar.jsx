import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/profile', label: 'Carbon Profile' },
  { to: '/scanner', label: 'Receipt Scanner' },
  { to: '/rewards', label: 'Rewards' },
  { to: '/alternatives', label: 'Green Alternatives' },
]

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-green-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <NavLink to="/" className="flex items-center gap-2 text-xl font-bold text-green-700">
          <span className="text-2xl">🐾</span>
          FootPrint
        </NavLink>

        <div className="hidden md:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <MobileMenu />
      </div>
    </nav>
  )
}

function MobileMenu() {
  return (
    <details className="md:hidden relative">
      <summary className="list-none cursor-pointer p-2 rounded-lg hover:bg-gray-100">
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </summary>
      <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-xl shadow-xl py-2 w-56">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `block px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-green-50 text-green-800'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </details>
  )
}
