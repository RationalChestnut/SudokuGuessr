import React from 'react';
import { Link } from "react-router-dom"

import styles from "./FormSubmitButton.module.css"

const FormSubmitButton = ({text, onClick}) => {
  return <button className={styles.button} onClick={onClick}>{text}</button>;
}

export default FormSubmitButton;