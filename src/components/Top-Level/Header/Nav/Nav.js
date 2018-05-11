import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { logOut } from '../../../../ducks/reducer'
import './nav.css'

function Nav(props) {
 return (
  <div id="nav-wrapper"> 
    {/* <div className="nav-icon" onClick={()=>props.toggleMenu()}>&#9776;</div> */}
    <div className="nav">
      <Link className="menu-item" to="/about">About Us</Link>
    {/* {props.pathname.location === "/home" ? <Link className="menu-item" to="/">Home</Link> : <div></div>} */}
    {props.user.displayName ? <Link className="menu-item" to="/home">Directory</Link> : <div></div>}
    {!props.user.displayName ? <Link className="menu-item" to="/register">Register</Link> : <div></div>}
    {/* <Link className="menu-item" to="/company">Company</Link> */}
    {props.user.displayName ?  <Link className="menu-item" to="/" onClick={()=>props.logOut({})}>Logout</Link> : <Link className="menu-item" to="/login">Login</Link>}
   </div>
   {props.user.displayName ? <span className="welcome-message">Welcome back, {props.user[0].first_name}! </span> : ''}
  </div>
 )
}
function mapStateToProps(state) {
 let { user } = state;
 return {
  user
 }
}
export default connect(mapStateToProps, { logOut })(Nav)