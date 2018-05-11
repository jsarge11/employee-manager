import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import './homenav.css'
import Notifications from '../Notifications/Notifications';
import Nav from '../../Top-Level/Header/Nav/Nav'

function HomeNav(props) {
 console.log(props);
 return (
  <div className="homenav">
   <div>
      <h4>Welcome back, {props.user[0].first_name}!</h4>
      <h4>Company: {props.company_name}</h4>
      <h4>Position: {props.user[0].job_title}</h4>
      {props.user[0].is_hr ? <Notifications/> : ''}
      <button onClick={()=>props.togglePersonal()}>personal</button>
      <Link to="/"><button onClick={()=>props.logOutStatus()}>Logout</button></Link>
   </div>
   <div> 
     <Nav />
   </div>

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