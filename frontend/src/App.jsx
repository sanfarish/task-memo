import Todos from "./components/Todos"
import TodoProvider from "./contexts/TodoProvider"

function App() {

  return (
    <TodoProvider>
      <Todos />
    </TodoProvider>
  )
}

export default App
