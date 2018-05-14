import React from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import { logOut } from '../../../../ducks/reducer'
import './nav.css'

function Nav(props) {
 return (
  <div id="nav-wrapper"> 
    <div className="nav">
      <Link className="menu-item" to="/about">About Us</Link>
    {props.location.pathname === "/home" ? <Link className="menu-item" to="/">Home</Link> : <div></div>}
    {props.user[0] ? <Link className="menu-item" to="/home">Dashboard</Link> : <div></div>}
    {!props.user[0] ? <Link className="menu-item" to="/register">Register</Link> : <div></div>}
    {/* <Link className="menu-item" to="/company">Company</Link> */}
    {props.user[0] ?  <Link className="menu-item" to="/" onClick={()=>props.logOut({})}>Logout</Link> : <Link className="menu-item" to="/login">Login</Link>}
   </div>
   {props.user[0] ? <span className="welcome-message">Welcome back, {props.user[0].first_name}! </span> : ''}
  </div>
 )
}
function mapStateToProps(state) {
 let { user } = state;
 return {
  user
 }
}
export default withRouter(connect(mapStateToProps, { logOut })(Nav))