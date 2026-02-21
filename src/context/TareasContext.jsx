import { createContext, useContext } from 'react'
import { useTareas } from '../hooks/useTareas'

const TareasContext = createContext(null)

export function TareasProvider({ children }) {
  const value = useTareas()
  return (
    <TareasContext.Provider value={value}>
      {children}
    </TareasContext.Provider>
  )
}

export function useTareasContext() {
  const ctx = useContext(TareasContext)
  if (!ctx) throw new Error('useTareasContext debe usarse dentro de TareasProvider')
  return ctx
}
