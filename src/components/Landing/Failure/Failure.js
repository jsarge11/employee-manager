import React from 'react' 
import Paper from 'material-ui/Paper'
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router-dom'
import './failure.css'

export default function Failure() {
 const style = {
  height: 400,
  width: 600,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block'
};
const toolStyle = {
  alignItems: 'center'
}

 return (
  <div id="landing">
   <div id="login-wrapper">
      <Paper style={style} zDepth={5}>
       <Toolbar style={toolStyle}>
         <ToolbarTitle text="Login Failed" />
           <Link to="/"><FlatButton label="Home"/></Link>
           <Link to="/login"><FlatButton label="Login"/></Link>
       </Toolbar> 
       <div id="failure-text"><p style={{fontSize: "20px"}}>Most likely you've reached this page because you tried to login with your social media account before you were registered with a company. <br/><br/>Contact your HR representative to register. If you believe you've reached this page in error, please clear your cookies, try again, and then reach out to support@argosvisual.com</p>  </div> 
       </Paper>
    </div>
   </div>
 )
}