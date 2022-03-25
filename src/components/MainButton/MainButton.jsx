import React from 'react';
import { Link } from "react-router-dom"

import styles from "./MainButton.module.css"

const MainButton = ({text, to}) => {
  return (
    <Link to={to} className={styles.link}>
      <button className={styles.button}>{text}</button>
    </Link>
  );
}

export default MainButton;