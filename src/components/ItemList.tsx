import { useAppContext } from '../hooks/useAppContext'
import { Trash2 } from 'lucide-react'

export default function ItemList({ onBack }: { onBack: () => void }) {
  const { getItemsForCurrentSite, deleteItem } = useAppContext()
  const items = getItemsForCurrentSite()

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={onBack} className="text-gray-600">← Retour</button>
        <h2 className="text-xl font-bold">📋 Articles ({items.length})</h2>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Aucun article pour ce site.</p>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">{item.quantity} × {item.category} = {item.carbonValue.toFixed(2)} kg CO2eq</p>
              </div>
              <button onClick={() => deleteItem(item.id)} className="text-red-500 p-2">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}