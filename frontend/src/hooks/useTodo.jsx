import { useContext } from "react"
import { TodoContext } from "../contexts/TodoContext"

export function useTodo() {
    const { todos, dispatch } = useContext(TodoContext)
    return [ todos, dispatch ]
}
