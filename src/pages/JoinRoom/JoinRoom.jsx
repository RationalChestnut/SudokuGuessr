import React, {useState, useContext} from 'react';
import FormSubmitButton from "../../components/FormSubmitButton/FormSubmitButton";
import BackArrow from "../../components/BackArrow/BackArrow.jsx"
import styles from "./JoinRoom.module.css"
import SocketContext from "../../context/SocketContext";

const JoinRoom = () => {
  const socket = useContext(SocketContext);
  
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [didFail, setDidFail] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("joinRoom", roomCode, {
      id: socket.id,
      name: username,
      status: false,
      points: 0,
    })
  }    
  
  socket.on("failToJoin", () => {
    setDidFail(true);
    console.log("Failed to join");
  })
  
  return (
    <div className = {styles.container}>
      <BackArrow/>
      <div className = {styles.content}>
        <h1 className={styles.heading}>Join a Room</h1>
        {didFail ? <div className = {styles.banner}></div> : <div></div>}
        <form className = {styles.joinRoomForm}>
          <input type = "text" placeholder = "Username"  value = {username} name = "username" className = {styles.formInput} id = "username" required onChange = {(e) => setUsername(e.target.value)}/>
          <input type = "text" placeholder = "Room Code" value = {roomCode} className = {styles.formInput} id = "username" name = "roomcode" required onChange = {(e) => setRoomCode(e.target.value)}/>
          <FormSubmitButton text = "Join" onClick={ handleSubmit }/>
        </form>
      </div>
    </div>
  )
}

export default JoinRoom;