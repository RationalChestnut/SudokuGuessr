import React, {useState, useContext} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import styles from "./CreateRoom.module.css";
import BackArrow from "../../components/BackArrow/BackArrow.jsx";
import FormSubmitButton from "../../components/FormSubmitButton/FormSubmitButton.jsx";

import SocketContext from "../../context/SocketContext.jsx";

const CreateRoom = ({text, to}) => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  
  const [state, setState] = useState({
    name: "",
    numRounds: "5",
    roundTimeLimit: "5",
    difficulty: "easy",
    theme: "Celebrities"
  })
  
  const generateUniqueId = async () => {
    // Come up with a random six digit number
    let number = Math.floor(100000 + Math.random() * 900000);

    try {
      // Check with db if it exists
      const res = 
        await axios.post("https://sudokuguessrbackend.yxli666.repl.co/checkroom", {
            body: JSON.stringify({id: number}),
            headers: {
              "Content-Type": "application/json",
            }
          })             
      
      if (res.data.isAvailable){
        console.log("available");
        return number;
      }
      return 0;
    } catch (error) {
      console.log("Error has occured", e);
    }
  }
  
  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {    
    e.preventDefault();

    const id = await generateUniqueId();
    
    socket.emit("createRoom", {
      id,
      ...state,
    });
  }
  
  return (
    <div className={styles.container}>
      <BackArrow />
      <div className={styles.content}>
          <h1 className={styles.heading}>Create a Room</h1>
        <form className = {styles.form}>
          <div className = {styles.formInput}>
            <label htmlFor="name" className={styles.label}>Name: </label>
            <input type="text" placeholder="Your username" name="name" id="name" value={state.name} onChange={handleChange} required className = {`${styles.formGeneric} ${styles.textInput}`} /> 
          </div>
          <div className = {styles.formInput}>
            <label htmlFor="numRounds" className={styles.label}># of Rounds: </label>
            <select name="numRounds" id="numRounds" value={state.numRounds} onChange={handleChange} required className = {styles.formGeneric}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
            </select>
          </div>
          <div className = {styles.formInput}>
            <label htmlFor="roundTimeLimit" className={styles.label}>Round Time Limit: </label>
            <select name="roundTimeLimit" id="roundTimeLimit" value={state.roundTimeLimit} onChange={handleChange} required className = {styles.formGeneric}>
              <option value="3">3 Minutes</option>
              <option value="5">5 Minutes</option>
              <option value="7">7 Minutes</option>
              <option value="9">9 Minutes</option>
            </select>
          </div>
          <div className = {styles.formInput}>
            <label htmlFor="difficulty" className={styles.label}>Difficulty</label>
            <select name="difficulty" id="difficulty" value={state.difficulty} onChange={handleChange} required className = {styles.formGeneric}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <label htmlFor = "theme" className = {styles.label}>Theme</label>
          <select name="theme" id="theme" value={state.theme} onChange={handleChange} required className = {styles.formGeneric}>
              <option value="celebrities">Celebrities</option>
              <option value="animals">Animals</option>
              <option value="countries">Countries</option>
              <option value="states">States</option>
            </select>
          <FormSubmitButton text="Create" onClick={handleSubmit} />
        </form>
      </div>
    </div>
  );
}

export default CreateRoom;