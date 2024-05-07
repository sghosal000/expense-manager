import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL

class AuthService {
    constructor() {
        this.user = null
        this.isLoggedIn = localStorage.getItem('jwtAccessToken') !== null
    }
    async login(id, password) {
        const credentials = { id, password };

        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, credentials);
            const { accessToken } = res.data
            localStorage.setItem("jwtAccessToken", accessToken)

            this.user = res.data.user
            this.isLoggedIn = true

            return { status: true }
        } catch (error) {
            console.error(error);
            throw new Error("Login failed")
        }
    }

    logout() {
        localStorage.removeItem("jwtAccessToken")
        this.user = null
        this.isLoggedIn = false
    }

    getToken() {
        return localStorage.getItem("jwtAccessToken");
    }

    attachTokenToRequest() {
        const accessToken = this.getToken();
        if (!accessToken) {

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
