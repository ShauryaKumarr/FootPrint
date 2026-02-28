import { useState } from 'react'

export default function ReceiptScanner() {
  const [scanned, setScanned] = useState(false)
  const [smokeLevel, setSmokeLevel] = useState(0)

  const handleScan = () => {
    setScanned(true)
    setSmokeLevel(40)
  }

  const handleReset = () => {
    setScanned(false)
    setSmokeLevel(0)
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      {/* Smoke overlay — intensity driven by smokeLevel */}
      {smokeLevel > 0 && (
        <div
          className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-1000"
          style={{
            background: `rgba(107, 114, 128, ${smokeLevel / 100})`,
          }}
        />
      )}

      <div className="relative z-35 max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Receipt Scanner</h1>
        <p className="text-gray-500 mb-8">
          Scan a receipt to add individual items to your carbon profile.
          Watch the atmosphere change based on your purchases.
        </p>

        {/* Scanner area */}
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center mb-8 hover:border-green-400 transition-colors">
          <div className="text-6xl mb-4">📷</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {scanned ? 'Receipt Scanned!' : 'Scan a Receipt'}
          </h2>
          <p className="text-gray-500 mb-6">
            {scanned
              ? 'Items have been extracted and scored.'
              : 'Take a photo or upload a receipt image to extract line items.'}
          </p>

          {!scanned ? (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleScan}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
              >
                📸 Take Photo
              </button>
              <button
                onClick={handleScan}
                className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                📁 Upload Image
              </button>
            </div>
          ) : (
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-gray-100 text-gray-600 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Scan Another
            </button>
          )}
        </div>

        {/* Scanned items */}
        {scanned && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-in fade-in">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Extracted Items</h3>
            <div className="space-y-3">
              {MOCK_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${item.price}</p>
                    <p className={`text-xs font-bold ${item.grade === 'A' ? 'text-green-600' : item.grade === 'D' ? 'text-red-500' : 'text-yellow-600'}`}>
                      Grade {item.grade} — {item.co2} kg CO₂
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Smoke intensity controls (demo) */}
        {scanned && (
          <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Atmosphere Demo</h3>
            <p className="text-sm text-gray-500 mb-4">
              Drag to simulate how purchase quality affects the UI.
            </p>
            <input
              type="range"
              min="0"
              max="80"
              value={smokeLevel}
              onChange={(e) => setSmokeLevel(Number(e.target.value))}
              className="w-full accent-green-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>🌿 Clean</span>
              <span>🌫️ Smoky</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const MOCK_ITEMS = [
  { name: 'Organic Vegetables', category: 'Food', price: '12.50', co2: '0.8', grade: 'A' },
  { name: 'Gasoline — 10 gal', category: 'Transport', price: '45.00', co2: '22.4', grade: 'D' },
  { name: 'Coffee (Fair Trade)', category: 'Food', price: '6.99', co2: '1.2', grade: 'B' },
  { name: 'Plastic Bags (x5)', category: 'Shopping', price: '0.50', co2: '3.5', grade: 'D' },
]
