import axios from "axios"
import authService from "./authService"

const BASE_URL = import.meta.env.VITE_BASE_URL


class ApiRequest {
    async get(endpoint) {
        try {
            const res = await axios.get(`${BASE_URL}${endpoint}`, authService.attachTokenToRequest())
            return { status: true, data: res.data }
        } catch (error) {
            console.error(error)
            return { status: false, error }
        }
    }
    async post(endpoint, body) {
        try {
            const res = await axios.post(`${BASE_URL}${endpoint}`, body, authService.attachTokenToRequest())
            return { status: true, data: res.data }
        } catch (error) {
            console.error(error)
            return { status: false, error }
        }
    }
    async put(endpoint, body) {
        try {
            const res = await axios.post(`${BASE_URL}${endpoint}`, body, authService.attachTokenToRequest())
            return { status: true, data: res.data }
        } catch (error) {
            console.error(error)
            return { status: false, error }
        }
    }
    async delete(endpoint) {
        try {
            const res = await axios.delete(`${BASE_URL}${endpoint}`, authService.attachTokenToRequest())
            return { status: true, data: res.data }
        } catch (error) {
            console.error(error)
            return { status: false, error }
        }
    }
}

const apiRequest = new ApiRequest()
export default apiRequest