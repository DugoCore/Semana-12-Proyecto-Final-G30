import { Link, useLocation } from 'react-router-dom'

export default function Layout({ children }) {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link
              to="/"
              className="text-xl font-semibold tracking-tight text-amber-400"
            >
              Gestor de Tareas
            </Link>
            <div className="flex gap-4">
              <Link
                to="/"
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  pathname === '/'
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                Listado
              </Link>
              <Link
                to="/nueva"
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  pathname === '/nueva'
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                Nueva tarea
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8">
        {children}
      </main>
    </div>
  )
}
