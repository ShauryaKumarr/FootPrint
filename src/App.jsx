import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ProfileProvider } from './context/ProfileContext'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import CarbonProfile from './pages/CarbonProfile'
import ReceiptScanner from './pages/ReceiptScanner'
import RewardsDashboard from './pages/RewardsDashboard'
import GreenAlternatives from './pages/GreenAlternatives'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-500 mb-4 text-sm">{this.state.error?.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700"
            >
              Reload
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <ProfileProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/profile" element={<CarbonProfile />} />
            <Route path="/scanner" element={<ReceiptScanner />} />
            <Route path="/rewards" element={<RewardsDashboard />} />
            <Route path="/alternatives" element={<GreenAlternatives />} />
          </Route>
        </Routes>
      </ProfileProvider>
    </ErrorBoundary>
  )
}
