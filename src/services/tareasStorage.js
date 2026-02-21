const STORAGE_KEY = 'crud-tareas'

/**
 * Simula una pequeña demora para poder mostrar estado de carga (asincronía).
 * @param {number} ms
 */
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Obtiene las tareas desde localStorage.
 * @returns {Promise<Array>}
 */
export async function getTareas() {
  await delay()
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (e) {
    throw new Error('Error al leer las tareas')
  }
}

/**
 * Guarda las tareas en localStorage.
 * @param {Array} tareas
 * @returns {Promise<void>}
 */
export async function saveTareas(tareas) {
  await delay()
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas))
  } catch (e) {
    throw new Error('Error al guardar las tareas')
  }
}
