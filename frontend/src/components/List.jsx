import { useEffect } from "react"
import Stack from "react-bootstrap/Stack"
import Button from "react-bootstrap/Button"
import { useTodo } from "../hooks/useTodo"
import { todoAPI } from "../apis/todoAPI"

export default function List() {
    const [todos, dispatch] = useTodo()
    const { todo } = todos
    function style(finished) {
        return {
            color: finished ? "#888" : "#000",
            textDecoration: finished ? "line-through" : "none"
        }
    }
    
    useEffect(() => {
        todoAPI({method: "get", url: "/todos"}, dispatch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleDelete(id) {
        todoAPI({ method: "delete", url: `/todos/${id}` }, dispatch)
    }

    function handleToggle(id, finished) {
        todoAPI({ method: "put", url: `/todos/${id}`, body: { finished } }, dispatch)
    }

    function handleDate(date) {
        const item = new Date(date)
        const hour = item.getHours() + ":" + item.getMinutes()
        const dating = item.getDate() + "/" + item.getMonth() + "/" + item.getFullYear()
        return hour + " | " + dating
    }

    return (
        <Stack>
            {todo != [] ? todo.map(item => {
                return (
                    <Stack direction="horizontal" key={item.id}>
                        <div>
                            <h3 style={style(item.finished)}>{item.todo}</h3>
                            <h6 style={style(item.finished)}>Created at: {handleDate(item.createdAt)}</h6>
                            <h6 style={style(item.finished)}>Updated at: {handleDate(item.updatedAt)}</h6>
                        </div>
                        <div className="vr m-4 ms-auto" />
                        <Stack direction="horizontal" gap={4}>
                            <Button variant="success" onClick={() => handleToggle(item.id, !item.finished)}>Done</Button>
                            <Button variant="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
                        </Stack>
                    </Stack>
                )
            }) : <div>No data</div>}
        </Stack>
    )
}
