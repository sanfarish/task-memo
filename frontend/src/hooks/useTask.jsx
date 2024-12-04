import { useContext } from "react"
import { TaskContext } from "../contexts/TaskContext"

export default function useTask() {
    const { tasks, dispatch } = useContext(TaskContext)
    return [ tasks, dispatch ]
}
