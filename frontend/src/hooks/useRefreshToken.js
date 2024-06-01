import axios from "../apiservice/axios"
import useAuth from "./useAuth"


const useRefreshToken = () => {
    const { setAccessToken, setUser } = useAuth()

    const refresh = async() => {
        try {
            const response = await axios.get(`/auth/refreshToken`, {
                withCredentials: true,
            })
    
            setAccessToken(response.data.newAccessToken)
            setUser(response.data.user)
            console.log('token refreshed');
            return response.data.newAccessToken
        } catch (error) {
            setUser('')
            setAccessToken('')
        }
    }
    return refresh
}

export default useRefreshToken