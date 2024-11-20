import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export async function todoAPI({ method, url }) {
    const res = await axios[method](url)
    return res.data
}
