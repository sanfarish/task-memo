import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export async function todoAPI({ method, url }, dispatch) {
    const res = await axios[method](url)
    dispatch({  type: "SET_TODO", payload: res.data })
}
