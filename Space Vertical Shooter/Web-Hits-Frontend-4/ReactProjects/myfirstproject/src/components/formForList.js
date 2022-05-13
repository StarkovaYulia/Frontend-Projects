import { Card, Form, Button } from 'react-bootstrap';
import React from 'react';

class FormforList extends React.Component{
    render(){
        return(
            <Card className="mb-3 moveToLeftSide">
                <Card.Header className="card-headerSecond">СОЗДАТЬ СПИСОК TODO</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Название</Form.Label>
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

export default FormforList;