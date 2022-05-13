import React from "react";
import gameLogic from '../gamePage';
import gameStyle from '../game.css';

class GamePage2 extends React.Component{
    render(){
        return(
            <div>
                <div>Hello</div>


                <div class = "wrapper">
                    <aside class = "navigation_field">   
                        <div class = 'buttons'>
                            <button class = "button">Up</button>
                            <button class = "button">Down</button>
                            <button class = "button">Right</button>
                            <button class = "button">Left</button>
                        </div>
                        

                    </aside>   
                    <div class = "game_field">
                    </div>       
                </div>

            </div>
            
        );
    }
}

export default GamePage2;