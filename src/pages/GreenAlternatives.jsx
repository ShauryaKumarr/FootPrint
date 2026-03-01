import { useState } from 'react'

const PRELOADED = [
  {
    original: {
      name: 'Single-Use Water Bottles',
      store: 'Grocery Store',
      price: 15.99,
      impact: 0,
      imageUrl: 'https://images.unsplash.com/photo-1550505095-81378a674395?auto=format&fit=crop&w=500&q=60',
      productUrl: 'https://www.amazon.com/dp/B08J5F45N1',
    },
    alternatives: [
      {
        name: 'Hydro Flask Wide Mouth',
        store: 'Hydro Flask',
        price: 44.95,
        donated: 4.50,
        charity: 'Surfrider Foundation',
        coins: 40,
        imageUrl: 'https://images.unsplash.com/photo-1602143407151-011141950038?auto=format&fit=crop&w=500&q=60',
        productUrl: 'https://www.amazon.com/dp/B0BG6NRL86',
      },
      {
        name: 'LARQ Self-Cleaning Bottle',
        store: 'LARQ',
        price: 99.00,
        donated: 10.00,
        charity: '1% for the Planet',
        coins: 50,
        imageUrl: 'https://images.unsplash.com/photo-1616118132534-381148898bb4?auto=format&fit=crop&w=500&q=60',
        productUrl: 'https://www.livelarq.com/',
      },
    ],
  },
  {
    original: {
      name: 'Amazon Basics T-Shirt',
      store: 'Amazon',
      price: 18.99,
      impact: 0,
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=60',
      productUrl: 'https://www.amazon.com/s?k=basic+t-shirt',
    },
    alternatives: [
      {
        store: 'Patagonia Worn Wear',
        price: 22.0,
        donated: 2.20,
        charity: 'One Tree Planted',
        coins: 20,
        imageUrl: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=500&q=60',
        productUrl: 'https://www.patagonia.com/shop/worn-wear',
      },
      {
        store: 'ThredUp',
        price: 14.99,
        donated: 1.50,
        charity: '1% for the Planet',
        coins: 15,
        imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=500&q=60',
        productUrl: 'https://www.thredup.com/',
      },
    ],
  },
  {
    original: {
      name: 'Wireless Earbuds',
      store: 'Amazon',
      price: 29.99,
      impact: 0,
      imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=500&q=60',
      productUrl: 'https://www.amazon.com/s?k=wireless+earbuds',
    },
    alternatives: [
      {
        store: 'Back Market (Refurb)',
        price: 24.99,
        donated: 2.50,
        charity: 'Ocean Conservancy',
        coins: 25,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60',
        productUrl: 'https://www.backmarket.com/en-us/l/audio/070693d2-1482-406e-8ebf-2e650d403a07',
      },
      {
        store: 'Certified Renewed',
        price: 26.99,
        donated: 1.35,
        charity: 'Rainforest Alliance',
        coins: 12,
        imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=500&q=60',
        productUrl: 'https://www.amazon.com/Certified-Refurbished/b?node=12653393011',
      },
    ],
  },
  {
    original: {
      name: 'Running Shoes',
      store: 'Nike.com',
      price: 120.0,
      impact: 0,
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=60',
      productUrl: 'https://www.nike.com/running',
    },
    alternatives: [
      {
        store: 'Allbirds',
        price: 110.0,
        donated: 5.50,
        charity: 'Carbon Fund',
        coins: 30,
        imageUrl: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=500&q=60',
        productUrl: 'https://www.allbirds.com/',
      },
      {
        store: 'Veja',
        price: 135.0,
        donated: 6.75,
        charity: 'Amazon Watch',
        coins: 35,
        imageUrl: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=500&q=60',
        productUrl: 'https://www.veja-store.com/',
      },
    ],
  },
]

