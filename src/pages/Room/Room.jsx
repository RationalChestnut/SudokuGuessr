import React, {useState, useContext} from 'react';
import styles from "./Room.module.css"
import MainButton from "../../components/MainButton/MainButton.jsx"
import Player from "./Player.jsx"
import SocketContext from "../../context/SocketContext";

const Room = (props) => {
  const socket = useContext(SocketContext);
  
  // List of players state
  const [players, setPlayers] = useState([]);
  
  const data = {
    // Probably want to use state for numPlayers
    numPlayers: 0,
    numRounds: props.numRounds,
    time: props.timePerRound,
    category: props.category
  }
  
  // Every time number of players changes update state
  socket.on("playerChange", (playersList) => {
    setPlayers(playersList);
  })
  
  // State variable of players
  // Dynamically update on emit
  // Map for each player using Player.jsx
  // display on the page
  
  return (
    <div className = {styles.container}>
      <div className = {styles.roomInfoContainer}>
        <h3>Players: {data.numPlayers}</h3>
        <h3>Rounds: {data.numRounds}</h3>
        <h3>Time/Round: {data.time}</h3>
        <h3>Category: {data.category}</h3>
      </div>
      <div className = {styles.players}>
        {players.map((player) => <Player player = {player}/>)}
      </div>
      <MainButton to = {rrr} text = "Ready" className = {styles.readyButton}/>
    </div>
  );
}

export default Room;