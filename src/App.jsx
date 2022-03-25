import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import './App.css';
import Home from "./pages/Home/Home.jsx"
import JoinRoom from "./pages/JoinRoom/JoinRoom.jsx"
import CreateRoom from "./pages/CreateRoom/CreateRoom.jsx"

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/create" element = {<CreateRoom/>}/>
          <Route path="/join" element = {<JoinRoom/>}/>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;