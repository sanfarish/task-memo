import { useEffect } from "react"
import useTask from "../hooks/useTask"
import taskAPI from "../apis/taskAPI"

export default function List() {
    const [tasks, dispatch] = useTask()
    const { data } = tasks
    
    useEffect(() => {
        taskAPI({method: "get", url: "/tasks"}, dispatch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleDate(value) {
        const base = new Date(value)
        const turn = (data) => data.toString().length > 1 ? data : `0${data}`
        const time = turn(base.getHours()) + ":" + turn(base.getMinutes())
        const date = turn(base.getDate()) + "/" + turn(base.getMonth() + 1) + "/" + turn(base.getFullYear())
        return `${time} | ${date}`
    }
    
    function handleDone(done) {
        return {
            color: done ? "#888" : "#000",
            textDecoration: done ? "line-through" : "none"
        }
    }

    function handleToggle(id, done) {
        taskAPI({ method: "patch", url: `/tasks/${id}`, body: { done: !done } }, dispatch)
    }

    function handleDelete(id) {
        taskAPI({ method: "delete", url: `/tasks/${id}` }, dispatch)
    }

    return (
        <div className="d-flex flex-column flex-grow-1 gap-2 mb-4 me-0 me-md-4 ps-1 ps-md-5 pe-0 pe-md-3 overflow-y-scroll">
            {data.length >= 1 ? data.map(item => {
                return (
                    <div className="d-flex flex-column flex-md-row" key={item.id}>
                        <div className="overflow-x-hidden">
                            <h3 style={handleDone(item.done)}>{item.task}</h3>
                            <h6 style={handleDone(item.done)}>Created at: {handleDate(item.createdAt)}</h6>
                            <h6 style={handleDone(item.done)}>Updated at: {handleDate(item.updatedAt)}</h6>
                        </div>
                        <div className="vr d-none d-md-inline m-3 ms-auto" />
                        <hr className="d-inline d-md-none m-3" />
                        <div className="d-flex align-items-center justify-content-center gap-4 px-1">
                            <button type="button"
                                className={`btn ${item.done ? "btn-secondary" : "btn-success"}`}
                                onClick={() => handleToggle(item.id, item.done)}
                            >Done</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                    </div>
                )
            }) : <div className="alert alert-info" role="alert">
                No Tasks Available
            </div>}
        </div>
    )
}
