import { useState } from 'react'

const STAGES = [
  { emoji: '🌱', label: 'Seed', color: 'text-yellow-700' },
  { emoji: '🌿', label: 'Sprout', color: 'text-green-500' },
  { emoji: '🌳', label: 'Healthy Tree', color: 'text-green-600' },
  { emoji: '🌸', label: 'Flowering Tree', color: 'text-green-700' },
]

export default function Mascot({ stage = 1 }) {
  const current = STAGES[Math.min(stage, STAGES.length - 1)]
  const [bouncing, setBouncing] = useState(false)

  const handleClick = () => {
    setBouncing(true)
    setTimeout(() => setBouncing(false), 600)
  }

  return (
    <button
      onClick={handleClick}
      className={`
        fixed bottom-6 right-6 z-50 flex items-center gap-2
        bg-white/90 backdrop-blur-sm border border-green-200
        rounded-full px-4 py-2 shadow-lg cursor-pointer
        hover:shadow-xl transition-all duration-300
        ${bouncing ? 'animate-bounce' : ''}
      `}
    >
      <span className="text-3xl">{current.emoji}</span>
      <span className={`text-sm font-semibold ${current.color}`}>
        {current.label}
      </span>
    </button>
  )
}
