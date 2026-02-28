const CATEGORIES = {
  Transport: { keywords: ['gas', 'fuel', 'uber', 'lyft', 'taxi', 'parking', 'airline', 'flight'], multiplier: 0.7 },
  Food:      { keywords: ['grocery', 'restaurant', 'coffee', 'pizza', 'burger', 'organic', 'milk', 'bread', 'chicken', 'beef', 'salad', 'fruit', 'vegetable'], multiplier: 0.3 },
  Fashion:   { keywords: ['shirt', 'pants', 'shoes', 'jacket', 'dress', 'clothing', 'apparel'], multiplier: 0.4 },
  Energy:    { keywords: ['electric', 'utility', 'power', 'water', 'heating'], multiplier: 0.5 },
  Shopping:  { keywords: ['electronics', 'amazon', 'walmart', 'target', 'battery', 'charger', 'bag', 'plastic'], multiplier: 0.35 },
}

function categorize(name) {
  const lower = name.toLowerCase()
  for (const [cat, { keywords }] of Object.entries(CATEGORIES)) {
    if (keywords.some((kw) => lower.includes(kw))) return cat
  }
  return 'Other'
}

function getGrade(co2) {
  if (co2 <= 1) return 'A'
  if (co2 <= 3) return 'B'
  if (co2 <= 8) return 'C'
  if (co2 <= 20) return 'D'
  return 'F'
}

const SKIP_WORDS = [
  'subtotal', 'sub total', 'sub-total',
  'total', 'grand total',
  'tax', 'sales tax', 'hst', 'gst', 'vat',
  'tip', 'gratuity',
  'change', 'cash', 'credit', 'debit', 'visa', 'mastercard', 'amex',
  'balance', 'amount due', 'payment', 'tender',
  'thank you', 'thanks',
]

function isSummaryLine(text) {
  const lower = text.toLowerCase().replace(/[^a-z ]/g, '').trim()
  return SKIP_WORDS.some((sw) => lower === sw || lower.startsWith(sw + ' ') || lower.endsWith(' ' + sw))
}

export function parseReceiptText(rawText) {
  const lines = rawText.split('\n').map((l) => l.trim()).filter(Boolean)
  const items = []
  const priceRe = /\$?\d+\.\d{2}/

  for (const line of lines) {
    if (isSummaryLine(line)) continue

    const match = line.match(priceRe)
    if (!match) continue
    const price = parseFloat(match[0].replace('$', ''))
    if (price <= 0 || price > 9999) continue

    let name = line.replace(match[0], '').replace(/[^a-zA-Z0-9 ]/g, '').trim()
    if (name.length < 2) continue
    if (isSummaryLine(name)) continue

    const category = categorize(name)
    const multiplier = CATEGORIES[category]?.multiplier ?? 0.25
    const co2 = Math.round(price * multiplier * 100) / 100
    const grade = getGrade(co2)
    items.push({ name, category, price: price.toFixed(2), co2: co2.toFixed(2), grade })
  }
  return items
}

export function areResultsSensible(items) {
  if (!items || items.length === 0) return false
  const avgLen = items.reduce((s, i) => s + (i.name?.length || 0), 0) / items.length
  const lettery = items.filter((i) => {
    const n = (i.name || '').replace(/\s/g, '')
    return n.length >= 2 && n.replace(/[^a-zA-Z]/g, '').length >= n.length * 0.3
  }).length
  return avgLen >= 3 && lettery >= items.length * 0.5
}
