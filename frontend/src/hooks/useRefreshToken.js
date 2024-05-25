import axios from "../apiservice/axios"
import useAuth from "./useAuth"


const useRefreshToken = () => {
    const { accessToken, setAccessToken } = useAuth()

    const refresh = async() => {
        const response = await axios.get(`/auth/refreshToken`, {
            withCredentials: true,
        })

        setAccessToken(response.data.newAccessToken)
        return response.data.newAccessToken
    }
    return refresh
}

export default useRefreshToken