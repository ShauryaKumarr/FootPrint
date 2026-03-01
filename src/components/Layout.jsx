import { Outlet, useLocation, Link } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  const { pathname } = useLocation()
  const showFooter = pathname === '/profile'

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5EB]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>

      {showFooter && (
        <footer className="border-t border-[#E8E4DF]">
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <h2
              className="text-3xl sm:text-4xl text-[#0B3D2E] mb-4"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Know Your Footprint, Shrink It
            </h2>
            <p className="text-[#4A5568] max-w-lg mx-auto mb-8">
              Connect your bank and get a complete picture of your carbon impact. Every purchase scored, every improvement tracked.
            </p>
            <Link to="/" className="fc-btn text-base">
              Get Started
            </Link>
          </div>
          <div className="border-t border-[#E8E4DF] py-5 text-center text-sm text-[#4A5568]/60">
            FootPrint &copy; {new Date().getFullYear()}
          </div>
        </footer>
      )}
    </div>
  )
}
