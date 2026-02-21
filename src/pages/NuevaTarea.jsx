import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTareasContext } from '../context/TareasContext'
import FormularioTarea from '../components/FormularioTarea'

export default function NuevaTarea() {
  const navigate = useNavigate()
  const { crearTarea, error } = useTareasContext()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async ({ titulo, descripcion }) => {
    setLoading(true)
    try {
      await crearTarea(titulo, descripcion)
      navigate('/')
    } catch {
      // error ya está en context
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-slate-100">Nueva tarea</h1>
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 p-6">
        <FormularioTarea
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}
