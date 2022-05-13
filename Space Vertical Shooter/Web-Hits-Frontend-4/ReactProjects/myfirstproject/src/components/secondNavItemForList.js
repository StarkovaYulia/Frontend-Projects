import React from "react";
import { Card, Button } from "react-bootstrap";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SecondNavElement from "./secondNavElement";
class TopListForNavSecond extends React.Component{
    render(){
        return(
            <div>
                <div className="cssForToplistForNav mb-3">
                    <Card.Title className="boldString">Список дел №2 - Рабочие</Card.Title>
                    <Button variant="danger"><FontAwesomeIcon icon={faTrashAlt} />  Удалить список </Button>
                </div> 
                <SecondNavElement/> 
            </div>
            
        );
    }
}

export default TopListForNavSecond;