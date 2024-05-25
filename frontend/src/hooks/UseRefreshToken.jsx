import axios from "axios"
import useAuth from "./useAuth"

const BASE_URL = import.meta.env.VITE_BASE_URL


const useRefreshToken = () => {
    const { accessToken, setAccessToken } = useAuth()
    
    const refresh = async() => {
        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${accessToken}`,
        //     },
        // }
        console.log('cookies: ', document.cookie);
        const response = await axios.get(`${BASE_URL}/auth/refreshToken`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        })

        setAccessToken(prev => {
            console.log(prev)
            console.log(response.data.newAccessToken)
            return {setAccessToken: response.data.newAccessToken}
        })
        return response.data.newAccessToken
    }
    return refresh
}

export default useRefreshToken