import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import './homenav.css'
import Notifications from '../Notifications/Notifications';

function HomeNav(props) {
 return (
  <div className="homenav">
   <div>
      <h4>Welcome {props.user.displayName}</h4>
      <h4>position: {props.user[0].job_title}</h4>
      {props.user[0].is_hr ? <Notifications/> : ''}
      <button onClick={()=>props.togglePersonal()}>personal</button>
      <button onClick={()=>props.logOutStatus()}>Logout</button>
   </div>
   <div> <Link to="/"><img className="logo-img" height="80px" src={props.img} alt="logo" /></Link></div>

  </div>
 )
}
function mapStateToProps(state) {
 let { user, img } = state;
 return {
  user,
  img
 }
}

export default connect(mapStateToProps )(HomeNav)