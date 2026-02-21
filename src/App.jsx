import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ListadoTareas from './pages/ListadoTareas'
import NuevaTarea from './pages/NuevaTarea'
import EditarTarea from './pages/EditarTarea'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ListadoTareas />} />
        <Route path="/nueva" element={<NuevaTarea />} />
        <Route path="/editar/:id" element={<EditarTarea />} />
      </Routes>
    </Layout>
  )
}

export default App
