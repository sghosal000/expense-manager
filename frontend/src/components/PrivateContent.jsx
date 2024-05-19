import React from "react"
import { Navigate } from "react-router-dom"
import { useData } from "../contexts/DataContext"


export default function PrivateRoute({ children }) {
    const { loggedin } = useData()
    if(!loggedin){
        return <Navigate to="/login" replace />
    }
    return children
}