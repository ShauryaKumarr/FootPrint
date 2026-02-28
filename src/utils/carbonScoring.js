// Keyword-based matching for Plaid categories.
// Plaid returns categories as arrays like ["Travel", "Airlines and Aviation Services"]
// or uses personal_finance_category with primary/detailed fields.
// We match using lowercase keyword search to handle all Plaid formats.

const KEYWORD_RULES = [
  // Transport — highest impact
  { keywords: ['airline', 'aviation', 'flight'],           sector: 'Transport', multiplier: 0.95 },
  { keywords: ['gas station', 'fuel', 'petroleum'],        sector: 'Transport', multiplier: 0.79 },
  { keywords: ['ride share', 'rideshare', 'uber', 'lyft'], sector: 'Transport', multiplier: 0.45 },
  { keywords: ['taxi', 'cab'],                             sector: 'Transport', multiplier: 0.45 },
  { keywords: ['car rental', 'car service', 'auto'],       sector: 'Transport', multiplier: 0.40 },
  { keywords: ['parking', 'tolls'],                        sector: 'Transport', multiplier: 0.15 },
  { keywords: ['public transit', 'bus', 'train', 'metro'], sector: 'Transport', multiplier: 0.10 },
  { keywords: ['travel'],                                  sector: 'Transport', multiplier: 0.50 },

  // Food
  { keywords: ['fast food'],                                          sector: 'Food', multiplier: 0.42 },
  { keywords: ['restaurant', 'dining', 'food and drink', 'bar'],      sector: 'Food', multiplier: 0.34 },
  { keywords: ['coffee', 'café', 'cafe', 'tea'],                      sector: 'Food', multiplier: 0.20 },
  { keywords: ['groceries', 'grocery', 'supermarket', 'food store'],  sector: 'Food', multiplier: 0.22 },

  // Fashion
  { keywords: ['clothing', 'apparel', 'fashion', 'shoes', 'accessori'], sector: 'Fashion', multiplier: 0.38 },
  { keywords: ['department store'],                                      sector: 'Fashion', multiplier: 0.32 },
  { keywords: ['discount store', 'thrift'],                              sector: 'Fashion', multiplier: 0.25 },

  // Energy / Utilities
  { keywords: ['utilit', 'electric', 'power', 'water'],    sector: 'Energy', multiplier: 0.55 },
  { keywords: ['gas bill', 'natural gas', 'heating'],       sector: 'Energy', multiplier: 0.72 },
  { keywords: ['internet', 'cable', 'phone', 'telecom'],    sector: 'Energy', multiplier: 0.12 },

  // Shopping / General
  { keywords: ['electronics', 'computer', 'tech'],                             sector: 'Shopping', multiplier: 0.40 },
  { keywords: ['online', 'marketplace', 'amazon', 'e-commerce'],               sector: 'Shopping', multiplier: 0.30 },
  { keywords: ['general merchandise', 'merchandise', 'shops', 'retail'],        sector: 'Shopping', multiplier: 0.28 },
  { keywords: ['subscription', 'streaming', 'digital', 'software'],            sector: 'Shopping', multiplier: 0.08 },
  { keywords: ['home improvement', 'hardware', 'furniture'],                   sector: 'Shopping', multiplier: 0.32 },
  { keywords: ['sporting good', 'hobby', 'book', 'music'],                     sector: 'Shopping', multiplier: 0.18 },

  // Low impact
  { keywords: ['gym', 'fitness', 'recreation', 'sport'],       sector: 'Other', multiplier: 0.10 },
  { keywords: ['education', 'school', 'university', 'tuition'], sector: 'Other', multiplier: 0.08 },
  { keywords: ['healthcare', 'medical', 'pharmacy', 'doctor'],  sector: 'Other', multiplier: 0.12 },
  { keywords: ['insurance'],                                     sector: 'Other', multiplier: 0.05 },
  { keywords: ['government', 'non-profit', 'tax'],               sector: 'Other', multiplier: 0.04 },
  { keywords: ['bank', 'financial', 'interest', 'fee'],          sector: 'Other', multiplier: 0.03 },
  { keywords: ['transfer', 'payment', 'deposit', 'withdrawal'], sector: 'Other', multiplier: 0.00 },
  { keywords: ['rent', 'mortgage', 'loan'],                      sector: 'Other', multiplier: 0.05 },
]

const FALLBACK_MULTIPLIER = 0.20
const FALLBACK_SECTOR = 'Other'

function matchTransaction(transaction) {
  const searchText = [
    ...(transaction.category || []),
    transaction.name || '',
    transaction.merchant_name || '',
    transaction.personal_finance_category?.primary || '',
    transaction.personal_finance_category?.detailed || '',
  ].join(' ').toLowerCase()

  for (const rule of KEYWORD_RULES) {
    for (const kw of rule.keywords) {
      if (searchText.includes(kw)) {
        return { sector: rule.sector, multiplier: rule.multiplier }
      }
    }
  }

  return { sector: FALLBACK_SECTOR, multiplier: FALLBACK_MULTIPLIER }
}

export function getGrade(kgCO2) {
  if (kgCO2 <= 1)  return { grade: 'A', color: 'text-green-600',  bg: 'bg-green-100',  label: 'Excellent' }
  if (kgCO2 <= 3)  return { grade: 'B', color: 'text-emerald-600', bg: 'bg-emerald-100', label: 'Good' }
  if (kgCO2 <= 8)  return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Moderate' }
  if (kgCO2 <= 20) return { grade: 'D', color: 'text-orange-600', bg: 'bg-orange-100', label: 'High' }
  return               { grade: 'F', color: 'text-red-600',    bg: 'bg-red-100',    label: 'Very High' }
}

export function scoreTransaction(transaction) {
  const amount = Math.abs(transaction.amount)
  const { sector, multiplier } = matchTransaction(transaction)
  const kgCO2 = Math.round(amount * multiplier * 100) / 100
  const gradeInfo = getGrade(kgCO2)

  return {
    ...transaction,
    amount,
    kgCO2,
    sector,
    multiplier,
    ...gradeInfo,
  }
}

export function scoreTransactions(transactions) {
  return transactions
    .filter(t => t.amount > 0)
    .map(scoreTransaction)
    .sort((a, b) => b.kgCO2 - a.kgCO2)
}

export function computeSummary(scored) {
  const totalSpend = scored.reduce((sum, t) => sum + t.amount, 0)
  const totalCO2 = scored.reduce((sum, t) => sum + t.kgCO2, 0)

  const bySector = {}
  for (const t of scored) {
    if (!bySector[t.sector]) bySector[t.sector] = { spend: 0, co2: 0, count: 0 }
    bySector[t.sector].spend += t.amount
    bySector[t.sector].co2 += t.kgCO2
    bySector[t.sector].count += 1
  }

  const greenSpend = scored
    .filter(t => t.grade === 'A' || t.grade === 'B')
    .reduce((sum, t) => sum + t.amount, 0)
  const greenPct = totalSpend > 0 ? Math.round((greenSpend / totalSpend) * 100) : 0

  const gradeDistribution = { A: 0, B: 0, C: 0, D: 0, F: 0 }
  for (const t of scored) gradeDistribution[t.grade]++

  return { totalSpend, totalCO2, bySector, greenPct, gradeDistribution, count: scored.length }
}

// ~900 kg CO2/month is the US average for household consumption-based footprint
export const MONTHLY_BUDGET_KG = 900

export function getBudgetStatus(totalCO2) {
  const pct = Math.round((totalCO2 / MONTHLY_BUDGET_KG) * 100)
  if (pct <= 50)  return { pct, status: 'excellent', color: 'text-green-600',  barColor: 'bg-green-500',  message: 'Well under budget — great job!' }
  if (pct <= 75)  return { pct, status: 'good',      color: 'text-emerald-600', barColor: 'bg-emerald-500', message: 'On track — keep it up.' }
  if (pct <= 100) return { pct, status: 'warning',   color: 'text-yellow-600', barColor: 'bg-yellow-500', message: 'Approaching your monthly budget.' }
  return                  { pct, status: 'over',      color: 'text-red-600',    barColor: 'bg-red-500',    message: 'Over budget — time to make changes.' }
}

