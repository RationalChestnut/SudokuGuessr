import React, {useState} from 'react';
import axios from "axios";

import styles from './Home.module.css';
import MainButton from "../../components/MainButton/MainButton.jsx";

const Home = () => {  
  return (
    <div className={styles.container}>  
      <div className={styles.content}>
        <h1 className={styles.title}>Sudoku Guessr</h1>
        <p className = {styles.description}>Fill out the sudoku to reveal part of the image. Guess as many images as possible. The users with the highest number of images guessed gets a spot in the Hall of Fame!</p>
        <MainButton to={"/start"} text="Play"/>
      </div>
    </div>
  );
}

export default Home;