import axios from "axios";
import { useData } from "../contexts/DataContext";
// import { Navigate } from "react-router-dom"


const BASE_URL = import.meta.env.VITE_BASE_URL

class AuthService {
    constructor() {
        this.user = null
        // this loggedin status should be removed later
        this.isLoggedIn = localStorage.getItem('jwtAccessToken') !== null
    }

    async signup(newUser) {
        try {
            const res = await axios.post(`${BASE_URL}/auth/signup`, newUser)
            return { status: true }
        } catch (error) {
            console.error(error);
            return { status: false, error }
        }
    }

    async login(id, password) {
        const credentials = { id, password };

        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, credentials);
            // console.log(res);
            const { message, accessToken, user } = res.data
            localStorage.setItem("jwtAccessToken", accessToken)

            // const { setUser } = useData()
            // setUser(user)

            // this.user = user
            this.isLoggedIn = true

            return { status: true, user, message }
        } catch (error) {
            console.error(error);
            return { status: false, error }
        }
    }

    logout() {
        localStorage.removeItem("jwtAccessToken")
        // const { setUser } = useData()
        // setUser(null)
        this.user = null
        this.isLoggedIn = false
    }

    getToken() {
        return localStorage.getItem("jwtAccessToken");
    }

    attachTokenToRequest() {
        const accessToken = this.getToken();
        if (!accessToken) {
            // return <Navigate to="/login" replace />
        }
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
        return config;
    }
}

const authService = new AuthService()
export default authService
