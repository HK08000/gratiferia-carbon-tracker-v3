export interface Item {
  id: string
  siteId: string
  category: string
  name: string
  quantity: number
  carbonValue: number
  calculationMethod: string
  timestamp: number
  photoUri?: string
}

export interface Site {
  id: string
  name: string
}

export interface AppState {
  isCapturing: boolean
  currentSession: Site | null
  settings: {
    language: string
    currency: string
    carbonUnit: string
  }
}

export type AppAction =
  | { type: 'ADD_ITEM'; payload: Item }
  | { type: 'DELETE_ITEM'; payload: string }
  | { type: 'SET_SITE'; payload: Site }
  | { type: 'START_SESSION'; payload: Site }
  | { type: 'END_SESSION' }
  | { type: 'CLEAR_ALL' }

export const initialState: AppState = {
  isCapturing: false,
  currentSession: null,
  settings: { language: 'fr', currency: 'EUR', carbonUnit: 'kg' }
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, isCapturing: false }
    case 'DELETE_ITEM':
      return state
    case 'SET_SITE':
    case 'START_SESSION':
      return { ...state, currentSession: action.payload, isCapturing: true }
    case 'END_SESSION':
      return { ...state, currentSession: null, isCapturing: false }
    case 'CLEAR_ALL':
      return initialState
    default:
      return state
  }
}

export const ADEME_FACTORS = [
  { category: 'electronics', labelFr: 'Électronique', emissionFactor: 30, calculationMethod: 'Moyenne', description: 'Smartphone, tablette, petit matériel' },
  { category: 'furniture', labelFr: 'Mobilier', emissionFactor: 50, calculationMethod: 'Moyenne', description: 'Chaise, bureau, étagère' },
  { category: 'textile', labelFr: 'Textile', emissionFactor: 8, calculationMethod: 'Moyenne', description: 'Vêtements, tissus, linge' },
  { category: 'books', labelFr: 'Livres & Papier', emissionFactor: 2, calculationMethod: 'Moyenne', description: 'Livres, magazines, papier' },
  { category: 'toys', labelFr: 'Jouets', emissionFactor: 5, calculationMethod: 'Moyenne', description: 'Jouets, jeux, loisirs' },
  { category: 'other', labelFr: 'Autre', emissionFactor: 10, calculationMethod: 'Estimation', description: 'Objet non catégorisé' },
]

export function getCategoryLabel(category: string): string {
  return ADEME_FACTORS.find(f => f.category === category)?.labelFr || category
}

export function calculateCarbonFootprint(category: string, quantity: number): number {
  const factor = ADEME_FACTORS.find(f => f.category === category)?.emissionFactor || 10
  return factor * quantity
}