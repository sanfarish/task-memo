import { useState } from "react"
import useTask from "../hooks/useTask"
import taskAPI from "../apis/taskAPI"
import List from "./List"

export default function Tasks() {
    const [tasks, dispatch] = useTask()
    const { loading, error, message } = tasks
    const [newTask, setNewTask] = useState("")
    
    function handleSubmit(e) {
        e.preventDefault()
        taskAPI({ method: "post", url: "/tasks", body: { task: newTask } }, dispatch)
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
            <div className="px-0 px-md-5 mb-1">
                <form onSubmit={handleSubmit} className="d-flex flex-column flex-md-row mb-3 gap-2 gap-md-4">
                    <label className="visually-hidden" htmlFor="newTaskInput">New task</label>
                    <input type="text" placeholder="Enter new task" id="newTaskInput" maxLength={128}
                        className="form-control form-control-lg"
                        value={newTask}
                        onChange={e => setNewTask(e.target.value)}
                    />
                    <div className="d-grid col-md-2">
                        <button className="btn btn-primary btn-lg" type="submit">Add</button>
                    </div>
                </form>
            </div>
            {!error ? <List /> : <div className="alert alert-danger alert-dismissible fade show mx-0 mx-md-5 mt-1" role="alert">
                Error: {message}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"
                    onClick={() => dispatch({ type: "CLEAR_ERROR" })}
                ></button>
            </div>}
        </>
    )
}
