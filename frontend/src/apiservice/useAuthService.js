import axios from "./axios"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import useAuth from "../hooks/useAuth"


const useAuthService = () => {
    const axiosPrivate = useAxiosPrivate()
    const { setUser, setAccessToken } = useAuth()

    const signup = async (newUser) => {
        try {
            const res = await axios.post(`/auth/signup`, newUser)
            return { status: true }
        } catch (error) {
            throw error
        }
    }

    const login = async (id, password) => {
        const credentials = { id, password };

        try {
            const res = await axios.post(`/auth/login`, credentials, { withCredentials: true });
            const { message, accessToken, user } = res.data

            setUser(user)
            setAccessToken(accessToken)

            return { status: true }
        } catch (error) {
            throw error
        }
    }

    const logout = async () => {
        try {
            const res = await axios.get(`/auth/logout`, { withCredentials: true })
            setUser('')
            setAccessToken('')
        } catch (error) {
            console.error(error);
        }
    }

    const getDetails = async () => {
        try {
            const res = await axiosPrivate.get(`/auth/details`)
            return { status: true, data: res.data }
        } catch (error) {
            console.error(error);
            return { status: false, error }
        }
    }

    return {
        signup,
        login,
        logout,
        getDetails
    }
}

export default useAuthService
