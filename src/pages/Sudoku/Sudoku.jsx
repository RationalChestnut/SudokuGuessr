import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import Leaderboard from "../Leaderboard/Leaderboard.jsx"
import Loading from '../../components/Loading/Loading.jsx';
import styles from "./Sudoku.module.css";

// Axios to different APIS depending on the parameters

const Sudoku = () => {
  const navigate = useNavigate();
  let interval;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));  

  useEffect(() => {
    if (user.theme.toLowerCase() == "countries"){
      generateCountryImage();
    } else if(user.theme.toLowerCase() == "pokemon"){
      generatePokemonImage();
    } else{
      generateAnimalImage();
    }
    
    generateSudoku();
    interval = setInterval(intervalCallback, 1000);

    return () => {clearInterval(interval)};
  }, [])

  let timeLimit = 0;
  if (user.difficulty === "easy") {
    timeLimit = 5;
  } else if (user.difficulty === "medium") {
    timeLimit = 7.5;
  } else {
    timeLimit = 10;
  }
  
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(0);
  const [sudoku, setSudoku] = useState([]);
  const [solvedSudoku, setSolvedSudoku] = useState([]);
  const [board, setBoard] = useState([]);
  const [imageLink, setImageLink] = useState("");
  const [keyword, setKeyword] = useState("");
  const [timeLeft, setTimeLeft] = useState(timeLimit * 120);
  const [gameOver, setGameOver] = useState(false);
  const [guess, setGuess] = useState("");
  const [isWrong, setIsWrong] = useState(false);
  const [squaresComplete, setSquaresComplete] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
    six: false,
    seven: false,
    eight: false,
    nine: false,
  });
  

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(interval);
      setGameOver(true);
    }
  }, [timeLeft])

  useEffect(() => {
    if (gameOver) {
      setLoading(true);
      // request
      // /updateUser - post
      // body: {username: "", high: {score, theme, difficulty}
      axios.post("https://SudokuGuessrBackend.yxli666.repl.co/updateUser", {
        username: user.username,
        high: {
          score: user.score,
          theme: user.theme,
          difficulty: user.difficulty,
        },
      }, {
        header: {'Content-Type': "application/json"}
      }).then(() => {
        try{
          window.localStorage.setItem("user", JSON.stringify({
            username: user.username,
            difficulty: user.difficulty,
            theme: user.theme,
            score: user.score,
          }));
          
          navigate("/halloffame");
          setLoading(false);
        } catch(e){
          console.log(e);
        }
      })
    }
  }, [gameOver])
  
  const intervalCallback = () => {
    setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
  }
  
  const generateCountryImage = async () => {
    const res = await axios.get("https://sudokuguessrbackend.yxli666.repl.co/countryflags");
    const image = res.data.image;
    
    
    setImageLink(image.link);
    setKeyword(image.keyword);
    // Get the corresponding image
  }

  const generatePokemonImage = async() => {
    let id = Math.floor(Math.random() * 151);
    const res = await axios.get(`https://sudokuguessrbackend.yxli666.repl.co/pokemon/${id}`);
    const image = res.data.image;
    setImageLink(image.link);
    setKeyword(image.keyword);
  }
  
  const generateAnimalImage = async() => {
    const res = await axios.get(`https://sudokuguessrbackend.yxli666.repl.co/animals`);
    const image = res.data.image;
    setImageLink(image.link);
    setKeyword(image.keyword);
  }

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      checkIsCorrect();
    }
  }
  
  const checkIsCorrect = () => {
    if(guess.toLowerCase() == keyword.toLowerCase()){
      setUser({...user, score: user.score + 1});
      generateNewBoard();
      setGuess("");
    } else{
      setIsWrong(true);
      setGuess("");
    }
  }

  const generateNewBoard = () => {
    setLoading(true);
    setSquaresComplete({
      one: false,
      two: false,
      three: false,
      four: false,
      five: false,
      six: false,
      seven: false,
      eight: false,
      nine: false,
    });
    generateSudoku();
    if(user.theme.toLowerCase() == "countries"){
      generateCountryImage();
    } else if(user.theme.toLowerCase() == "pokemon"){
      generatePokemonImage();
    } else{
      generateAnimalImage();
    }
  }
  
  const generateSudoku = async () => {
    const res = await axios.post("https://sudokuguessrbackend.yxli666.repl.co/getSudoku", {difficulty: user.difficulty}, {
      headers: {"Content-Type": "application/json"},
    });

    setSudoku(res.data.sudoku.puzzle);
    setBoard(res.data.sudoku.puzzle);
    setSolvedSudoku(res.data.sudoku.solution);
    
    setLoading(false);
  }
  
  const handleChange = (e, i, j) => {
    const validStrings = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ""];
    if (validStrings.includes(e.target.value)) {
      setBoard((board) => {
        return board.map((row, rowIdx) => {
          const newRow = row.map((cell, cellIdx) => {
            if (rowIdx === i && cellIdx === j) {
              return e.target.value !== ""? Number.parseInt(e.target.value): 0;
            } else {
              return cell;
            }
          });
  
          return newRow;
        })
      })
    }

  }

  const checkIsSquareComplete = () => {
    // Check if first row is complete
    // top left
    let counter = 0;
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        if(board[i][j] == solvedSudoku[i][j]){
          counter++;
        }
      }
    }
    if(counter == 9){
      setSquaresComplete((prevSquaresComplete) => {
        return {...prevSquaresComplete, one: true};
      });
    }
    counter = 0;

    // top middle
    for(let i = 0; i < 3; i++){
      for(let j = 3; j < 6; j++){
        if(board[i][j] == solvedSudoku[i][j]){
          counter++;
        }
      }
    }
    if(counter == 9){
      setSquaresComplete((prevSquaresComplete) => {
        return {...prevSquaresComplete, two: true};
      });
    }
    counter = 0;

    // top right
    for(let i = 0; i < 3; i++){
      for(let j = 6; j < 9; j++){
        if(board[i][j] == solvedSudoku[i][j]){
          counter++;
        }
      }
    }
    if(counter == 9){
      setSquaresComplete((prevSquaresComplete) => {
        return {...prevSquaresComplete, three: true};
      });
    }
    counter = 0;
    
    // middle left
    for(let i = 3; i < 6; i++){
      for(let j = 0; j < 3; j++){
        if(board[i][j] == solvedSudoku[i][j]){
          counter++;
        }
      }
    }
    if(counter == 9){
      setSquaresComplete((prevSquaresComplete) => {
        return {...prevSquaresComplete, four: true};
      });
    }
    counter = 0;

    // middle middle
    for(let i = 3; i < 6; i++){
      for(let j = 3; j < 6; j++){
        if(board[i][j] == solvedSudoku[i][j]){
          counter++;
        }
      }
    }
    if(counter == 9){
      setSquaresComplete((prevSquaresComplete) => {
        return {...prevSquaresComplete, five: true};
      });
    }
    counter = 0;

    // middle right
    for(let i = 3; i < 6; i++){
      for(let j = 6; j < 9; j++){
        if(board[i][j] == solvedSudoku[i][j]){
          counter++;
        }
      }
    }
    if(counter == 9){
      setSquaresComplete((prevSquaresComplete) => {
        return {...prevSquaresComplete, six: true};
      });
    }
    counter = 0;

    // bottom left
    for(let i = 6; i < 9; i++){
      for(let j = 0; j < 3; j++){
        if(board[i][j] == solvedSudoku[i][j]){
          counter++;
        }
      }
    }
    if(counter == 9){
      setSquaresComplete((prevSquaresComplete) => {
        return {...prevSquaresComplete, seven: true};
      });
    }
    counter = 0;

    // bottom middle
    for(let i = 6; i < 9; i++){
      for(let j = 3; j < 6; j++){
        if(board[i][j] == solvedSudoku[i][j]){
          counter++;
        }
      }
    }
    if(counter == 9){
      setSquaresComplete((prevSquaresComplete) => {
        return {...prevSquaresComplete, eight: true};
      });
    }
    counter = 0;

    // bottom right
    for(let i = 6; i < 9; i++){
      for(let j = 6; j < 9; j++){
        if(board[i][j] == solvedSudoku[i][j]){
          counter++;
        }
      }
    }
    if(counter == 9){
      setSquaresComplete((prevSquaresComplete) => {
        return {...prevSquaresComplete, nine: true};
      });
    }
    counter = 0;
  } 
    
  useEffect(() => {
    setTimeout(() => {
      if (board[0] != null) {
        checkIsSquareComplete();  
      }
    }, 100)
  }, [board]);
  
  const boardUI = []
  if (!loading) {
    for (let i = 0; i < sudoku.length; i++) {
      let curRow = [];
      for (let j = 0; j < sudoku[i].length; j++) {
        if (sudoku[i][j] === 0 ){
          if (i >= 0 && i <= 2 && j >= 0 && j <= 2) {
            let classes = `${styles.sudokuInput}`;
            if (squaresComplete.one) {
              classes += ` ${styles.correct}`;
            }
            curRow.push(
              <td className={squaresComplete.one ? styles.correct : ""}>
                <input 
                  type = "text" 
                  className={classes} 
                  value={board[i][j] == 0 ? "": board[i][j]} 
                  onChange={(e) => {
                    // e is value i is row j is column
                    handleChange(e, i, j); 
                    // checkIsSquareComplete();
                  }}
                />
              </td>
            );
          } else if (i >= 0 && i <= 2 && j >= 3 && j <= 5) {
            let classes = `${styles.sudokuInput}`;
            if (squaresComplete.two) {
              classes += ` ${styles.correct}`;
            }
            curRow.push(
              <td className={squaresComplete.two ? styles.correct : ""}>
                <input 
                  type = "text" 
                  className={classes} 
                  value={board[i][j] == 0 ? "": board[i][j]} 
                  onChange={(e) => {
                    // e is value i is row j is column
                    handleChange(e, i, j);
                    // checkIsSquareComplete();
                    
                  }}
                />
              </td>
            );
          } else if (i >= 0 && i <= 2 && j >= 6 && j <= 8) {
            let classes = `${styles.sudokuInput}`;
            if (squaresComplete.three) {
              classes += ` ${styles.correct}`;
            }
            curRow.push(
              <td className={squaresComplete.three ? styles.correct : ""}>
                <input 
                  type = "text" 
                  className={classes} 
                  value={board[i][j] == 0 ? "": board[i][j]} 
                  onChange={(e) => {
                    // e is value i is row j is column
                    handleChange(e, i, j); 
                    // checkIsSquareComplete();
                  }}
                />
              </td>
            );
          } else if (i >= 3 && i <= 5 && j >= 0 && j <= 2) {
            let classes = `${styles.sudokuInput}`;
            if (squaresComplete.four) {
              classes += ` ${styles.correct}`;
            }
            curRow.push(
              <td className={squaresComplete.four ? styles.correct : ""}>
                <input 
                  type = "text" 
                  className={classes} 
                  value={board[i][j] == 0 ? "": board[i][j]} 
                  onChange={(e) => {
                    // e is value i is row j is column
                    handleChange(e, i, j); 
                    // checkIsSquareComplete();
                  }}
                />
              </td>
            );
          } else if (i >= 3 && i <= 5 && j >= 3 && j <= 5) {
            let classes = `${styles.sudokuInput}`;
            if (squaresComplete.five) {
              classes += ` ${styles.correct}`;
            }
            curRow.push(
              <td className={squaresComplete.five ? styles.correct : ""}>
                <input 
                  type = "text" 
                  className={classes} 
                  value={board[i][j] == 0 ? "": board[i][j]} 
                  onChange={(e) => {
                    // e is value i is row j is column
                    handleChange(e, i, j); 
                    // checkIsSquareComplete();
                  }}
                />
              </td>
            );
          } else if (i >= 3 && i <= 5 && j >= 6 && j <= 8) {
            let classes = `${styles.sudokuInput}`;
            if (squaresComplete.six) {
              classes += ` ${styles.correct}`;
            }
            curRow.push(
              <td className={squaresComplete.six ? styles.correct : ""}>
                <input 
                  type = "text" 
                  className={classes} 
                  value={board[i][j] == 0 ? "": board[i][j]} 
                  onChange={(e) => {
                    // e is value i is row j is column
                    handleChange(e, i, j); 
                    // checkIsSquareComplete();
                  }}
                />
              </td>
            );
          } else if (i >= 6 && i <= 8 && j >= 0 && j <= 2) {
            let classes = `${styles.sudokuInput}`;
            if (squaresComplete.seven) {
              classes += ` ${styles.correct}`;
            }
            curRow.push(
              <td className={squaresComplete.seven ? styles.correct : ""}>
                <input 
                  type = "text" 
                  className={classes} 
                  value={board[i][j] == 0 ? "": board[i][j]} 
                  onChange={(e) => {
                    // e is value i is row j is column
                    handleChange(e, i, j); 
                    // checkIsSquareComplete();
                  }}
                />
              </td>
            );
          } else if (i >= 6 && i <= 8 && j >= 3 && j <= 5) {
            let classes = `${styles.sudokuInput}`;
            if (squaresComplete.eight) {
              classes += ` ${styles.correct}`;
            }
            curRow.push(
              <td className={squaresComplete.eight ? styles.correct : ""}>
                <input 
                  type = "text" 
                  className={classes} 
                  value={board[i][j] == 0 ? "": board[i][j]} 
                  onChange={(e) => {
                    // e is value i is row j is column
                    handleChange(e, i, j); 
                    // checkIsSquareComplete();
                  }}
                />
              </td>
            );
          } else if (i >= 6 && i <= 8 && j >= 6 && j <= 8) {
            let classes = `${styles.sudokuInput}`;
            if (squaresComplete.nine) {
              classes += ` ${styles.correct}`;
            }
            curRow.push(
              <td className={squaresComplete.nine ? styles.correct : ""}>
                <input 
                  type = "text" 
                  className={classes} 
                  value={board[i][j] == 0 ? "": board[i][j]} 
                  onChange={(e) => {
                    // e is value i is row j is column
                    handleChange(e, i, j); 
                    // checkIsSquareComplete();
                  }}
                />
              </td>
            );
          }
        } else {
          if (i >= 0 && i <= 2 && j >= 0 && j <= 2) {
            let classes = `${styles.sudokuSquare}`;
            if (squaresComplete.one) {
              classes += ` ${styles.correct}`;
            }
            curRow.push(
              <td className={classes}>
                {sudoku[i][j]}
              </td>
            );
          } else if (i >= 0 && i <= 2 && j >= 3 && j <= 5) {
            let classes = `${styles.sudokuSquare}`;
            if (squaresComplete.two) {
              classes += ` ${styles.correct}`;
            }
            curRow.push(
              <td className={classes}>
                {sudoku[i][j]}
              </td>
            );
          } else if (i >= 0 && i <= 2 && j >= 6 && j <= 8) {
            let classes = `${styles.sudokuSquare}`;
            if (squaresComplete.three) {
              classes += ` ${styles.correct}`;
            }
            curRow.push(
              <td className={classes}>
                {sudoku[i][j]}
              </td>
            );
          } else if (i >= 3 && i <= 5 && j >= 0 && j <= 2) {
            let classes = `${styles.sudokuSquare}`;
            if (squaresComplete.four) {
              classes += ` ${styles.correct}`;
            }
            curRow.push(
              <td className={classes}>
                {sudoku[i][j]}
              </td>
            );
          } else if (i >= 3 && i <= 5 && j >= 3 && j <= 5) {
            let classes = `${styles.sudokuSquare}`;
            if (squaresComplete.five) {
              classes += ` ${styles.correct}`;
            }
            curRow.push(
              <td className={classes}>
                {sudoku[i][j]}
              </td>
            );
          } else if (i >= 3 && i <= 5 && j >= 6 && j <= 8) {
            let classes = `${styles.sudokuSquare}`;
            if (squaresComplete.six) {
              classes += ` ${styles.correct}`;
            }
            curRow.push(
              <td className={classes}>
                {sudoku[i][j]}
              </td>
            );
          } else if (i >= 6 && i <= 8 && j >= 0 && j <= 2) {
            let classes = `${styles.sudokuSquare}`;
            if (squaresComplete.seven) {
              classes += ` ${styles.correct}`;
            }
            curRow.push(
              <td className={classes}>
                {sudoku[i][j]}
              </td>
            );
          } else if (i >= 6 && i <= 8 && j >= 3 && j <= 5) {
            let classes = `${styles.sudokuSquare}`;
            if (squaresComplete.eight) {
              classes += ` ${styles.correct}`;
            }
            curRow.push(
              <td className={classes}>
                {sudoku[i][j]}
              </td>
            );
          } else if (i >= 6 && i <= 8 && j >= 6 && j <= 8) {
            let classes = `${styles.sudokuSquare}`;
            if (squaresComplete.nine) {
              classes += ` ${styles.correct}`;
            }
            curRow.push(
              <td className={classes}>
                {sudoku[i][j]}
              </td>
            );
          }
        }
      }
      boardUI.push(<tr className={styles.sudokuRow}>{curRow}</tr>);
    }
  }

  let keywordHint = "";
  for (let i = 0; i < keyword.length; i++) {
    keywordHint += keyword[i] === " "? "  ": "_";
  }

  const page = (
    <div className = {styles.container}>
      {keywordHint !== "" && <h2 className={styles.keywordHint}>{keywordHint}</h2>}
      <div className = {styles.timerContainer}>
          <span className = {styles.minutes}>{Math.floor(timeLeft/60)}</span>
          <span className = {styles.timerColon}>:</span>
          <span className = {styles.seconds}>{timeLeft%60 >= 10? timeLeft%60: "0" + (timeLeft%60).toString()}</span>
      </div>
      <div className={styles.container}>
        <div className = {styles.itemsContainer}>
          <div className={styles.left}>
            { user.theme !== "" && <img className = {styles.image} src = {imageLink}/> }
            <table className={styles.sudokuBoard}>
              <tbody>
                {!loading && boardUI}
              </tbody>
            </table>
          </div>
          <div className={styles.right}>
            <div className = {styles.gameInfo}>
              <h3 className={styles.description}>Player: {user.username}</h3>
              <h3 className = {styles.description}>Score: {user.score}</h3>
              <h3 className={styles.description}>Difficulty: {user.difficulty.charAt(0).toUpperCase() + user.difficulty.slice(1)}</h3>
              <h3 className={styles.description}>Theme: {user.theme.charAt(0).toUpperCase() + user.theme.slice(1)}</h3>
            </div>
            <div className = {styles.guessContainer}>
              <input type = "text" placeholder = "Guess" className = {styles.guess} value = {guess} onChange = {(e) => {setGuess(e.target.value)}} onKeyPress={handleKeyPress}/>
            </div>
            <div className={styles.buttons}>
              <button className = {styles.submitButton} onClick = {checkIsCorrect}>Check</button>
              <button className = {styles.skipButton} onClick = {generateNewBoard}>Skip</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div>
      { loading && <Loading /> } 
      { page }
    </div>
  )
}


export default Sudoku;