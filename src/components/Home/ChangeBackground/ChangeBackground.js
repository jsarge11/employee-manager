import React from 'react'
import './changebackground.css'

export default function ChangeBackground(props) {
 return (
  <div id="change-background">
  background: <button onClick={()=>props.changeBackgroundImage(true)}>white</button> <button onClick={()=>props.changeBackgroundImage(false)}>home</button>
  </div>
 )
}