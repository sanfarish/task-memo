import { useReducer } from 'react'
import PropTypes from 'prop-types'
import { initialState, reducer } from '../utils/taskReducer'
import { TaskContext } from './TaskContext'

export default function TaskProvider({ children }) {
    TaskProvider.propTypes = { children: PropTypes.any }

    const [tasks, dispatch] = useReducer(reducer, initialState)

    return (
        <TaskContext.Provider
            value={{
                tasks,
                dispatch
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}
