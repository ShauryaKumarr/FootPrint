export const MASCOT_STATES = {
  THRIVING:   { min: 85, max: 100, label: 'Thriving',   mood: 'happy',   iceScale: 1.15 },
  HEALTHY:    { min: 70, max: 84,  label: 'Healthy',    mood: 'calm',    iceScale: 1.0 },
  STABLE:     { min: 50, max: 69,  label: 'Stable',     mood: 'neutral', iceScale: 0.85 },
  CONCERNED:  { min: 35, max: 49,  label: 'Concerned',  mood: 'worried', iceScale: 0.7 },
  DISTRESSED: { min: 20, max: 34,  label: 'Distressed', mood: 'sad',     iceScale: 0.55 },
  CRITICAL:   { min: 0,  max: 19,  label: 'Critical',   mood: 'scared',  iceScale: 0.4 },
}

export const STATE_TIPS = {
  THRIVING:   ['Amazing work!', 'Your bear is thriving!', 'Keep it up, carbon hero!'],
  HEALTHY:    ['Doing great!', 'Stable and sustainable.', 'Nice green habits!'],
  STABLE:     ['Room to improve.', 'Try a green alternative.', 'Small changes help!'],
  CONCERNED:  ['Watch your spending.', 'Carbon is rising.', 'Think green!'],
  DISTRESSED: ['Ice is melting fast!', 'Reduce your footprint.', 'Action needed!'],
  CRITICAL:   ['EMERGENCY!', 'Save the bear!', 'Change your habits NOW!'],
}

export function getState(score) {
  const s = Math.round(score)
  if (s >= 85) return { ...MASCOT_STATES.THRIVING, key: 'THRIVING' }
  if (s >= 70) return { ...MASCOT_STATES.HEALTHY,  key: 'HEALTHY' }
  if (s >= 50) return { ...MASCOT_STATES.STABLE,   key: 'STABLE' }
  if (s >= 35) return { ...MASCOT_STATES.CONCERNED, key: 'CONCERNED' }
  if (s >= 20) return { ...MASCOT_STATES.DISTRESSED, key: 'DISTRESSED' }
  return { ...MASCOT_STATES.CRITICAL, key: 'CRITICAL' }
}
