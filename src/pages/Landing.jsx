import { useState, useEffect, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import BearVideo1 from '../assets/BearVideo1.mp4'
import BearVideo2 from '../assets/BearVideo2.mp4'

const VIDEOS = [BearVideo1, BearVideo2]
const SWAP_INTERVAL = 10_000
const PAW_COUNT = 18
const PAW_CYCLE = 9_000

function PawSVG({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" opacity="0.5">
      <ellipse cx="32" cy="42" rx="14" ry="16" />
      <ellipse cx="16" cy="22" rx="7" ry="9" transform="rotate(-15 16 22)" />
      <ellipse cx="30" cy="14" rx="6" ry="8" />
      <ellipse cx="44" cy="16" rx="6" ry="8" transform="rotate(10 44 16)" />
      <ellipse cx="52" cy="26" rx="6.5" ry="8.5" transform="rotate(25 52 26)" />
    </svg>
  )
}

function usePawPrints() {
  const generate = useCallback(() =>
    Array.from({ length: PAW_COUNT }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      left: Math.random() * 92 + 2,
      top: Math.random() * 85 + 5,
      size: 22 + Math.random() * 24,
      rotation: Math.random() * 360,
      delay: (i / PAW_COUNT) * PAW_CYCLE * 0.6,
    })),
    []
  )

  const [paws, setPaws] = useState(generate)

  useEffect(() => {
    const id = setInterval(() => setPaws(generate()), PAW_CYCLE)
    return () => clearInterval(id)
  }, [generate])

  return paws
}

export default function Landing() {
  const [activeIdx, setActiveIdx] = useState(0)
  const paws = usePawPrints()

  useEffect(() => {
    const id = setInterval(() => setActiveIdx((i) => (i + 1) % VIDEOS.length), SWAP_INTERVAL)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="h-screen w-full overflow-hidden relative bg-black">
      {/* Video carousel */}
      {VIDEOS.map((src, i) => (
        <video
          key={i}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: activeIdx === i ? 1 : 0 }}
        />
      ))}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50" />

      {/* Paw prints */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {paws.map((p) => (
          <div
            key={p.id}
            className="absolute text-white/30 paw-appear"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              transform: `rotate(${p.rotation}deg)`,
              animationDelay: `${p.delay}ms`,
              animationDuration: `${PAW_CYCLE * 0.5}ms`,
            }}
          >
            <PawSVG size={p.size} />
          </div>
        ))}
      </div>

      {/* Text content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-white/60 mb-5">
          FootPrint Carbon Tracker
        </p>
        <h1
          className="text-4xl sm:text-6xl md:text-7xl text-white leading-tight mb-5 max-w-3xl"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          Every Step Leaves A Mark
        </h1>
        <p className="text-base sm:text-lg text-white/70 max-w-xl mb-10 leading-relaxed">
          Track the carbon cost of every dollar you spend. See your impact, shrink&nbsp;it, and get rewarded.
        </p>
        <Link to="/profile" className="fc-btn text-base !bg-white !text-[#0B3D2E] hover:!bg-white/90">
          Get Started
        </Link>
      </div>

      {/* Video indicator dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
              activeIdx === i ? 'bg-white scale-110' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
