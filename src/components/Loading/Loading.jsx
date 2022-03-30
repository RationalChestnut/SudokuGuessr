import React from 'react';
import { ImSpinner2 } from "react-icons/im";

import styles from "./Loading.module.css";

const Loading = () => {
  return  (
    <div className={styles.loading}>
      <ImSpinner2 className={styles.icon} size={70}/>
    </div>
  )
}

export default Loading;