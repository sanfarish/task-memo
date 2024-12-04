import Tasks from "./components/Tasks"
import TaskProvider from "./contexts/TaskProvider"

function App() {

  return (
    <div className='bg-primary'>
      <div className='container bg-primary-subtle text-primary-emphasis vh-100 d-flex flex-column'>
        <TaskProvider>
          <Tasks />
        </TaskProvider>
      </div>
    </div>
  )
}

export default App
