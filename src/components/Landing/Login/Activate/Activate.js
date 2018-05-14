import React, { Component } from 'react' 
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import {googleIcon, microsoftIcon} from '../helper'
import bcrypt from 'bcryptjs'
import axios from 'axios'


export default class Activate extends Component {
state = {
 email: '',
 password: '',
 passwordConfirm: '',
 key: '',
 validKey: false
}

updateValue = (field, value) => {
  this.setState({ [`${field}`]: value });
}
writeDocumentId = (id, message) => {
  document.getElementById(id).innerHTML = message;
}

login = () => {
  
  if (!this.state.password || !this.state.passwordConfirm) {
    this.writeDocumentId("alert", "Please fill out both password fields.");
  }
  else {
    if (this.state.password === this.state.passwordConfirm) {
      let hash = bcrypt.hash(this.state.password, 10, (err,hash) => {
        let employee = {
          hash: hash,
          email: this.state.email
        }
        axios.post('/user/create', {employee}).then (res => {
          console.log(res);
        })
        
      })
    }
    else {
      this.writeDocumentId("alert", "Passwords do not match.");
    }
  }
}
checkKey = () => {
  if (!this.state.email || !this.state.key) {
   this.writeDocumentId("alert", "Key or email missing");
  }
  else {
    this.writeDocumentId("alert", "");
    let {email, key} = this.state;
    let newObj = {
      email: email,
      key: key
    }
    axios.post('/user/check', {newObj}).then(res => {
     if (res.data.approved) {
       this.setState({ validKey: true })
     }
     else {
       this.writeDocumentId("alert", "Sorry, your employer hasn't approved your request yet.")
     }
    }).catch(error => this.writeDocumentId("alert", error.response.data))
  }
}

render() {

 const style = {
  height: 550,
  width: 600,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  zIndex: 995,
 };
 const toolStyle = {
  alignItems: 'center'
 }

 return (
  <div id="landing"> 
  <div id="login-wrapper">
  
      <Paper style={style} zDepth={5}>
      <Toolbar style={toolStyle}>
        <ToolbarTitle text="Activate" />
         <div className="login-nav">
           <Link to="/login"><FlatButton label="Login"/></Link>
           <Link to="/register"><FlatButton label="Register"/></Link>
           <Link style={{textDecoration: "none", marginBottom: "5px"}} to="/"><h1 className="close-paper">&times;</h1></Link>
         </div>
      </Toolbar>
        <div id="login">
          <input onChange={(e)=>this.updateValue("email",e.target.value)} type="text" placeholder="email" />
          <input onChange={(e)=>this.updateValue("password",e.target.value)} type="password" placeholder="enter new password" />
          <input onChange={(e)=>this.updateValue("passwordConfirm",e.target.value)} type="password" placeholder="confirm password"/>
          <input onChange={(e)=>this.updateValue("key",e.target.value)} type="text" placeholder="key" />
          <p> Please provide a valid key along with your email to start activation. </p>
          {!this.state.validKey ? <RaisedButton onClick={()=>this.checkKey()}label="Check Key"/> : ''}
          <div id="alert"></div>
          <RaisedButton disabled={!this.state.validKey} label="Create Password and Activate" style={{margin: "15px 0"}} onClick={()=>this.login()}/>
          <RaisedButton disabled={!this.state.validKey} href={process.env.REACT_APP_GOOGLE_LOGIN + "?key=" + this.state.key} label="Activate with Google" icon={googleIcon}/>
          <RaisedButton disabled={!this.state.validKey} href={process.env.REACT_APP_WINDOWLIVE_LOGIN}label="Activate with Outlook" icon={microsoftIcon}/>

          {this.state.validKey ? <h2 style={{color: "green"}}>Key Validated!</h2> : ''}
        </div>
      </Paper>
 
  </div>

  </div>
 )
   }
  }