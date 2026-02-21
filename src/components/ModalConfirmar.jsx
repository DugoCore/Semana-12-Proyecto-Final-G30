export default function ModalConfirmar({ titulo, mensaje, onConfirmar, onCancelar }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onCancelar}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-titulo"
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-titulo" className="text-lg font-semibold text-slate-100">
          {titulo}
        </h2>
        <p className="mt-2 text-slate-400">{mensaje}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancelar}
            className="rounded-lg border border-slate-600 bg-transparent px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirmar}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
