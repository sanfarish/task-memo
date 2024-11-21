export const initialState = {
    loading: false,
    todo: [],
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
                todo: action.payload
            }
        case "ADD_TODO":
            return {
                ...state,
                todo: [action.payload, ...state.todo]
            }
        case "DEL_TODO":
            return {
                ...state,
                todo: state.todo.filter(item => item.id !== action.payload.id)
            }
        case "PUT_TODO":
            return {
                ...state,
                todo: state.todo.map(item => item.id === action.payload.id ? action.payload.data : item)
            }
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload.error,
                message: action.payload.message
            }
        default:
            break;
    }
}
