import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css';
import Home from "./pages/Home/Home.jsx"
import JoinRoom from "./pages/JoinRoom/JoinRoom.jsx"
import CreateRoom from "./pages/CreateRoom/CreateRoom.jsx"
import SocketContext from "./context/SocketContext.jsx";

import io from "socket.io-client"
const socket = io("https://sudokuguessrbackend.yxli666.repl.co/")

const App = () => {
  return (
    <div className="container">  
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
            <Routes>
              <Route exact path="/create" element={<CreateRoom />} />    
              <Route exact path="/join" element = {<JoinRoom />} />
              <Route exact path="/" element = {<Home/>} />
            </Routes>
        </BrowserRouter>
      </SocketContext.Provider>
    </div>
  );
}

export default App;