import React from 'react'
import Paper from 'material-ui/Paper'
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';
import { Link } from 'react-router-dom'
import './about.css'

export default function About(props) {
 const style = {
  height: 500,
  width: 900,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  zIndex: 999,
};
const toolStyle = {
  alignItems: 'center'
}

 return (
  <div id="landing">
   <div id="about-wrapper">
    <Paper style={style} zDepth={5}>
     <Toolbar style={toolStyle}>
      <ToolbarTitle text="Testing Credentials" />
       <Link style={{textDecoration: "none"}} to="/"><h1 className="close-paper">&times;</h1></Link>
     </Toolbar>
     <div className="about-content">
     <h2>Employer Login</h2>
     <p>
       For those looking to test this product in anyway, please login with the following credentials. <br/><br/>
       Username: <em>bat@batman.com</em><br/>
       Password: <em>batman</em>
       <br/>
       <br/>
     </p>
     </div>
    </Paper>
   </div>
  </div>
 )
}