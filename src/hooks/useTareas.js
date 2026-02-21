import { useState, useEffect, useCallback } from 'react'
import { getTareas, saveTareas } from '../services/tareasStorage'

/**
 * Genera un id único para nuevas tareas.
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export function useTareas() {
  const [tareas, setTareas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadTareas = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getTareas()
      setTareas(data)
    } catch (err) {
      setError(err.message || 'Error al cargar tareas')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTareas()
  }, [loadTareas])

  const crearTarea = useCallback(async (titulo, descripcion = '') => {
    setError(null)
    try {
      const nueva = {
        id: generateId(),
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        completada: false,
        fechaCreacion: new Date().toISOString(),
      }
      const actualizadas = [...tareas, nueva]
      await saveTareas(actualizadas)
      setTareas(actualizadas)
      return nueva
    } catch (err) {
      setError(err.message || 'Error al crear la tarea')
      throw err
    }
  }, [tareas])

  const actualizarTarea = useCallback(async (id, datos) => {
    setError(null)
    try {
      const actualizadas = tareas.map((t) =>
        t.id === id ? { ...t, ...datos } : t
      )
      await saveTareas(actualizadas)
      setTareas(actualizadas)
    } catch (err) {
      setError(err.message || 'Error al actualizar la tarea')
      throw err
    }
  }, [tareas])

  const eliminarTarea = useCallback(async (id) => {
    setError(null)
    try {
      const actualizadas = tareas.filter((t) => t.id !== id)
      await saveTareas(actualizadas)
      setTareas(actualizadas)
    } catch (err) {
      setError(err.message || 'Error al eliminar la tarea')
      throw err
    }
  }, [tareas])

  const getTareaById = useCallback((id) => {
    return tareas.find((t) => t.id === id) ?? null
  }, [tareas])

  return {
    tareas,
    loading,
    error,
    loadTareas,
    crearTarea,
    actualizarTarea,
    eliminarTarea,
    getTareaById,
  }
}
