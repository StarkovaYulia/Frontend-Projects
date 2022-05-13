import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import React from 'react';

class FormforElement extends React.Component{
    render(){
        return(
            <Card className="mb-3 moveToLeftSide">
                <Card.Header className="card-headerSecond">СОЗДАТЬ ЭЛЕМЕНТ TODO</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Заголовок</Form.Label>
                            <Form.Control type="text" required />
                        </Form.Group>
                        <Row className="mb-3">
                        <Form.Group as = {Col} controlId = "list">
                                <Form.Label>Список</Form.Label>
                                <Form.Select>
                                    <option>Список дел №1 - Бытовые / учебные</option>
                                    <option>Список дел №2 - Рабочие</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as = {Col} controlId = "priority">
                                <Form.Label>Приоритет</Form.Label>
                                <Form.Select>
                                    <option>Обычный</option>
                                    <option>Важный</option>
                                    <option>Критичный</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Form.Group controlId="description">
                            <Form.Label>Описание</Form.Label>
                            <Form.Control type="text" required />
                            <Form.Control.Feedback type="invalid">Please provide a valid description</Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Card.Body>
                <Card.Footer className = "moveToLeftSide">
                    <Button variant="secondary">Очистить</Button>{' '}
                    <Button variant="success">Создать</Button>{' '}
                </Card.Footer>
            </Card>  
        );
    }
}

export default FormforElement;