import React from 'react'
import { Card, Badge } from 'react-bootstrap';
import '../prioritets.css';

class Prioritets extends React.Component{
    render(){
        return(
            <Card className="mb-3 mt-3 moveToLeftSide">
                <Card.Body className="prioritetsFont">
                    Приоритеты элементов ToDo:
                    <div>
                        <Badge bg="light badge" text="dark">Обычный</Badge>{' '}
                        <Badge bg="warning badge" text="dark">Важный</Badge>{' '}
                        <Badge bg="danger badge">Критичный</Badge>{' '}
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default Prioritets;