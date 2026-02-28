import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import CarbonProfile from './pages/CarbonProfile'
import ReceiptScanner from './pages/ReceiptScanner'
import RewardsDashboard from './pages/RewardsDashboard'
import GreenAlternatives from './pages/GreenAlternatives'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<CarbonProfile />} />
        <Route path="/scanner" element={<ReceiptScanner />} />
        <Route path="/rewards" element={<RewardsDashboard />} />
        <Route path="/alternatives" element={<GreenAlternatives />} />
      </Route>
    </Routes>
  )
}
