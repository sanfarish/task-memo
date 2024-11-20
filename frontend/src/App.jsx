import TodoList from "./components/TodoList"
import TodoProvider from "./contexts/TodoContext"

function App() {

  return (
    <div className='main'>
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    </div>
  )
}

export default App
