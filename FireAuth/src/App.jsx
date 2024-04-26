import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./auth/context/context"
import { BookedClassesProvider } from "./utilsContext/bookedClassesContext"
import Home from "./pages/home"
import PrivatePage from "./pages/privatePage"
import ProtectedRoute from "./auth/protectedRoute"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index="/" element={<Home />} />
          <Route
            path="/private"
            element={
              <ProtectedRoute>
                <BookedClassesProvider>
                  <PrivatePage />
                </BookedClassesProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
