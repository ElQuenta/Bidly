import { Suspense } from 'react'

import { AuthProvider } from "./context/UserContext"
import { AppRoutes } from "./routes/routes"

function App() {

  return (
    <AuthProvider>
      <Suspense fallback={<div>Cargando...</div>}>
        <AppRoutes />
      </Suspense>
    </AuthProvider>
  )
}

export default App
