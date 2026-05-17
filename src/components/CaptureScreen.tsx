import { useState } from 'react'
import { useAppContext } from '../hooks/useAppContext'
import { ADEME_FACTORS } from '../lib/types'
import { ChevronLeft, Camera } from 'lucide-react'

export default function CaptureScreen({ onBack }: { onBack: () => void }) {
  const { addItem, currentSite } = useAppContext()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('electronics')
  const [quantity, setQuantity] = useState(1)

  const handleSubmit = () => {
    if (!name.trim() || !currentSite) return
    addItem({
      siteId: currentSite.id,
      category,
      name: name.trim(),
      quantity,
      calculationMethod: 'ADEME - Base Empreinte',
    })
    onBack()
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={onBack}><ChevronLeft className="w-6 h-6" /></button>
        <h2 className="text-xl font-bold">➕ Nouvel article</h2>
      </div>

      <div className="space-y-3">
        <input
          placeholder="Nom de l'article"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-3 border rounded-xl"
        />
        
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full p-3 border rounded-xl"
        >
          {ADEME_FACTORS.map(f => (
            <option key={f.category} value={f.category}>{f.labelFr}</option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={e => setQuantity(parseInt(e.target.value) || 1)}
          className="w-full p-3 border rounded-xl"
        />

        <button
          onClick={handleSubmit}
          disabled={!name.trim()}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-medium disabled:opacity-50"
        >
          Valider
        </button>
      </div>
    </div>
  )
}