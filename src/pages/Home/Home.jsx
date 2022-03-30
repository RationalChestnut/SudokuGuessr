import React, {useState} from 'react';
import axios from "axios";

import styles from './Home.module.css';
import MainButton from "../../components/MainButton/MainButton.jsx";

const Home = () => {  
  return (
    <div className={styles.container}>  
      <div className={styles.content}>
        <h1 className={styles.title}>Sudoku Guessr</h1>
        <p className = {styles.description}>The object of the game is simple: Guess as many images as possible. You can do so by filling out the sudoku to reveal a part of the image. The highest number of images guessed wins and gets a spot on the esteemed hall of fame</p>
        <MainButton to={"/start"} text="Play"/>
      </div>
    </div>
  );
}

export default Home;