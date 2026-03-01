import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/profile', label: 'Carbon Profile' },
  { to: '/scanner', label: 'Receipt Scanner' },
  { to: '/rewards', label: 'Rewards' },
  { to: '/alternatives', label: 'Green Alternatives' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-[#FFF5EB]/80 backdrop-blur-md border-b border-[#E8E4DF]">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <NavLink
          to="/"
          className="text-2xl text-[#0B3D2E] hover:opacity-70 transition-opacity shrink-0"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          FootPrint
        </NavLink>

        <div className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `nav-underline text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#0B3D2E] active'
                    : 'text-[#4A5568] hover:text-[#0B3D2E]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <Link to="/" className="fc-btn text-sm !py-2.5 !px-6">
            Join Now
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-[#0B3D2E]/5 transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6 text-[#0B3D2E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#E8E4DF] bg-[#FFF5EB] px-4 pb-4 pt-2">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block py-3 text-sm font-medium border-b border-[#E8E4DF] last:border-0 transition-colors ${
                  isActive ? 'text-[#0B3D2E]' : 'text-[#4A5568]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link to="/" onClick={() => setOpen(false)} className="fc-btn text-sm mt-3 w-full">
            Join Now
          </Link>
        </div>
      )}
    </nav>
  )
}
