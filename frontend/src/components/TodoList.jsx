import { useEffect } from "react"
import { useTodo } from "../hooks/useTodo"
import { todoAPI } from "../apis/todoAPI"

function TodoList() {
    const [todos, dispatch] = useTodo()
    const { todo } = todos
    
    useEffect(() => {
        todoAPI({method: "get", url: "/todos"}, dispatch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <h1>Todo Memo</h1>
            <div>
                <input type='text' />
                <button onClick={() => console.log(todo)}>Add</button>
            </div>
            <ul>
                {todo != [] ? todo.map(item => {
                    return (
                        <li className='list-item' key={item.id}>
                            <div>
                                <h2>{item.todo}</h2>
                                <h4>{item.createdAt}</h4>
                                <h4>{item.updatedAt}</h4>
                            </div>
                            <div>
                                <button>Toggle</button>
                                <button>Delete</button>
                            </div>
                        </li>
                    )
                }) : <li>No data</li>}
            </ul>
        </>
    )
}

export default TodoList
