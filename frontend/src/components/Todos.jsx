import { useState } from "react"
import { useTodo } from "../hooks/useTodo"
import { todoAPI } from "../apis/todoAPI"
import List from "./List"

export default function Todos() {
    const [todos, dispatch] = useTodo()
    const { error, message } = todos
    const [newTodo, setNewTodo] = useState("")
    
    function handleSubmit(e) {
        e.preventDefault()
        todoAPI({ method: "post", url: "/todos", body: { todo: newTodo } }, dispatch)
        setNewTodo("")
    }
    
    return (
        !error ? <div className="main">
            <h1>Todo Memo</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' id="newTodo" value={newTodo} onChange={e => setNewTodo(e.target.value)} />
                <button type="submit">Add</button>
            </form>
            <List />
        </div> : <p>{message}</p>
    )
}
