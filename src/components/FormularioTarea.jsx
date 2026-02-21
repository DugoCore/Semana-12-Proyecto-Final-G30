import { useState, useEffect } from 'react'

export default function FormularioTarea({ tarea, onSubmit, loading, error }) {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')

  useEffect(() => {
    if (tarea) {
      setTitulo(tarea.titulo)
      setDescripcion(tarea.descripcion || '')
    }
  }, [tarea])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!titulo.trim()) return
    onSubmit({ titulo: titulo.trim(), descripcion: descripcion.trim() })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="titulo" className="mb-1 block text-sm font-medium text-slate-400">
          Título
        </label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ej: Comprar leche"
          className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          required
          autoFocus
        />
      </div>
      <div>
        <label htmlFor="descripcion" className="mb-1 block text-sm font-medium text-slate-400">
          Descripción (opcional)
        </label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Detalles de la tarea..."
          rows={4}
          className="w-full resize-none rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading || !titulo.trim()}
          className="rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-amber-400 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : tarea ? 'Actualizar' : 'Crear tarea'}
        </button>
      </div>
    </form>
  )
}
