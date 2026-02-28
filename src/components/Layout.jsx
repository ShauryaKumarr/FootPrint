import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Mascot from './Mascot'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Mascot stage={1} />
    </div>
  )
}
