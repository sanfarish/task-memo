import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export default async function taskAPI({ method, url, body }, dispatch) {
    try {
        dispatch({  type: "SET_LOADING", payload: true })
        const res = await axios[method](url, body)
        switch (method) {
            case "get":
                dispatch({  type: "SET_TODO", payload: res.data })
                break
            case "post":
                dispatch({  type: "POST_TODO", payload: res.data })
                break
            case "delete":
                dispatch({  type: "DEL_TODO", payload: { id: Number(url.split("/").pop()) } })
                break
            case "patch":
                dispatch({  type: "PATCH_TODO", payload: { id: Number(url.split("/").pop()), data: res.data } })
                break
            default:
                break
        }
    } catch (error) {
        if (error.response) {
            dispatch({  type: "SET_ERROR", payload: { error: true, message: error.response.data.error } })
        } else {
            dispatch({  type: "SET_ERROR", payload: { error: true, message: error.message } })
        };
    } finally {
        dispatch({  type: "SET_LOADING", payload: false })
    }
}
