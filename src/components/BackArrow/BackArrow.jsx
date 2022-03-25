import React from 'react';
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai"

import styles from "./BackArrow.module.css"

const BackArrow = ({text, to}) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  }
  
  return <AiOutlineArrowLeft className = {styles.backArrow} onClick = {handleBack}/>
}

export default BackArrow;