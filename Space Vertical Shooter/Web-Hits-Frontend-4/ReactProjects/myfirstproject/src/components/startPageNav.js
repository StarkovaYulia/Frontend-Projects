import React from "react";
import { Container, Navbar, Nav} from "react-bootstrap";
import '../App.css';
import '../components/gamePage';

class StartPageNav extends React.Component {
  constructor(props) { 
    super(props);
    this.state = {}
   }
    render() {
      return (
        <Navbar bg="dark" variant="dark" className="Navbar">
          <Container>
            <Navbar.Brand className="Navbar_brand"><img className="logo" src = "../Content/HITS_Logo.png" alt="logo" /></Navbar.Brand>
            <Nav style={{color: "white"}}>
                <p className="hp">HP: {this.props.hp} / 70</p>
                <p className="scores">Score: {this.props.scores}</p>
            </Nav>
          </Container>
        </Navbar>
      );
    }
}


export default StartPageNav;
