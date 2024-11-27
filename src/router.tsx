import { createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import InputOTPForm from "./Pages/InputOTPForm";
import ProfilePage from "./Pages/ProfilePage";
import Dhashboard from "./Layouts/Dhashboard";
import NonAuth from "./Layouts/NonAuth";
import Root from "./Layouts/Root";
import Room from "./Pages/Room";




export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
    {
        path: "",
        element: <Dhashboard />,
        children: [
        {
            path: "", 
            element: <HomePage/>,
        },
        {
            path: "/profile", 
            element: <ProfilePage/>,
        },
        {
            path: "/room/:id",
            element: <Room/>
        }
        ]
    },
    {
        path: "/auth",
        element: <NonAuth />,
        children: [
        {
        path: "login",
        element: <LoginPage/>
        },
        {
        path: "register",
        element: <RegisterPage/>
        },
        {
        path: "verify-otp/:id", 
        element: <InputOTPForm />,
        },
    ]
    },
    ]
    },




])