import { createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import InputOTPForm from "./Pages/InputOTPForm";
import ProfilePage from "./Pages/ProfilePage";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>
    },
    {
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "/register",
        element: <RegisterPage/>
    },
    {
    path: "/verify-otp/:id", 
    element: <InputOTPForm />,
    },
    {
    path: "/vprofile", 
    element: <ProfilePage/>,
    }

])