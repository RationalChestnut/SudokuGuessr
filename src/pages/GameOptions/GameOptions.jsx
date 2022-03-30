import React, {useState, useContext} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import styles from "./GameOptions.module.css";
import BackArrow from "../../components/BackArrow/BackArrow.jsx";
import FormSubmitButton from "../../components/FormSubmitButton/FormSubmitButton.jsx";
import Loading from "../../components/Loading/Loading.jsx"

const GameOptions = () => {
  const navigate = useNavigate();
  
  const [state, setState] = useState({
    name: "",
    difficulty: "easy",
    theme: "countries"
  })
  const [isError, setIsError] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {    
    setIsError(false);
    setIsWarning(false);
    
    e.preventDefault();
    if (!state.name || state.name.trim() === "") {
      setIsWarning(true);
    } else{
      createUser();      
    }
  }

  const createUser = async () => {
    setLoading(true);

    try {
      const res = await axios.post("https://sudokuguessrbackend.yxli666.repl.co/createUser", {username: state.name}, {
        headers: {"Content-Type": "application/json"},
      });

      if (res.status === 200) {
        // Save in local storage
        console.log(state.difficulty);
        console.log(state.theme);
        window.localStorage.setItem("user", JSON.stringify({
          username: state.name,
          difficulty: state.difficulty,
          theme: state.theme,
          score: 0,
        }));
        
        setLoading(false);
        navigate(`/play`, {replace: true});
      }
    } catch(err) {
      setIsError(true);
      
      setState({
        name: "",
        difficulty: "easy",
        theme: "countries",
        score: 0,
      });
      setLoading(false);
    }
  }

  const page = (
    <div>
      <BackArrow />
      <div className={styles.content}>
        <h1 className={styles.heading}>Start a Game</h1>
        {isError ? <div className = {styles.bannerError}><h3>Username already registered</h3></div> : <div></div>}
        {isWarning ? <div className = {styles.bannerWarning}><h3>Please enter a username</h3></div> : <div></div>}
        <form className = {styles.form}>
          <div className = {styles.formInput}>
            <label htmlFor="name" className={styles.label}>Username: </label>
            <input type="text" placeholder="you can't use the same name twice everytime cuz it's arcade style" name="name" id="name" value={state.name} onChange={handleChange} required={true} className = {`${styles.formGeneric} ${styles.textInput}`} /> 
          </div>
          <div className = {styles.formInput}>
            <label htmlFor="difficulty" className={styles.label}>Difficulty</label>
            <select name="difficulty" id="difficulty" value={state.difficulty} onChange={handleChange} required={true} className = {styles.formGeneric}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className = {styles.formInput}>
            <label htmlFor = "theme" className = {styles.label}>Theme</label>
            <select name="theme" id="theme" value={state.theme} onChange={handleChange} required={true} className = {styles.formGeneric}>
                <option value="animals">Animals</option>
                <option value="countries">Country Flags</option>
                <option value="pokemon">Pokemon</option>
             </select>
          </div>
          <FormSubmitButton className = {styles.btn} text="Create" onClick={handleSubmit} />
        </form>
      </div>
    </div>
  )

  return (
    <div className={styles.container}>
      {!loading? page: <Loading />}
    </div>
  );
}

export default GameOptions;