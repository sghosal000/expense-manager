import useAxiosPrivate from "../hooks/useAxiosPrivate"


const useApiRequest = () => {
    const axiosPrivate = useAxiosPrivate()
    const get = async (endpoint) => {
        try {
            const res = await axiosPrivate.get(`${endpoint}`)
            return { status: true, data: res.data }
        } catch (error) {
            console.error(error)
            return { status: false, error }
        }
    }
    const post = async (endpoint, body) => {
        try {
            const res = await axiosPrivate.post(`${endpoint}`, body)
            return { status: true, data: res.data }
        } catch (error) {
            console.error(error)
            return { status: false, error }
        }
    }
    const put = async (endpoint, body) => {
        try {
            const res = await axiosPrivate.post(`${endpoint}`, body)
            return { status: true, data: res.data }
        } catch (error) {
            console.error(error)
            return { status: false, error }
        }
    }
    const deleteReq = async (endpoint) => {
        try {
            const res = await axiosPrivate.delete(`${endpoint}`)
            return { status: true, data: res.data }
        } catch (error) {
            console.error(error)
            return { status: false, error }
        }
    }

    const apiRequest = {
        get,
        post,
        put,
        delete: deleteReq
    }
    return apiRequest
}

export default useApiRequest
