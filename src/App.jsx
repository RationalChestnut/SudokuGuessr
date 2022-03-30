import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css';
import Home from "./pages/Home/Home.jsx";
import Sudoku from "./pages/Sudoku/Sudoku.jsx";
import GameOptions from "./pages/GameOptions/GameOptions.jsx";
import Leaderboard from "./pages/Leaderboard/Leaderboard.jsx"
const App = () => {
  return (
    <div className="container">  
      <BrowserRouter>
          <Routes>
            {/*<Route exact path="/" element = {<Leaderboard/>} />*/}
            
            <Route exact path="/" element = {<Home />} />
            <Route exact path = "/start" element = {<GameOptions />} />
            <Route exact path = "/play" element = {<Sudoku/>}/>
            <Route exact path = "/halloffame" element = {<Leaderboard/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;