import React from "react";
import { Card, Button } from "react-bootstrap";
import NavElement from "./navElement";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TopListForNav extends React.Component{
    render(){
        return(
            <div className="makeInterval">
                <div className="cssForToplistForNav mb-3">
                    <Card.Title className="boldString">Список дел №1 - Бытовые / учебные</Card.Title>
                    <Button variant="danger"><FontAwesomeIcon icon={faTrashAlt} />   Удалить список </Button>
                </div>  
                <NavElement/>
            </div>  
        );
    }
}

export default TopListForNav;
