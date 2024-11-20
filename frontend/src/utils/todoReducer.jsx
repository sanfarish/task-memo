export const initialState = {
    todo: [],
}

export function reducer(state, action) {
    switch (action.type) {
        case "SET_TODO":         
            return {
                ...state,
                todo: action.payload
            }
        default:
            break;
    }
}
