import { useState } from "react"
import useTodo from "../hooks/useTodo"
import todoAPI from "../apis/todoAPI"
import List from "./List"

export default function Todos() {
    const [todos, dispatch] = useTodo()
    const { loading, error, message } = todos
    const [newTask, setNewTask] = useState("")
    
    function handleSubmit(e) {
        e.preventDefault()
        todoAPI({ method: "post", url: "/todos", body: { task: newTask } }, dispatch)
        setNewTask("")
    }
    
    return (
        <>
            {loading ? <div className="position-absolute top-50 start-50 translate-middle text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading...</p>
            </div> : null}
            <div className="pt-2"><h1 className="col text-center">Task Memo</h1></div>
            <div className="px-5 mb-1">
                <form onSubmit={handleSubmit} className="d-flex mb-3 gap-4">
                    <label className="visually-hidden" htmlFor="newTaskInput">New task</label>
                    <input type="text" placeholder="Enter new task" id="newTaskInput" maxLength={129}
                        className="form-control form-control-lg"
                        value={newTask}
                        onChange={e => setNewTask(e.target.value)}
                    />
                    <button className="btn btn-primary btn-lg col-2 px-5" type="submit">Add</button>
                </form>
            </div>
            {!error ? <List /> : <div className="alert alert-danger alert-dismissible fade show mx-5 mt-1" role="alert">
                Error: {message}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"
                    onClick={() => dispatch({ type: "CLEAR_ERROR" })}
                ></button>
            </div>}
        </>
    )
}
