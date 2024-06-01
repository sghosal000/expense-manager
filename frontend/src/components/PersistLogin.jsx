import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import useRefreshToken from "../hooks/useRefreshToken"
import useAuth from "../hooks/useAuth"

const PersistLogin = () => {
    const [loading, setLoading] = useState(true)
    const refresh = useRefreshToken()
    const { accessToken } = useAuth()

    useEffect(() => {
        const verifuRefreshToken = async () => {
            try {
                await refresh()
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        }

        !accessToken? verifuRefreshToken() : setLoading(false)
    }, [])

    useEffect(() => {
      console.log(`Loading: ${loading}`)
      console.log(`access token: ${accessToken?accessToken: 'null'}`)
    }, [loading])

    return (
        <>
            {
                loading?
                    <p>Loading</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin