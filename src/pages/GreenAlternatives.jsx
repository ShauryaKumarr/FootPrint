import { useState } from 'react'

const PRELOADED = [
  {
    original: { name: 'Amazon Basics T-Shirt', store: 'Amazon', price: 18.99, impact: 0 },
    alternatives: [
      { store: 'Patagonia Worn Wear', price: 22.0, donated: 2.20, charity: 'One Tree Planted', coins: 20 },
      { store: 'ThredUp', price: 14.99, donated: 1.50, charity: '1% for the Planet', coins: 15 },
    ],
  },
  {
    original: { name: 'Wireless Earbuds', store: 'Amazon', price: 29.99, impact: 0 },
    alternatives: [
      { store: 'Back Market (Refurb)', price: 24.99, donated: 2.50, charity: 'Ocean Conservancy', coins: 25 },
      { store: 'Certified Renewed', price: 26.99, donated: 1.35, charity: 'Rainforest Alliance', coins: 12 },
    ],
  },
  {
    original: { name: 'Running Shoes', store: 'Nike.com', price: 120.0, impact: 0 },
    alternatives: [
      { store: 'Allbirds', price: 110.0, donated: 5.50, charity: 'Carbon Fund', coins: 30 },
      { store: 'Veja', price: 135.0, donated: 6.75, charity: 'Amazon Watch', coins: 35 },
    ],
  },
]

export default function GreenAlternatives() {
  const [linkInput, setLinkInput] = useState('')
  const [activeProduct, setActiveProduct] = useState(null)

  const handleSearch = () => {
    setActiveProduct(PRELOADED[0])
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Green Alternatives</h1>
      <p className="text-gray-500 mb-8">
        Paste a product link or browse categories to find sustainable alternatives that earn you FutureCoins.
      </p>

      {/* Link input */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Paste a Product Link</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
            placeholder="https://amazon.com/dp/..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors whitespace-nowrap"
          >
            Find Alternatives
          </button>
        </div>
      </div>

      {/* Comparison view */}
      {activeProduct && (
        <ComparisonCard product={activeProduct} onClose={() => setActiveProduct(null)} />
      )}

      {/* Preloaded browse */}
      <h3 className="text-xl font-bold text-gray-900 mb-4">Browse Popular Products</h3>
      <div className="grid gap-4">
        {PRELOADED.map((p, i) => (
          <button
            key={i}
            onClick={() => setActiveProduct(p)}
            className="bg-white rounded-2xl border border-gray-200 p-5 text-left hover:border-green-300 hover:shadow-sm transition-all flex items-center justify-between"
          >
            <div>
              <p className="font-semibold text-gray-900">{p.original.name}</p>
              <p className="text-sm text-gray-500">{p.original.store} — ${p.original.price.toFixed(2)}</p>
            </div>
            <span className="text-green-600 font-medium text-sm">
              {p.alternatives.length} alternatives &rarr;
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function ComparisonCard({ product, onClose }) {
  return (
    <div className="bg-white rounded-2xl border-2 border-green-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Side-by-Side Comparison</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Original */}
        <div className="rounded-xl border border-red-200 bg-red-50/50 p-4">
          <p className="text-xs font-bold text-red-500 uppercase mb-2">Original</p>
          <p className="font-semibold text-gray-900">{product.original.name}</p>
          <p className="text-sm text-gray-500 mb-3">{product.original.store}</p>
          <p className="text-xl font-bold text-gray-900">${product.original.price.toFixed(2)}</p>
          <p className="text-xs text-red-500 mt-2">0 green impact • 0 FutureCoins</p>
        </div>

        {/* Alternatives */}
        {product.alternatives.map((alt, i) => (
          <div key={i} className="rounded-xl border border-green-200 bg-green-50/50 p-4">
            <p className="text-xs font-bold text-green-600 uppercase mb-2">Alternative</p>
            <p className="font-semibold text-gray-900">{product.original.name}</p>
            <p className="text-sm text-gray-500 mb-3">{alt.store}</p>
            <p className="text-xl font-bold text-gray-900">${alt.price.toFixed(2)}</p>
            <p className="text-xs text-green-600 mt-2">
              ${alt.donated.toFixed(2)} → {alt.charity} • +{alt.coins} FutureCoins
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
