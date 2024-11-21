import { useEffect } from "react"
import Stack from "react-bootstrap/Stack"
import Button from "react-bootstrap/Button"
import useTodo from "../hooks/useTodo"
import todoAPI from "../apis/todoAPI"

export default function List() {
    const [todos, dispatch] = useTodo()
    const { data } = todos
    
    useEffect(() => {
        todoAPI({method: "get", url: "/todos"}, dispatch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleDatetime(datetime) {
        const item = new Date(datetime)
        const time = item.getHours() + ":" + item.getMinutes()
        const date = item.getDate() + "/" + item.getMonth() + "/" + item.getFullYear()
        return time + " | " + date
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
        <Stack className="flex-grow-1 mb-2 ps-5 pe-4 overflow-y-scroll">
            {data.length >= 1 ? data.map(item => {
                return (
                    <Stack direction="horizontal" key={item.id}>
                        <div>
                            <h3 style={handleDone(item.done)}>{item.task}</h3>
                            <h6 style={handleDone(item.done)}>Created at: {handleDatetime(item.createdAt)}</h6>
                            <h6 style={handleDone(item.done)}>Updated at: {handleDatetime(item.updatedAt)}</h6>
                        </div>
                        <div className="vr m-4 ms-auto" />
                        <Stack direction="horizontal" gap={4}>
                            <Button
                                variant={item.done ? "secondary" : "success" }
                                onClick={() => handleToggle(item.id, item.done)}
                            >Done</Button>
                            <Button variant="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
                        </Stack>
                    </Stack>
                )
            }) : <p className="text-center">No data</p>}
        </Stack>
    )
}
