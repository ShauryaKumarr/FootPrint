import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Edit2, Check, Info } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useProfile } from '../context/ProfileContext'
import { getState, STATE_TIPS } from '../utils/mascotConfig'

const MOOD_BG = {
  happy:   'from-cyan-100 via-sky-100 to-blue-200',
  calm:    'from-sky-50 via-cyan-50 to-blue-100',
  neutral: 'from-slate-100 via-gray-100 to-slate-200',
  worried: 'from-amber-100 via-yellow-50 to-orange-100',
  sad:     'from-orange-100 via-amber-50 to-red-100',
  scared:  'from-red-200 via-orange-100 to-red-300',
}

function PolarBearSVG({ mood, isHovered }) {
  const eyeY = mood === 'sad' || mood === 'scared' ? 46 : 44
  const mouthPaths = {
    happy:   'M 41 58 Q 50 66 59 58',
    calm:    'M 43 59 Q 50 63 57 59',
    neutral: 'M 44 59 Q 50 61 56 59',
    worried: 'M 43 61 Q 50 57 57 61',
    sad:     'M 42 63 Q 50 57 58 63',
    scared:  'M 46 58 Q 50 55 54 58 Q 50 64 46 58',
  }
  const eyebrowY = mood === 'worried' || mood === 'sad' || mood === 'scared' ? -2 : 0

  return (
    <svg viewBox="0 0 100 110" className="w-full h-full" style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.10))' }}>
      <defs>
        <radialGradient id="bg-fur" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </radialGradient>
        <radialGradient id="bg-belly" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </radialGradient>
        <radialGradient id="bg-ear-inner" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fda4af" />
          <stop offset="100%" stopColor="#fb7185" />
        </radialGradient>
        <radialGradient id="bg-cheek" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fda4af" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fda4af" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bg-nose" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </radialGradient>
        <filter id="soft-shadow">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#94a3b8" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Body */}
      <ellipse cx="50" cy="85" rx="30" ry="22" fill="url(#bg-fur)" />
      {/* Belly patch */}
      <ellipse cx="50" cy="83" rx="20" ry="16" fill="url(#bg-belly)" />

      {/* Left paw */}
      <ellipse cx="28" cy="100" rx="9" ry="6" fill="url(#bg-fur)" filter="url(#soft-shadow)" />
      <circle cx="23" cy="98" r="2" fill="#e2e8f0" />
      <circle cx="27" cy="96" r="2" fill="#e2e8f0" />
      <circle cx="32" cy="97" r="2" fill="#e2e8f0" />
      {/* Right paw */}
      <ellipse cx="72" cy="100" rx="9" ry="6" fill="url(#bg-fur)" filter="url(#soft-shadow)" />
      <circle cx="68" cy="97" r="2" fill="#e2e8f0" />
      <circle cx="73" cy="96" r="2" fill="#e2e8f0" />
      <circle cx="77" cy="98" r="2" fill="#e2e8f0" />

      {/* Head */}
      <circle cx="50" cy="46" r="28" fill="url(#bg-fur)" />

      {/* Ears */}
      <circle cx="28" cy="24" r="11" fill="url(#bg-fur)" />
      <circle cx="28" cy="24" r="6.5" fill="url(#bg-ear-inner)" />
      <circle cx="72" cy="24" r="11" fill="url(#bg-fur)" />
      <circle cx="72" cy="24" r="6.5" fill="url(#bg-ear-inner)" />

      {/* Cheek muzzle area */}
      <ellipse cx="50" cy="54" rx="16" ry="11" fill="#fafafa" />

      {/* Eyebrows (mood-dependent) */}
      {(mood === 'worried' || mood === 'sad' || mood === 'scared') && (
        <>
          <line x1="34" y1={38 + eyebrowY} x2="41" y2={36 + eyebrowY} stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="66" y1={38 + eyebrowY} x2="59" y2={36 + eyebrowY} stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}

      {/* Eyes */}
      <g>
        <ellipse cx="39" cy={eyeY} rx="4" ry="4.5" fill="#1e293b" />
        <circle cx="40.5" cy={eyeY - 1.5} r="1.5" fill="#fff" opacity="0.9" />
        <circle cx="37.5" cy={eyeY + 1} r="0.7" fill="#fff" opacity="0.5" />
        <animate attributeName="opacity" values="1;1;0;1;1" dur="4s" repeatCount="indefinite" begin="2.5s" keyTimes="0;0.46;0.5;0.54;1" />
      </g>
      <g>
        <ellipse cx="61" cy={eyeY} rx="4" ry="4.5" fill="#1e293b" />
        <circle cx="62.5" cy={eyeY - 1.5} r="1.5" fill="#fff" opacity="0.9" />
        <circle cx="59.5" cy={eyeY + 1} r="0.7" fill="#fff" opacity="0.5" />
        <animate attributeName="opacity" values="1;1;0;1;1" dur="4s" repeatCount="indefinite" begin="2.5s" keyTimes="0;0.46;0.5;0.54;1" />
      </g>

      {/* Nose */}
      <ellipse cx="50" cy="52" rx="5" ry="3.5" fill="url(#bg-nose)" />
      <ellipse cx="49" cy="51" rx="1.5" ry="1" fill="#64748b" opacity="0.4" />

      {/* Mouth */}
      <path
        d={mouthPaths[mood] || mouthPaths.neutral}
        fill={mood === 'scared' ? '#fca5a5' : 'none'}
        stroke="#64748b"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Cheek blush */}
      {(mood === 'happy' || mood === 'calm' || isHovered) && (
        <>
          <circle cx="32" cy="54" r="5" fill="url(#bg-cheek)" />
          <circle cx="68" cy="54" r="5" fill="url(#bg-cheek)" />
        </>
      )}

      {/* Arms */}
      <ellipse cx="22" cy="76" rx="10" ry="7" fill="url(#bg-fur)" transform="rotate(-20 22 76)" filter="url(#soft-shadow)" />
      <ellipse cx="78" cy="76" rx="10" ry="7" fill="url(#bg-fur)" transform="rotate(20 78 76)" filter="url(#soft-shadow)" />

      {/* Happy sparkle */}
      {mood === 'happy' && isHovered && (
        <>
          <text x="12" y="18" fontSize="6" opacity="0.6">✨</text>
          <text x="80" y="16" fontSize="5" opacity="0.5">✨</text>
          <text x="75" y="40" fontSize="4" opacity="0.4">⭐</text>
        </>
      )}

      {/* Scared sweat drops */}
      {mood === 'scared' && (
        <>
          <ellipse cx="30" cy="38" rx="1.2" ry="2" fill="#7dd3fc" opacity="0.6">
            <animate attributeName="cy" values="38;42;38" dur="1.5s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="70" cy="36" rx="1" ry="1.8" fill="#7dd3fc" opacity="0.5">
            <animate attributeName="cy" values="36;41;36" dur="1.8s" repeatCount="indefinite" />
          </ellipse>
        </>
      )}
    </svg>
  )
}

