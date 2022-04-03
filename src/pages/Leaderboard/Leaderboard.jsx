import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom"

import Loading from "../../components/Loading/Loading.jsx";
import styles from './Leaderboard.module.css';
import { AiOutlineReload } from "react-icons/ai";
import { AiTwotoneHome } from "react-icons/ai";

const Leaderboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isTopTen, setIsTopTen] = useState(false);
  const [usersToLoad, setUsersToLoad] = useState([]);
  const [userOfGame, setUserOfGame] = useState(JSON.parse(localStorage.getItem("user")));  
  let rank = 0;
  
  useEffect(() => {
    setLoading(true);
    getLeaderBoard();
  }, [])

  useEffect(() => {
    for(let i = 0; i < usersToLoad.length; i++){
      if(usersToLoad[i].username == userOfGame.username){
        // Same person
        setIsTopTen(true);
      }
    }
  }, [usersToLoad])

  const sendToHome = () => {
    window.localStorage.setItem("user", JSON.stringify({
      username: userOfGame.username,
      difficulty: userOfGame.difficulty,
      theme: userOfGame.theme,
      score: 0,
    }));
    navigate("/");
  }

  const replay = () => {
    window.localStorage.setItem("user", JSON.stringify({
      username: userOfGame.username,
      difficulty: userOfGame.difficulty,
      theme: userOfGame.theme,
      score: 0,
    }));
    
    navigate("/start");
  }
  
  const getLeaderBoard = async () => {
    const response = await axios.get("https://SudokuGuessrBackend.yxli666.repl.co/leaderboard");
    
    setUsersToLoad(response.data.leaderboard);

    setLoading(false);
  }
  
  return (
    <div>
      {loading && <Loading />}
      <div className = {styles.container}>
        <h1 className = {styles.leaderboardHeader}>Hall of Fame</h1>
        <table className = {styles.table}>
          <tr className = {styles.headerRow}>
            <th className = {styles.headerContent}>Rank</th>
            <th className = {styles.headerContent}>Username</th>
            <th className = {styles.headerContent}>Theme</th>
            <th className = {styles.headerContent}>Score</th>
          </tr>
          {/*Template leaderboard*/}
          {usersToLoad.map(user => {
            rank++;
        // Rank is not yet implemented. Will run an error
        // Also want to add smooth scrolling that allows you to see everyone
        // Should also highlight the person's name if they are top ten
            return (
              <tr className = {styles.row}>
                <td style = {{"border" : "none", "backgroundColor" : "white"}}  className = {styles.dataPoint}>{rank}</td>
                <td style = {{"border" : "none", "backgroundColor" : "white"}}  className = {styles.dataPoint}>{user.username}</td>
                <td style = {{"border" : "none", "backgroundColor" : "white"}} className = {styles.dataPoint}>{user.high.theme}</td>
                <td style = {{"border" : "none", "backgroundColor" : "white"}} className = {styles.dataPoint}>{user.high.score}</td>
              </tr>
            );
          })}
          {isTopTen === false ? <tr className = {styles.userRow}>
              <td style = {{"border" : "none", "backgroundColor" : "white"}} className = {styles.dataPoint}>Unranked</td>
              <td style = {{"border" : "none", "backgroundColor" : "white"}} className = {styles.dataPoint}>{userOfGame.username}</td>
              <td style = {{"border" : "none", "backgroundColor" : "white"}}  className = {styles.dataPoint}>{userOfGame.theme}</td>
              <td style = {{"border" : "none", "backgroundColor" : "white"}}  className = {styles.dataPoint}>{userOfGame.score}</td>
            </tr> : <div></div>}
        </table>
        <div className = {styles.icons}>
          <AiOutlineReload className = {styles.icon} onClick = {replay}/>
          <AiTwotoneHome className = {styles.icon} onClick = {sendToHome}/>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard;