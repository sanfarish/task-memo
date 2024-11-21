import { useContext } from "react"
import { TodoContext } from "../contexts/TodoContext"

function useTodo() {
    const { todos, dispatch } = useContext(TodoContext)
    return [ todos, dispatch ]
}

export default useTodo
