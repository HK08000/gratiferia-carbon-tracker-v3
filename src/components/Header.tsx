import { Home, Camera, List, Download } from 'lucide-react'

export default function Header({ onNavigate, currentScreen }: { onNavigate: (s: any) => void, currentScreen: string }) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Accueil' },
    { id: 'capture', icon: Camera, label: 'Ajouter' },
    { id: 'list', icon: List, label: 'Liste' },
    { id: 'export', icon: Download, label: 'Export' },
  ]

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex justify-around p-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              currentScreen === tab.id ? 'text-green-600 bg-green-50' : 'text-gray-500'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}