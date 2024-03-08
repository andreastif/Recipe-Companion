import "./App.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./components/error/ErrorPage.tsx";
import Dashboard from "./components/dashboard/Dashboard.tsx";
import ProtectedRoute from "./contexts/ProtectedRoute.tsx";
import LandingPage from "./components/landingpage/LandingPage.tsx";
import Login from "./components/login/Login.tsx";
import Profile from "./components/profile/Profile.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ForgotPassword from "./components/forgotPassword/ForgotPassword.tsx";
import RecipeGenerator from "./components/recipecreation/RecipeGenerator.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/lostpw" element={<ForgotPassword />} />
            {/* <Route path="/register" element={<Register/>}/> */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create" element={<RecipeGenerator/>} />
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

export default App;
