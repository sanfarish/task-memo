import { useReducer } from 'react'
import PropTypes from 'prop-types'
import { initialState, reducer } from '../utils/TodoReducer'
import { TodoContext } from './TodoContext'

export default function TodoProvider({ children }) {
    TodoProvider.propTypes = { children: PropTypes.any }

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
