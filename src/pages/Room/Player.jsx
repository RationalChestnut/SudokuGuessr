import React from "react";
import { AiFillCheckCircle } from "react-icons/ai"
import { ImCancelCircle } from "react-icons/im"
import styles from "./Room.module.css"

const Player = (props) => {
  const name = props.player.name;
  const name = props.player.status
  return (
    <div className = {styles.playerContainer}>
      <p>{name}</p>
      <div>
        {status == "ready" ? <AiFillCheckCircle/> : <ImCancelCircle/>}
      </div>
    </div>
  )
}

module.exports = Player;