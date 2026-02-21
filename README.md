# Gestor de Tareas (CRUD React)

Aplicación CRUD completa con **React**, **Vite**, **React Router DOM** y **Tailwind CSS**. Persistencia con **localStorage**.

## Stack

- React 18 (hooks: `useState`, `useEffect`, manejo asincrónico)
- Vite
- React Router DOM
- Tailwind CSS
- Persistencia: **localStorage**

## Funcionalidades

- **Listado** de tareas (Read)
- **Crear** tarea desde formulario (Create)
- **Editar** tarea existente (Update)
- **Eliminar** tarea con confirmación (Delete)
- Persistencia en **localStorage**
- Marcar tarea como completada / pendiente
- Estados de **carga** y **error**
- **Confirmación** antes de eliminar

## Cómo ejecutar

```bash
npm install
npm run dev
```

Abre en el navegador la URL que indique Vite (por defecto `http://localhost:5173`).

## Scripts

- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción
- `npm run preview` — vista previa del build

## Estructura

- `src/context/TareasContext.jsx` — estado global de tareas
- `src/hooks/useTareas.js` — lógica CRUD y asincronía
- `src/services/tareasStorage.js` — lectura/escritura en localStorage
- `src/pages/` — ListadoTareas, NuevaTarea, EditarTarea
- `src/components/` — Layout, FormularioTarea, ModalConfirmar
