import React from "react"
import { Navigate, useOutletContext } from "react-router-dom"
import authService from "../apiservice/AuthService"

export default function PrivateRoute({ children }) {
    const Loggedin = authService.isLoggedIn
    if(!Loggedin){
        return <Navigate to="/login" replace />
    }
    return children

    // const user = useOutletContext

    // return children ? children({ user }) : children
}