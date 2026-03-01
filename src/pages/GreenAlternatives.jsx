import { useState, useRef, useEffect } from 'react'

const PRELOADED = [
  {
    original: {
      name: 'Single-Use Water Bottles',
      store: 'Grocery Store',
      price: 15.99,
      impact: 0,
      imageUrl: 'https://images.unsplash.com/photo-1617150119111-09bbb85178b0?auto=format&fit=crop&w=500&q=60',
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
        imageUrl: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=500&q=60',
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
  {
    original: {
      name: 'Disposable Coffee Cup',
      store: 'Starbucks',
      price: 3.50,
      impact: 0,
      imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=60',
      productUrl: '#',
    },
    alternatives: [
      {
        store: 'KeepCup',
        price: 24.00,
        donated: 2.40,
        charity: 'Coffee Kids',
        coins: 25,
        imageUrl: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=500&q=60',
        productUrl: 'https://us.keepcup.com/',
      },
      {
        store: 'Yeti Rambler',
        price: 30.00,
        donated: 3.00,
        charity: 'Conservation Alliance',
        coins: 30,
        imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=500&q=60',
        productUrl: 'https://www.yeti.com/',
      },
    ],
  },
  {
    original: {
      name: 'Plastic Cutlery Set',
      store: 'Party City',
      price: 5.99,
      impact: 0,
      imageUrl: 'https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?auto=format&fit=crop&w=500&q=60',
      productUrl: '#',
    },
    alternatives: [
      {
        store: 'To-Go Ware Bamboo',
        price: 12.95,
        donated: 1.30,
        charity: 'Plastic Pollution Coalition',
        coins: 15,
        imageUrl: 'https://images.unsplash.com/photo-1616400619175-5beda3a17896?auto=format&fit=crop&w=500&q=60',
        productUrl: 'https://togoware.com/',
      },
      {
        store: 'Titanium Spork',
        price: 10.95,
        donated: 1.10,
        charity: 'Leave No Trace',
        coins: 10,
        imageUrl: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=500&q=60',
        productUrl: 'https://snowpeak.com/',
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
  const [isHovered, setIsHovered] = useState(false)
  const scrollContainerRef = useRef(null)

  // Create a larger list for infinite scroll (4 sets of the original data)
  const carouselItems = [...PRELOADED, ...PRELOADED, ...PRELOADED, ...PRELOADED]

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    let animationFrameId

    const animate = () => {
      // Calculate the width of one set of items (approx 1/4 of total width)
      const oneSetWidth = scrollContainer.scrollWidth / 4

      // Auto scroll if not hovered
      if (!isHovered) {
        scrollContainer.scrollLeft += 1
      }

      // Infinite loop logic: Jump back/forward seamlessly
      if (scrollContainer.scrollLeft >= oneSetWidth * 3) {
        scrollContainer.scrollLeft -= oneSetWidth
      } else if (scrollContainer.scrollLeft <= 0) {
        scrollContainer.scrollLeft += oneSetWidth
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isHovered])

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = 300
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }
  }

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
      <div 
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Scroll Buttons */}
        <ScrollButton direction="left" onClick={() => scroll('left')} className="-ml-20" />
        <ScrollButton direction="right" onClick={() => scroll('right')} className="-mr-20" />

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-8 -mx-48 px-48 items-start [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {carouselItems.map((p, i) => (
            <CarouselCard key={i} product={p} />
          ))}
        </div>
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

function ScrollButton({ direction, onClick, className = '' }) {
  const isLeft = direction === 'left'
  return (
    <button
      onClick={onClick}
      className={`absolute ${isLeft ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all border border-gray-100 text-[#0B3D2E] ${className}`}
      aria-label={`Scroll ${direction}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d={isLeft ? "M15.75 19.5L8.25 12l7.5-7.5" : "M8.25 4.5l7.5 7.5-7.5 7.5"} />
      </svg>
    </button>
  )
}

function CarouselCard({ product }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className="flex-shrink-0 w-80 h-[28rem] fc-card p-0 overflow-hidden text-left hover:border-[#0B3D2E]/30 hover:shadow-md transition-all snap-center group flex flex-col bg-white"
    >
      {/* Image Section */}
      <div className={`w-full overflow-hidden relative bg-gray-100 transition-all duration-500 ease-in-out ${expanded ? 'h-24' : 'h-72'}`}>
        <img
          src={product.original.imageUrl}
          alt={product.original.name}
          className="w-full h-full object-cover transition-transform duration-700"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col gap-2 w-full flex-1">
        {!expanded ? (
          <>
            <p className="font-semibold text-[#0B3D2E] truncate">{product.original.name}</p>
            <p className="text-sm text-[#4A5568]">{product.original.store} — ${product.original.price.toFixed(2)}</p>
            <p className="text-xs text-[#0B3D2E] font-medium mt-2 flex items-center gap-1">
              {product.alternatives.length} sustainable options
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </p>
          </>
        ) : (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300 flex flex-col gap-2 h-full justify-center">
            {/* Original Row */}
            <div className="relative p-2 rounded-lg border border-gray-200 bg-white flex gap-3 items-center shadow-sm">
              <img src={product.original.imageUrl} alt="" className="w-10 h-10 rounded-md object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div className="min-w-0 pr-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Original</p>
                    <p className="text-xs font-semibold text-gray-900 truncate">{product.original.name}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <p className="text-xs font-bold text-gray-900">${product.original.price.toFixed(0)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alternatives Rows */}
            {product.alternatives.map((alt, i) => (
              <a
                key={i}
                href={alt.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block p-2 rounded-lg border border-gray-200 bg-white hover:border-green-300 transition-colors flex gap-3 items-center shadow-sm"
                onClick={(e) => e.stopPropagation()} // Prevent card toggle when clicking link
              >
                <img src={alt.imageUrl} alt="" className="w-10 h-10 rounded-md object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="min-w-0 pr-4">
                      <p className="text-[10px] font-bold text-green-600 uppercase tracking-wide">Alternative</p>
                      <p className="text-xs font-semibold text-gray-900 truncate">{alt.store}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <p className="text-xs font-bold text-gray-900">${alt.price.toFixed(0)}</p>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-green-700">
                    <span>+{alt.coins} Coins</span>
                    <span>•</span>
                    <span className="truncate max-w-[80px]">{alt.charity}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </button>
  )
}
