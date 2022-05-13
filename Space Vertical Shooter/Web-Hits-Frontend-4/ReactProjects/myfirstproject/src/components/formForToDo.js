import Prioritets from "./prioritets";
import FormforList from "./formForList";
import FormforElement from "./formforElement";
import { ControlledTabs } from "./navtabs";
import React from "react";

class FormForToDo extends React.Component{
    render(){
        return (
            <div>
                <Prioritets/>
                <FormforList/>
                <FormforElement/>
                <ControlledTabs/>
            </div>
        );
    }
}

export default FormForToDo;