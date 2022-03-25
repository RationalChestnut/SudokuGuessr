import React from 'react';
import MainButton from "../../components/MainButton/MainButton";

import styles from "./Home.module.css"

const Home = () => {
  const handleSubmit = (e) => {
    console.log("Hi");
  }
  
  return (
    <div className={styles.container}>
      <div className = {styles.main}>
      <h1 className={styles.headingMain}>Sudoku Guesser</h1>
      <div className={styles.buttons}>
        <MainButton text="Join Room" onClick={ handleSubmit } to="/join"/>
        <MainButton text="Create Room" to="/create"/>
      </div>
      </div>
    </div>
  );
}

export default Home;