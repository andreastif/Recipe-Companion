import './App.css'
import {AuthProvider} from "./contexts/AuthContext.tsx";
import {Route, Routes} from "react-router-dom";
import ErrorPage from "./components/error/ErrorPage.tsx";
import Register from "./components/register/Register.tsx";
import Dashboard from "./components/dashboard/Dashboard.tsx";
import ProtectedRoute from "./contexts/ProtectedRoute.tsx";
import LandingPage from "./components/landingpage/LandingPage.tsx";

function App() {

  return (
    <div className="page-container">
        <div className="content-wrap">
          <AuthProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<Register/>} />
              <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
              />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </AuthProvider>
        </div>
    </div>
  )
}

export default App
