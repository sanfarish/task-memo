import { useEffect } from "react"
import useTodo from "../hooks/useTodo"
import todoAPI from "../apis/todoAPI"

export default function List() {
    const [todos, dispatch] = useTodo()
    const { data } = todos
    
    useEffect(() => {
        todoAPI({method: "get", url: "/todos"}, dispatch)
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
        todoAPI({ method: "patch", url: `/todos/${id}`, body: { done: !done } }, dispatch)
    }

    function handleDelete(id) {
        todoAPI({ method: "delete", url: `/todos/${id}` }, dispatch)
    }

    return (
        <div className="d-flex flex-column flex-grow-1 gap-2 mb-4 me-4 ps-5 pe-3 overflow-y-scroll">
            {data.length >= 1 ? data.map(item => {
                return (
                    <div className="d-flex" key={item.id}>
                        <div className="overflow-x-hidden">
                            <h3 style={handleDone(item.done)}>{item.task}</h3>
                            <h6 style={handleDone(item.done)}>Created at: {handleDate(item.createdAt)}</h6>
                            <h6 style={handleDone(item.done)}>Updated at: {handleDate(item.updatedAt)}</h6>
                        </div>
                        <div className="vr m-3 ms-auto" />
                        <div className="d-flex align-items-center gap-4 px-1">
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
