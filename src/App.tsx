import "./App.css";
import {AuthProvider} from "./contexts/AuthContext.tsx";
import {Route, Routes} from "react-router-dom";
import ErrorPage from "./components/error/ErrorPage.tsx";
import Dashboard from "./components/dashboard/Dashboard.tsx";
import LoggedInRoute from "./contexts/LoggedInRoute.tsx";
import LandingPage from "./components/landingpage/LandingPage.tsx";
import Login from "./components/login/Login.tsx";
import Profile from "./components/profile/Profile.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ForgotPassword from "./components/forgotPassword/ForgotPassword.tsx";
import RecipeGenerator from "./components/recipecreation/RecipeGenerator.tsx";
import Register from "./components/register/Register.tsx";
import {ChatGptModel} from "./utils/modelEnum.ts";
import LoggedInPageLayout from "./pages/LoggedInPage.tsx";
import {EmailVerifiedRoute} from "./contexts/EmailVerifiedRoute.tsx";
import EditPhoto from "./components/edit/EditPhoto.tsx";
import EditRecipeTitle from "./components/edit/EditRecipeTitle.tsx";

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <Routes>
                        <Route path="/" element={<LandingPage/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/lostpw" element={<ForgotPassword/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route element={<LoggedInRoute/>}>
                            <Route element={<LoggedInPageLayout/>}>
                                <Route path="/dashboard" element={<Dashboard/>}/>
                                <Route path="/edit/photo/:id" element={<EditPhoto/>}/>
                                <Route path="/edit/title/:id" element={<EditRecipeTitle/>}/>
                                <Route path="/profile" element={<Profile/>}/>
                                <Route element={<EmailVerifiedRoute/>}>
                                    <Route path="/create" element={<RecipeGenerator model={ChatGptModel.GPT4} saveIsDisabled={false}/>}/>
                                </Route>
                            </Route>
                        </Route>

                        <Route path="*" element={<ErrorPage/>}/>
                    </Routes>
                </QueryClientProvider>
            </AuthProvider>
        </>
    );
}

export default App;
