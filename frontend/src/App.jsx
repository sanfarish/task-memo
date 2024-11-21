import Container from 'react-bootstrap/Container'
import Todos from "./components/Todos"
import TodoProvider from "./contexts/TodoProvider"

function App() {

  return (
    <div className='bg-primary'>
      <Container className='bg-primary-subtle text-primary-emphasis vh-100'>
        <TodoProvider>
          <Todos />
        </TodoProvider>
      </Container>
    </div>
  )
}

export default App