export default function GreenAlternatives() {
  const [linkInput, setLinkInput] = useState('')
  const [activeProduct, setActiveProduct] = useState(null)
  const [searchHistory, setSearchHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async () => {
    if (!linkInput) return
    setLoading(true)
    setActiveProduct(null)
    setError(null)

    try {
      const response = await fetch('/api/find-alternatives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productUrl: linkInput }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      setActiveProduct(data)
      setSearchHistory((prev) => {
        if (prev.some((p) => p.original.productUrl === data.original.productUrl)) return prev
        return [data, ...prev]
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
      setLinkInput('')
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1
        className="text-3xl text-[#0B3D2E] mb-2"
        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
      >
        Green Alternatives
      </h1>
      <p className="text-[#4A5568] mb-8">
        Paste a product link or browse categories to find sustainable alternatives that earn you FutureCoins.
      </p>

      <div className="fc-card p-6 mb-8">
        <h3 className="text-lg font-semibold text-[#0B3D2E] mb-3">Paste a Product Link</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
            placeholder="https://amazon.com/dp/..."
            className="flex-1 px-4 py-3 rounded-xl border border-[#E8E4DF] bg-[#FFF5EB] text-[#0B3D2E] placeholder-[#4A5568]/40 focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]/40"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="fc-btn whitespace-nowrap disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Find Alternatives'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-semibold rounded-xl p-4 mb-8">
          {error}
        </div>
      )}

      {searchHistory.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-[#0B3D2E]">Recent Searches</h3>
            <button onClick={() => setSearchHistory([])} className="text-sm text-[#4A5568] hover:text-red-500 transition-colors">
              Clear
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {searchHistory.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveProduct(item)}
                className="flex items-center gap-3 p-3 fc-card hover:border-[#0B3D2E]/30 transition-all text-left group"
              >
                <img src={item.original.imageUrl} alt={item.original.name} className="w-12 h-12 rounded-lg object-cover" />
                <div className="min-w-0">
                  <p className="font-medium text-[#0B3D2E] text-sm truncate group-hover:opacity-70 transition-opacity">{item.original.name}</p>
                  <p className="text-xs text-[#4A5568]">{item.alternatives.length} alternatives found</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeProduct && (
        <ComparisonCard product={activeProduct} onClose={() => setActiveProduct(null)} />
      )}

      <h3
        className="text-xl text-[#0B3D2E] mb-4"
        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
      >
        Browse Popular Products
      </h3>
      <div className="grid gap-4">
        {PRELOADED.map((p, i) => (
          <button
            key={i}
            onClick={() => setActiveProduct(p)}
            className="fc-card p-5 text-left hover:border-[#0B3D2E]/30 hover:shadow-sm transition-all flex items-center justify-between"
          >
            <div>
              <p className="font-semibold text-[#0B3D2E]">{p.original.name}</p>
              <p className="text-sm text-[#4A5568]">{p.original.store} — ${p.original.price.toFixed(2)}</p>
            </div>
            <span className="text-[#0B3D2E] font-medium text-sm">
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
    <div className="fc-card border-2 border-[#0B3D2E]/20 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#0B3D2E]">Side-by-Side Comparison</h3>
        <button onClick={onClose} className="text-[#4A5568] hover:text-[#0B3D2E] text-xl">&times;</button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {product.original && (
          <a href={product.original.productUrl} target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-red-200 bg-red-50/50 p-4 hover:border-red-300 transition-colors">
            <img src={product.original.imageUrl} alt={product.original.name} className="w-full h-32 object-cover rounded-lg mb-3" />
            <p className="text-xs font-bold text-red-500 uppercase mb-2">Original</p>
            <p className="font-semibold text-[#0B3D2E]">{product.original.name}</p>
            <p className="text-sm text-[#4A5568] mb-3">{product.original.store}</p>
            <p className="text-xl font-bold text-[#0B3D2E]">${product.original.price.toFixed(2)}</p>
            <p className="text-xs text-red-500 mt-2">0 green impact &bull; 0 FutureCoins</p>
          </a>
        )}

        {product.alternatives && product.alternatives.map((alt, i) => (
          <a key={i} href={alt.productUrl} target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-[#C5E867] bg-[#C5E867]/10 p-4 hover:border-[#0B3D2E]/30 transition-colors">
            <img src={alt.imageUrl} alt={alt.name} className="w-full h-32 object-cover rounded-lg mb-3" />
            <p className="text-xs font-bold text-[#0B3D2E] uppercase mb-2">Alternative</p>
            <p className="font-semibold text-[#0B3D2E]">{alt.name}</p>
            <p className="text-sm text-[#4A5568] mb-3">{alt.store}</p>
            <p className="text-xl font-bold text-[#0B3D2E]">${alt.price.toFixed(2)}</p>
            <p className="text-xs text-[#0B3D2E]/70 mt-2">
              ${alt.donated.toFixed(2)} &rarr; {alt.charity} &bull; +{alt.coins} FutureCoins
            </p>
          </a>
        ))}
      </div>
    </div>
  )
}
