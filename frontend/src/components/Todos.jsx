import { useState } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useTodo } from "../hooks/useTodo"
import { todoAPI } from "../apis/todoAPI"
import List from "./List"

export default function Todos() {
    const [todos, dispatch] = useTodo()
    const { error, message } = todos
    const [newTodo, setNewTodo] = useState("")
    
    function handleSubmit(e) {
        e.preventDefault()
        todoAPI({ method: "post", url: "/todos", body: { todo: newTodo } }, dispatch)
        setNewTodo("")
    }
    
    return (
        <>
            <Row  className="pt-2"><h1 className="col text-center">Todo Memo</h1></Row>
            <Row>
                <Form onSubmit={handleSubmit} className="mb-3">
                    <Row>
                        <Col>
                            <Form.Group controlId="formNewActivity">
                                <Form.Label visuallyHidden>New activity</Form.Label>
                                <Form.Control type="text" placeholder="Enter new activity"
                                    value={newTodo}
                                    onChange={e => setNewTodo(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
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
