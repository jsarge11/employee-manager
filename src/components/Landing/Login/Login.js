import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux';
import {updateUser} from '../../../ducks/reducer'
import google from '../../../img/google_signin_hover.png'
import windowslive from '../../../img/Sign-In-Large---Default.png'
import './login.css'
import Paper from 'material-ui/Paper'
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton'
import bcrypt from 'bcryptjs'

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
    return false;
  } else {
    let arr = this.state.email.split("@");
    if (arr.length !== 2) {
      return false;
    } else {
      if (arr[0].length === 0 || arr[1].length === 0) {
        return false;
      } else {
        return true;
      }
    }
  }
}

login = () => {
  if (this.validateEmail()) {
    let { email } = this.state;
    axios.post('/user/login', { email }).then( res => {
      let success = bcrypt.compareSync(this.state.password, res.data.password);
      if (success) {
        let { employee_id } = res.data;
        axios.get('/user/auth', { employee_id }).then (res => {

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
            <Link style={{textDecoration: "none"}} to="/"><h1 className="close-paper">&times;</h1></Link>
          </div>
       </Toolbar>
         <div id="email-login">
           <input onChange={(e)=>this.updateValue("email",e.target.value)} type="text" placeholder="email ..." />
           <input onChange={(e)=>this.updateValue("password",e.target.value)} type="password" placeholder="password ..." />
           <button onClick={()=>this.login()}>login</button>
           <div id="alert" ></div>
         </div>
         <div id="social-login">
           <a href={process.env.REACT_APP_GOOGLE_LOGIN}><img width="187px" id="sign-in-google" src={google} alt="google"/></a>
           <a href={process.env.REACT_APP_WINDOWSLIVE_LOGIN}><img width="185px" id="sign-in-windowslive" src={windowslive} alt="windowslive"/></a>
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