import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTareasContext } from '../context/TareasContext'
import ModalConfirmar from '../components/ModalConfirmar'

export default function ListadoTareas() {
  const { tareas, loading, error, eliminarTarea, actualizarTarea } = useTareasContext()
  const [idAEliminar, setIdAEliminar] = useState(null)

  const handleEliminarClick = (id) => setIdAEliminar(id)
  const handleConfirmarEliminar = async () => {
    if (idAEliminar) {
      await eliminarTarea(idAEliminar)
      setIdAEliminar(null)
    }
  }
  const handleCancelarEliminar = () => setIdAEliminar(null)

  const toggleCompletada = async (t) => {
    await actualizarTarea(t.id, { completada: !t.completada })
  }

  const tareaAEliminar = idAEliminar ? tareas.find((t) => t.id === idAEliminar) : null

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-slate-100">Listado de tareas</h1>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
        </div>
      ) : tareas.length === 0 ? (
        <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 p-12 text-center">
          <p className="text-slate-400">No hay tareas. Crea una desde el enlace superior.</p>
          <Link
            to="/nueva"
            className="mt-4 inline-block rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-amber-400"
          >
            Nueva tarea
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {tareas.map((t) => (
            <li
              key={t.id}
              className={`rounded-xl border bg-slate-800/40 p-4 transition ${
                t.completada ? 'border-slate-700/50 opacity-75' : 'border-slate-700/50'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={t.completada}
                      onChange={() => toggleCompletada(t)}
                      className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-800 text-amber-500 focus:ring-amber-500"
                    />
                    <div>
                      <span
                        className={`block font-medium text-slate-100 ${
                          t.completada ? 'line-through text-slate-500' : ''
                        }`}
                      >
                        {t.titulo}
                      </span>
                      {t.descripcion && (
                        <span className="mt-1 block text-sm text-slate-400">{t.descripcion}</span>
                      )}
                    </div>
                  </label>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Link
                    to={`/editar/${t.id}`}
                    className="rounded-lg border border-slate-600 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700"
                  >
                    Editar
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleEliminarClick(t.id)}
                    className="rounded-lg border border-red-500/50 px-3 py-1.5 text-sm text-red-400 hover:bg-red-500/10"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {tareaAEliminar && (
        <ModalConfirmar
          titulo="Eliminar tarea"
          mensaje={`¿Eliminar "${tareaAEliminar.titulo}"? Esta acción no se puede deshacer.`}
          onConfirmar={handleConfirmarEliminar}
          onCancelar={handleCancelarEliminar}
        />
      )}
    </div>
  )
}
