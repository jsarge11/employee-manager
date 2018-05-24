import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux';
import {updateUser} from '../../../ducks/reducer'
import './login.css'
import Paper from 'material-ui/Paper'
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton' 
import bcrypt from 'bcryptjs'
import {googleIcon, microsoftIcon} from './helper'

// import axios from 'axios'

class Login extends React.Component {
 state = {
   email: '',
   password: '',
   success: false
 }

 updateValue = (field, value) => {
  this.setState({ [`${field}`]: value });
}
validateEmail = () => {
  if (!this.state.email.includes("@")) {
    return true;
  } else {
    let arr = this.state.email.split("@");
    if (arr.length !== 2) {
      return true;
    } else {
      if (arr[0].length === 0 || arr[1].length === 0) {
        return true;
      } else {
        return true;
      }
    }
  }
}

login = () => {
  if (this.validateEmail()) {
    let { email } = this.state;
    axios.post('/user/manual', { email }).then( res => {
      let success = bcrypt.compareSync(this.state.password, res.data.password);
      if (success) {
        let { employee_id } = res.data;
        // adding it to an object inside of an array so that the server can properly destructure it
        let user = [{ employee_id: employee_id }];
        axios.post('/user/auth', { user } ).then (res => {
          this.props.updateUser(res.data);
        })
      } 
      else {
        this.setState({ 
          email: '',
          password: ''
        })
        document.getElementById("alert").innerHTML = "Sorry, the password you entered doesn't match.";
      }
    }).catch(error=>document.getElementById("alert").innerHTML = error.response.data)
  }
  else {
    document.getElementById("alert").innerHTML = "Invalid Email."
  }
}
showModal = () => {
  document.getElementsByClassName("validation-modal")[0].style.display = "block";
}
hideModal = () => {
  document.getElementsByClassName("validation-modal")[0].style.display = "none";
}

 render () {
  if (this.props.user[0]) {
   return <Redirect push to='/home'/>
  } 

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
         <ToolbarTitle text="Login" />
          <div className="login-nav">
            <Link to="/register"><FlatButton label="Register"/></Link>
            <Link onMouseOver={()=>this.showModal()} onMouseOut={()=>this.hideModal()} to="/activate"><FlatButton label="Activate"/></Link>
            <Paper className="validation-modal" zDepth={3}> Only activate if your employer has approved your request. </Paper>
            <Link style={{textDecoration: "none", marginBottom: "5px"}} to="/"><h1 className="close-paper">&times;</h1></Link>
          </div>
       </Toolbar>
         <div id="login">
           <input onChange={(e)=>this.updateValue("email",e.target.value)} type="text" placeholder="email ..." />
           <input onChange={(e)=>this.updateValue("password",e.target.value)} type="password" placeholder="password ..." />
           <p> Login is only possible after activation. </p>
           <RaisedButton label="Login" style={{margin: "15px 0"}} onClick={()=>this.login()}/>

            <RaisedButton href={process.env.REACT_APP_GOOGLE_LOGIN} label="Login with Google" icon={googleIcon}/>
          <RaisedButton href={process.env.REACT_APP_WINDOWSLIVE_LOGIN}label="Login with Outlook" icon={microsoftIcon}/>
           <div id="alert" ></div>
         </div>
       </Paper>
  
   </div>

   </div>
  )
 }
}
function mapStateToProps(state) {
 let { user } = state;
 return {
  user
 }
}
export default connect(mapStateToProps, { updateUser })(Login)