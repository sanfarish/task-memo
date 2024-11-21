import { useEffect } from "react"
import { useTodo } from "../hooks/useTodo"
import { todoAPI } from "../apis/todoAPI"

export default function List() {
    const [todos, dispatch] = useTodo()
    const { todo } = todos
    
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

    return (
        <ul>
            {todo != [] ? todo.map(item => {
                return (
                    <li className='list-item' key={item.id}>
                        <div>
                            <h2 style={{ color: item.finished ? "#888" : "#000" }}>{item.todo}</h2>
                            <h4 style={{ color: item.finished ? "#888" : "#000" }}>{item.createdAt}</h4>
                            <h4 style={{ color: item.finished ? "#888" : "#000" }}>{item.updatedAt}</h4>
                        </div>
                        <div>
                            <button onClick={() => handleToggle(item.id, !item.finished)}>Toggle</button>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                    </li>
                )
            }) : <li>No data</li>}
        </ul>
    )
}
