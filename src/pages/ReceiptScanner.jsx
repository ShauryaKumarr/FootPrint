import { useState, useRef } from 'react'
import { createWorker } from 'tesseract.js'
import { useProfile } from '../context/ProfileContext'
import { parseReceiptText, areResultsSensible } from '../utils/receiptParser'

const MIN_CONFIDENCE = 40
const MIN_RAW_LENGTH = 20

export default function ReceiptScanner() {
  const { bankConnected, addReceiptItems } = useProfile()
  const [image, setImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [items, setItems] = useState([])
  const [added, setAdded] = useState(false)
  const [error, setError] = useState(null)
  const [warning, setWarning] = useState(null)
  const fileRef = useRef(null)

  const reset = () => {
    setImage(null)
    setPreviewUrl(null)
    setItems([])
    setAdded(false)
    setError(null)
    setWarning(null)
    setProgress(0)
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const valid = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!valid.includes(file.type)) {
      setError('Please upload a valid image (JPEG, PNG, WebP, or GIF).')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image is too large (max 10 MB).')
      return
    }
    setError(null)
    setWarning(null)
    setImage(file)
    setPreviewUrl(URL.createObjectURL(file))
    setItems([])
    setAdded(false)
  }

  const handleScan = async () => {
    if (!image) return
    setScanning(true)
    setError(null)
    setWarning(null)
    setProgress(0)

    try {
      const worker = await createWorker('eng', 1, {
        logger: (m) => {
          if (m.status === 'recognizing text') setProgress(Math.round(m.progress * 100))
        },
      })
      const { data } = await worker.recognize(image)
      await worker.terminate()

      if (data.confidence < MIN_CONFIDENCE) {
        setError(
          `The image appears blurry or hard to read (confidence: ${Math.round(data.confidence)}%). ` +
          'Try a clearer photo with good lighting and no glare.'
        )
        setScanning(false)
        return
      }

      const rawText = data.text || ''
      if (rawText.length < MIN_RAW_LENGTH) {
        setError(
          'Very little text was detected. Make sure the receipt is clearly visible and well-lit.'
        )
        setScanning(false)
        return
      }

      const parsed = parseReceiptText(rawText)
      if (!areResultsSensible(parsed)) {
        setWarning(
          'The text was read but didn\'t look like a typical receipt. ' +
          'Results may be inaccurate — try a cleaner photo.'
        )
      }

      if (parsed.length === 0 && !warning) {
        setError(
          'No line items could be extracted. ' +
          'Ensure the receipt has visible item names and prices.'
        )
        setScanning(false)
        return
      }

      setItems(parsed)
    } catch (err) {
      console.error('OCR error:', err)
      setError('Something went wrong during scanning. Please try again.')
    } finally {
      setScanning(false)
    }
  }

  const handleAddToProfile = () => {
    if (!bankConnected) return
    addReceiptItems(items)
    setAdded(true)
  }

  const totalCO2 = items.reduce((s, i) => s + parseFloat(i.co2 || 0), 0)

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Receipt Scanner</h1>
      <p className="text-gray-500 mb-8">
        Upload a receipt image to extract line items and estimate their carbon footprint.
      </p>

      {/* Upload area */}
      <div
        className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-10 text-center mb-6 hover:border-green-400 transition-colors cursor-pointer"
        onClick={() => fileRef.current?.click()}
      >
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        {previewUrl ? (
          <img src={previewUrl} alt="Receipt preview" className="mx-auto max-h-64 rounded-lg mb-4 object-contain" />
        ) : (
          <div className="text-6xl mb-4">📷</div>
        )}
        <p className="text-gray-600 font-medium">
          {previewUrl ? 'Click to change image' : 'Click to upload a receipt image'}
        </p>
        <p className="text-sm text-gray-400 mt-1">JPEG, PNG, WebP, GIF — max 10 MB</p>
      </div>

      {/* Scan button */}
      {image && items.length === 0 && !scanning && (
        <button
          onClick={handleScan}
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors mb-6"
        >
          Scan Receipt
        </button>
      )}

      {/* Progress */}
      {scanning && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>Scanning…</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <span className="font-semibold">Error:</span> {error}
        </div>
      )}

      {/* Warning */}
      {warning && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-700 text-sm">
          <span className="font-semibold">Warning:</span> {warning}
        </div>
      )}

      {/* Results */}
      {items.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Extracted Items ({items.length})
            </h3>
            <span className="text-sm font-bold text-gray-500">
              Total: {totalCO2.toFixed(1)} kg CO₂
            </span>
          </div>
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${item.price}</p>
                  <p className={`text-xs font-bold ${
                    item.grade === 'A' ? 'text-green-600' :
                    item.grade === 'B' ? 'text-emerald-600' :
                    item.grade === 'C' ? 'text-yellow-600' :
                    item.grade === 'D' ? 'text-orange-600' :
                    'text-red-500'
                  }`}>
                    Grade {item.grade} — {item.co2} kg CO₂
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Add to profile */}
          <div className="mt-5 pt-4 border-t border-gray-100">
            {added ? (
              <p className="text-center text-green-600 font-semibold">
                Added to your carbon profile!
              </p>
            ) : !bankConnected ? (
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">
                  Connect your bank account first to track receipt items in your profile.
                </p>
                <button disabled className="px-6 py-2.5 bg-gray-200 text-gray-500 rounded-xl cursor-not-allowed font-medium">
                  Bank Not Connected
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToProfile}
                className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
              >
                Add to My Carbon Profile
              </button>
            )}
          </div>
        </div>
      )}

      {/* Scan another */}
      {(items.length > 0 || error) && (
        <button
          onClick={reset}
          className="w-full py-3 bg-gray-100 text-gray-600 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
        >
          Scan Another Receipt
        </button>
      )}
    </div>
  )
}
