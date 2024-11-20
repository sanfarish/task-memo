import { createContext, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'

const TodoContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useTodo() {
    const { todos, dispatch } = useContext(TodoContext)
    return [ todos, dispatch ]
}

function reducer(state, action) {
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

export default function TodoProvider({ children }) {
    TodoProvider.propTypes = { children: PropTypes.any }

    const initialState = {
        todo: [],
    }

    const [todos, dispatch] = useReducer(reducer, initialState)

    return (
        <TodoContext.Provider
            value={{
                todos,
                dispatch
            }}
        >
            {children}
        </TodoContext.Provider>
    )
}
