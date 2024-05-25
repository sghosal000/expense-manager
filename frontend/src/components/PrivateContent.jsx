import { Navigate, useLocation, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export default function PrivateRoute() {
    const { user } = useAuth()
    const location = useLocation()
    console.log(user);

    return (
        user?.username? <Outlet />
        : <Navigate to={"/login"} state={{from: location}} replace />
    )
}