function SnowParticles({ count }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      x: (i * 43) % 100,
      size: 2 + (i % 3),
      delay: (i * 0.7) % 5,
      dur: 4 + (i % 4),
      opacity: 0.3 + (i % 4) * 0.15,
    })),
    [count]
  )
  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: '-4px',
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `snow-fall ${p.dur}s ${p.delay}s linear infinite`,
          }}
        />
      ))}
    </>
  )
}

export default function HeroMascot() {
  const { greenScore = 100, mascotName, setMascotName } = useProfile()
  const [isHovered, setIsHovered] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [tempName, setTempName] = useState('')
  const [showTip, setShowTip] = useState(false)
  const [clicked, setClicked] = useState(false)

  const safeScore = (typeof greenScore === 'number' && !isNaN(greenScore)) ? greenScore : 100
  const state = getState(safeScore)
  const stateKey = state.key || 'THRIVING'
  const tips = STATE_TIPS[stateKey] || STATE_TIPS.THRIVING || []
  const randomTip = useMemo(() => tips[Math.floor(Math.random() * tips.length)] || 'Keep up the green habits!', [stateKey])

  const handleClick = () => {
    setClicked(true)
    setTimeout(() => setClicked(false), 400)
  }

  const handleNameSubmit = (e) => {
    e.preventDefault()
    if (!tempName.trim()) return
    setMascotName(tempName)
    setIsEditing(false)
    if (safeScore > 50) {
      try {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 }, colors: ['#22c55e', '#3b82f6', '#f59e0b'] })
      } catch {}
    }
  }

  const stateAnimations = {
    THRIVING:   { y: isHovered ? -10 : [0, -4, 0], rotate: 0, scale: clicked ? 1.1 : (isHovered ? 1.06 : 1), transition: { y: { repeat: Infinity, duration: 3, ease: 'easeInOut' }, scale: { type: 'spring', stiffness: 300 } } },
    HEALTHY:    { y: isHovered ? -6 : [0, -3, 0], rotate: 0, scale: clicked ? 1.08 : 1, transition: { y: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' }, scale: { type: 'spring', stiffness: 250 } } },
    STABLE:     { y: [0, -2, 0], rotate: [0, 1, 0, -1, 0], transition: { y: { repeat: Infinity, duration: 4 }, rotate: { repeat: Infinity, duration: 6 } } },
    CONCERNED:  { y: 0, rotate: [-1.5, 1.5, -1.5], transition: { rotate: { repeat: Infinity, duration: 2, ease: 'easeInOut' } } },
    DISTRESSED: { y: [0, 3, 0], rotate: [-2, 2, -2], transition: { y: { repeat: Infinity, duration: 1.5 }, rotate: { repeat: Infinity, duration: 1 } } },
    CRITICAL:   { y: [0, 5, 0], rotate: [-3, 3, -3], scale: [1, 0.96, 1], transition: { y: { repeat: Infinity, duration: 0.7 }, rotate: { repeat: Infinity, duration: 0.5 }, scale: { repeat: Infinity, duration: 1 } } },
  }

  const snowCount = safeScore >= 70 ? 12 : safeScore >= 40 ? 6 : 0

  return (
    <div
      className="relative w-full max-w-sm mx-auto select-none"
      style={{ height: 420 }}
    >
      {/* Scene background */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${MOOD_BG[state.mood] || 'from-sky-50 to-blue-100'} transition-all duration-1000 overflow-hidden`}>
        {/* Aurora bands for good states */}
        {safeScore >= 70 && (
          <div className="absolute inset-x-0 top-0 h-24 overflow-hidden opacity-30">
            <div className="absolute w-[200%] h-8 bg-gradient-to-r from-transparent via-emerald-300 to-transparent rounded-full aurora-band" style={{ top: '10px', left: '-25%' }} />
            <div className="absolute w-[200%] h-6 bg-gradient-to-r from-transparent via-cyan-300 to-transparent rounded-full aurora-band-2" style={{ top: '30px', left: '-40%' }} />
            <div className="absolute w-[200%] h-5 bg-gradient-to-r from-transparent via-violet-300 to-transparent rounded-full aurora-band" style={{ top: '50px', left: '-15%' }} />
          </div>
        )}

        {/* Snow particles */}
        {snowCount > 0 && <SnowParticles count={snowCount} />}

        {/* Danger vignette for low scores */}
        {safeScore < 30 && (
          <div
            className="absolute inset-0 rounded-3xl transition-opacity duration-1000"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(220,38,38,0.15) 100%)',
              opacity: safeScore < 15 ? 0.8 : 0.4,
            }}
          />
        )}
      </div>

      {/* Water / ocean at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 rounded-b-3xl overflow-hidden">
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background: safeScore >= 50
              ? 'linear-gradient(to bottom, rgba(186,230,253,0.4), rgba(56,189,248,0.6))'
              : 'linear-gradient(to bottom, rgba(148,163,184,0.3), rgba(100,116,139,0.5))',
          }}
        />
        <div className="water-wave absolute bottom-0 left-0 right-0 h-6" />
      </div>

      {/* Ice cap */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000" style={{ width: `${60 + state.iceScale * 30}%` }}>
        <svg viewBox="0 0 200 50" className="w-full" preserveAspectRatio="xMidYMax meet">
          <defs>
            <linearGradient id="ice-top" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f0f9ff" />
              <stop offset="100%" stopColor="#e0f2fe" />
            </linearGradient>
            <linearGradient id="ice-side" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#7dd3fc" />
            </linearGradient>
          </defs>
          <path d="M 20 25 L 30 10 L 60 6 L 100 4 L 140 6 L 170 10 L 180 25 L 175 40 L 160 46 L 100 48 L 40 46 L 25 40 Z" fill="url(#ice-top)" />
          <path d="M 20 25 L 25 40 L 40 46 L 100 48 L 160 46 L 175 40 L 180 25" fill="url(#ice-side)" opacity="0.6" />
          <path d="M 30 10 L 60 6 L 100 4 L 140 6 L 170 10 L 165 14 L 140 10 L 100 8 L 60 10 L 35 14 Z" fill="#fff" opacity="0.5" />
        </svg>
      </div>

      {/* Bear */}
      <motion.div
        className="absolute inset-0 flex items-end justify-center cursor-pointer"
        style={{ paddingBottom: '55px' }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
        animate={stateAnimations[stateKey] || stateAnimations.THRIVING}
      >
        <div className="w-[48%]">
          <PolarBearSVG mood={state.mood} isHovered={isHovered} />
        </div>
      </motion.div>

      {/* State pill + score */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
        <motion.div
          className="bg-white/90 backdrop-blur-md rounded-full px-3.5 py-1.5 text-xs font-bold text-gray-600 shadow-sm border border-white/50"
          whileHover={{ scale: 1.05 }}
        >
          <span className="mr-1.5">
            {stateKey === 'THRIVING' ? '🌟' : stateKey === 'HEALTHY' ? '💚' : stateKey === 'STABLE' ? '😐' : stateKey === 'CONCERNED' ? '😟' : stateKey === 'DISTRESSED' ? '😰' : '🆘'}
          </span>
          {state.label}
        </motion.div>
        <div
          className="bg-white/90 backdrop-blur-md rounded-full px-3.5 py-1.5 text-xs font-bold shadow-sm border border-white/50"
          style={{ color: safeScore >= 70 ? '#16a34a' : safeScore >= 40 ? '#ca8a04' : '#dc2626' }}
        >
          {Math.round(safeScore)}/100
        </div>
      </div>

      {/* Name / editing */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 w-full flex justify-center pb-2">
        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.form
              key="edit"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              onSubmit={handleNameSubmit}
              className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg border border-gray-100"
            >
              <input
                autoFocus
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Name your bear"
                maxLength={20}
                className="w-32 text-sm outline-none bg-transparent text-gray-800 placeholder:text-gray-300"
              />
              <button type="submit" className="p-1 rounded-full hover:bg-green-50 text-green-600 transition-colors">
                <Check size={16} />
              </button>
            </motion.form>
          ) : (
            <motion.button
              key="display"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              onClick={(e) => { e.stopPropagation(); setTempName(mascotName || ''); setIsEditing(true) }}
              className="flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all border border-white/50 text-sm"
            >
              <span className="font-semibold text-gray-700">
                {mascotName || 'Name your bear'}
              </span>
              <Edit2 size={13} className="text-gray-400" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Tip toggle */}
      <button
        className="absolute top-3 right-14 z-30 bg-white/90 backdrop-blur-md rounded-full p-1.5 shadow-sm hover:shadow-md transition-all border border-white/50"
        onClick={() => setShowTip((v) => !v)}
      >
        <Info size={14} className="text-gray-500" />
      </button>
      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -8 }}
            className="absolute top-12 right-3 z-40 bg-white rounded-2xl shadow-xl p-4 max-w-[200px] text-sm text-gray-600 border border-gray-100"
          >
            <p className="font-medium text-gray-800 mb-1 text-xs uppercase tracking-wide">{state.label}</p>
            {randomTip}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
