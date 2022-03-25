import React, {useState} from 'react';

import styles from "./CreateRoom.module.css";
import BackArrow from "../../components/BackArrow/BackArrow.jsx";
import FormSubmitButton from "../../components/FormSubmitButton/FormSubmitButton.jsx"

const CreateRoom = ({text, to}) => {
  const [state, setState] = useState({
    name: "",
    numRounds: "5",
    roundTimeLimit: "5",
    difficulty: "easy",
  })
  
  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = e => {
    console.log("created");
  }
  
  return (
    <div className={styles.container}>
      <BackArrow />
      <div className={styles.content}>
          <h1 className={styles.heading}>Create a Room</h1>
        <form className = {styles.form}>
          <div className = {styles.formInput}>
            <label htmlFor="name" className={styles.label}>Name: </label>
            <input type="text" placeholder="Name: " name="name" id="name" value={state.name} onChange={handleChange} required className = {`${styles.formGeneric} ${styles.textInput}`} /> 
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
          
          <FormSubmitButton text="Create" onSubmit={handleSubmit} />
        </form>
      </div>
    </div>
  );
}

export default CreateRoom;