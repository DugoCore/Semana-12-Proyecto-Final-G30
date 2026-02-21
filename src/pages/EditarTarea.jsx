import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTareasContext } from '../context/TareasContext'
import FormularioTarea from '../components/FormularioTarea'

export default function EditarTarea() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getTareaById, actualizarTarea, loading: loadingContext, error } = useTareasContext()
  const [tarea, setTarea] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const t = getTareaById(id)
    setTarea(t)
  }, [id, getTareaById])

  const handleSubmit = async ({ titulo, descripcion }) => {
    if (!tarea) return
    setLoading(true)
    try {
      await actualizarTarea(tarea.id, { titulo, descripcion })
      navigate('/')
    } catch {
      // error en context
    } finally {
      setLoading(false)
    }
  }

  if (loadingContext && !tarea) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
      </div>
    )
  }

  if (!tarea && !loadingContext) {
    return (
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 p-8 text-center">
        <p className="text-slate-400">Tarea no encontrada.</p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-4 text-amber-400 hover:underline"
        >
          Volver al listado
        </button>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-slate-100">Editar tarea</h1>
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 p-6">
        <FormularioTarea
          tarea={tarea}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}
