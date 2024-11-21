import { useState } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import useTodo from "../hooks/useTodo"
import todoAPI from "../apis/todoAPI"
import List from "./List"

export default function Todos() {
    const [todos, dispatch] = useTodo()
    const { error, message } = todos
    const [newTask, setNewTask] = useState("")
    
    function handleSubmit(e) {
        e.preventDefault()
        todoAPI({ method: "post", url: "/todos", body: { task: newTask } }, dispatch)
        setNewTask("")
    }
    
    return (
        <>
            <Row  className="pt-2"><h1 className="col text-center">Todo Memo</h1></Row>
            <Row className="px-5">
                <Form onSubmit={handleSubmit} className="mb-3">
                    <Row>
                        <Form.Group className="col" controlId="formNewTask">
                            <Form.Label visuallyHidden>New task</Form.Label>
                            <Form.Control type="text" placeholder="Enter new task"
                                value={newTask}
                                onChange={e => setNewTask(e.target.value)}
                            />
                        </Form.Group>
                        <Col xs={2} className="d-grid gap-2">
                            <Button variant="primary" type="submit">Add</Button>
                        </Col>
                    </Row>
                </Form>
            </Row>
            {!error ? <List /> : <p>{message}</p>}
        </>
    )
}
