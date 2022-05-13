import React from "react";
import StartPageNav from "./startPageNav";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class StartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { myHP: 0, scores: 0 };
    }
    render() {
        return (
            <div className="StartPage">
                <StartPageNav hp={this.state.myHP} scores={this.state.scores} />

                <div className="startButton">
                    <Link to="/game">
                        <Button className="StartLink">
                            <p className="Start">Start!</p>
                        </Button>
                    </Link>
                </div>

            </div>
        );
    }
}

export default StartPage;






