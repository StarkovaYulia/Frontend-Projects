import React from "react";
import { Card, ButtonGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

class NavElement extends React.Component{
    render(){
        return (
            <div className="makeInterval">
                <Card className="cssForElementForNav makeBorderYellow makePadding"> 
                    <div>
                        <div className="titleOfElements">
                            <Card.Title>Написать доклад</Card.Title>
                            <Card.Text className="boldString changeColor">&nbsp;&nbsp;&nbsp;&nbsp;25.06.2020</Card.Text>
                        </div>
                        <Card.Text className="textLeft">Проработать как минимум 15 страниц</Card.Text>
                    </div>
                    <ButtonGroup aria-label="three_buttons">
                        <Button variant="outline-success"><FontAwesomeIcon icon={ faCheck }/></Button>
                        <Button variant="outline-warning"><FontAwesomeIcon icon={ faPencilAlt }/></Button>
                        <Button variant="outline-danger"><FontAwesomeIcon icon={ faTrashAlt }/></Button>
                    </ButtonGroup>
                </Card>
                <Card className="cssForElementForNav makeBorderRed makePadding"> 
                    <div>
                        <div className="titleOfElements">
                            <Card.Title>Повторить теорию по react</Card.Title>
                            <Card.Text className="boldString changeColor ">&nbsp;&nbsp;&nbsp;&nbsp;07.08.2011</Card.Text>
                        </div>
                        <Card.Text className="textLeft">Проработать как минимум App.js</Card.Text>
                    </div>
                    <ButtonGroup aria-label="three_buttons">
                        <Button variant="outline-success"><FontAwesomeIcon icon={ faCheck }/></Button>
                        <Button variant="outline-warning"><FontAwesomeIcon icon={ faPencilAlt }/></Button>
                        <Button variant="outline-danger"><FontAwesomeIcon icon={ faTrashAlt }/></Button>
                    </ButtonGroup>
                </Card>

                <Card className="cssForElementForNav makeBorderWhite makePadding"> 
                    <div>
                        <div className="titleOfElements">
                            <Card.Title>Хочу спать</Card.Title>
                            <Card.Text className="boldString changeColor">&nbsp;&nbsp;&nbsp;&nbsp;05.04.2021</Card.Text>
                        </div>
                        <Card.Text className="textLeft">Но не сегодня</Card.Text>
                    </div>
                    <ButtonGroup aria-label="three_buttons">
                        <Button variant="outline-success"><FontAwesomeIcon icon={ faCheck }/></Button>
                        <Button variant="outline-warning"><FontAwesomeIcon icon={ faPencilAlt }/></Button>
                        <Button variant="outline-danger"><FontAwesomeIcon icon={ faTrashAlt }/></Button>
                    </ButtonGroup>
                </Card>
            </div>
            
        );
    }
} 

export default NavElement;