export function getReductions(bySector, totalCO2) {
  const suggestions = []

  // Sort sectors by CO2 output descending to prioritize worst offenders
  const sorted = Object.entries(bySector)
    .filter(([, data]) => data.co2 > 0)
    .sort((a, b) => b[1].co2 - a[1].co2)

  const sectorAdvice = {
    Transport: [
      { icon: '🚲', title: 'Bike or walk for short trips', saving: 0.4 },
      { icon: '🚇', title: 'Take public transit instead of driving', saving: 0.35 },
      { icon: '🛫', title: 'Choose direct flights — layovers double emissions', saving: 0.25 },
      { icon: '🚗', title: 'Carpool or use electric ride-shares', saving: 0.3 },
    ],
    Food: [
      { icon: '🥗', title: 'Swap 2 meat meals per week for plant-based', saving: 0.3 },
      { icon: '🏪', title: 'Cook at home more — restaurants have higher footprints', saving: 0.25 },
      { icon: '🌽', title: 'Buy local and seasonal produce', saving: 0.2 },
    ],
    Fashion: [
      { icon: '♻️', title: 'Try thrift stores and secondhand marketplaces', saving: 0.5 },
      { icon: '👕', title: 'Buy fewer, higher-quality pieces that last', saving: 0.35 },
      { icon: '🧵', title: 'Repair clothes instead of replacing them', saving: 0.3 },
    ],
    Energy: [
      { icon: '💡', title: 'Switch to LED bulbs and smart thermostats', saving: 0.25 },
      { icon: '☀️', title: 'Look into community solar or green energy plans', saving: 0.4 },
      { icon: '🔌', title: 'Unplug devices when not in use', saving: 0.15 },
    ],
    Shopping: [
      { icon: '📦', title: 'Buy refurbished electronics instead of new', saving: 0.4 },
      { icon: '🛑', title: 'Use a 48-hour rule before impulse purchases', saving: 0.3 },
      { icon: '🔄', title: 'Consolidate online orders to reduce shipping', saving: 0.2 },
    ],
    Other: [
      { icon: '📋', title: 'Review subscriptions — cancel what you don\'t use', saving: 0.2 },
      { icon: '🌳', title: 'Offset remaining emissions with verified carbon credits', saving: 0.15 },
    ],
  }

  for (const [sector, data] of sorted) {
    const advice = sectorAdvice[sector] || sectorAdvice.Other
    const pick = advice[Math.floor(Math.random() * advice.length)]
    const saveable = Math.round(data.co2 * pick.saving)
    if (saveable > 0) {
      suggestions.push({
        sector,
        icon: pick.icon,
        title: pick.title,
        impact: `Could save ~${saveable} kg CO₂/month from ${sector.toLowerCase()}`,
        co2: data.co2,
      })
    }
  }

  // Always add overall urgency-based advice depending on total CO2
  const budgetPct = totalCO2 / MONTHLY_BUDGET_KG
  if (budgetPct > 2) {
    suggestions.unshift({
      sector: 'Critical',
      icon: '🚨',
      title: 'Your footprint is over 2x the monthly budget',
      impact: `You need to cut ~${Math.round(totalCO2 - MONTHLY_BUDGET_KG)} kg CO₂ to get back on track. Focus on your top categories.`,
      co2: totalCO2,
      urgent: true,
    })
  } else if (budgetPct > 1) {
    suggestions.unshift({
      sector: 'Warning',
      icon: '⚠️',
      title: `You're ${Math.round((budgetPct - 1) * 100)}% over your monthly carbon budget`,
      impact: `Cut ~${Math.round(totalCO2 - MONTHLY_BUDGET_KG)} kg CO₂ by targeting your highest sectors below.`,
      co2: totalCO2,
      urgent: true,
    })
  }

  return suggestions
}
