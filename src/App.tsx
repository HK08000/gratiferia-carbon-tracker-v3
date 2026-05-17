import { useState } from 'react'
import { AppProvider, useAppContext } from './hooks/useAppContext'
import Header from './components/Header'
import CaptureScreen from './components/CaptureScreen'
import ItemList from './components/ItemList'
import ExportScreen from './components/ExportScreen'

function AppContent() {
  const { currentSite, startSession, endSession, getItemsForCurrentSite } = useAppContext()
  const [screen, setScreen] = useState<'home' | 'capture' | 'list' | 'export'>('home')
  const [siteName, setSiteName] = useState('')

  if (!currentSite) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">🌍 Gratiferia Carbon Tracker V3</h1>
          <input
            type="text"
            placeholder="Nom du site (ex: IUT RCC Chalons)"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full p-3 border rounded-xl mb-4"
          />
          <button
            onClick={() => {
              if (siteName.trim()) {
                startSession({ id: siteName.toLowerCase().replace(/\s+/g, '-'), name: siteName })
              }
            }}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-medium"
          >
            Commencer une session
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header onNavigate={setScreen} currentScreen={screen} />
      
      {screen === 'home' && (
        <div className="p-4 space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="font-bold text-gray-800">📍 Site actuel</h2>
            <p className="text-green-600 font-medium">{currentSite.name}</p>
            <button onClick={endSession} className="mt-2 text-sm text-red-500">Changer de site</button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setScreen('capture')} className="bg-green-600 text-white p-4 rounded-xl font-medium">
              ➕ Ajouter
            </button>
            <button onClick={() => setScreen('export')} className="bg-blue-600 text-white p-4 rounded-xl font-medium">
               Exporter
            </button>
          </div>
        </div>
      )}

      {screen === 'capture' && <CaptureScreen onBack={() => setScreen('home')} />}
      {screen === 'list' && <ItemList onBack={() => setScreen('home')} />}
      {screen === 'export' && <ExportScreen onBack={() => setScreen('home')} />}
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}