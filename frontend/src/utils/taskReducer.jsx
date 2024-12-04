export const initialState = {
    loading: false,
    data: [],
    error: false,
    message: ""
}

export function reducer(state, action) {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload
            }
        case "SET_TODO":
            return {
                ...state,
                data: action.payload
            }
        case "POST_TODO":
            return {
                ...state,
                data: [action.payload, ...state.data]
            }
        case "DEL_TODO":
            return {
                ...state,
                data: state.data.filter(item => item.id !== action.payload.id)
            }
        case "PATCH_TODO":
            return {
                ...state,
                data: state.data.map(item => item.id === action.payload.id ? action.payload.data : item)
            }
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload.error,
                message: action.payload.message
            }
        case "CLEAR_ERROR":
            return {
                ...state,
                error: false,
                message: ""
            }
        default:
            break;
    }
}
