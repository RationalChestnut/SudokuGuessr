import React, {useState} from 'react';
import FormSubmitButton from "../../components/FormSubmitButton/FormSubmitButton";
import BackArrow from "../../components/BackArrow/BackArrow.jsx"
import styles from "./JoinRoom.module.css"

const JoinRoom = () => {
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  
  const handleSubmit = () => {
    console.log("hello");
  }
  
  return (
    <div className = {styles.container}>
      <BackArrow/>
      <div className = {styles.content}>
        <h1 className={styles.heading}>Join a Room</h1>
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