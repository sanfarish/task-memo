import Todos from "./components/Todos"
import TodoProvider from "./contexts/TodoProvider"

function App() {

  return (
    <div className='bg-primary'>
      <div className='container bg-primary-subtle text-primary-emphasis vh-100 d-flex flex-column'>
        <TodoProvider>
          <Todos />
        </TodoProvider>
      </div>
    </div>
  )
}

export default App
