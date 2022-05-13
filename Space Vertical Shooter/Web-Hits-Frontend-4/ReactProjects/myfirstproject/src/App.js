import './App.css';
import React from 'react';
import NewsContainer from './components/newsContainer';
import { Navbar, Nav, Container, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import News from './components/news';
import FormForToDo from './components/formForToDo';
import Footer from './components/footer';

import StartPage from './components/startPage';
import GamePage from './components/gamePage';

function App(props) {
  return (
    <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<StartPage />}></Route>
                <Route path="/game" element={ <GamePage/>}></Route>
            </Routes>
    </BrowserRouter>     
  );
}

export default App;
