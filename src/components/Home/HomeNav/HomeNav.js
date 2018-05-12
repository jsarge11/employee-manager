import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import './homenav.css'
import Notifications from '../Notifications/Notifications';
import Nav from '../../Top-Level/Header/Nav/Nav'

class HomeNav extends React.Component{
  handleRequests = () => {
    document.getElementsByClassName("request-modal-fade")[0].style.visibility = "visible";
    document.getElementsByClassName("request-modal-fade")[0].style.opacity = 1;
   }

 render () {
   return (
     <div className="homenav">
   <div>
      <h4>Welcome back, {this.props.user[0].first_name}!</h4>
      <h4>Company: {this.props.company_name}</h4>
      <h4>Position: {this.props.user[0].job_title}</h4>
      {this.props.user[0].is_hr ? <button onClick={()=>this.handleRequests()}>handle requests</button> : ''}
      <button onClick={()=>this.props.togglePersonal()}>personal</button>
      <Link to="/"><button onClick={()=>this.props.logOutStatus()}>Logout</button></Link>
   </div>
   <div> 
     <Nav />
   </div>

  </div>
 )
}
}
function mapStateToProps(state) {
 let { user, img } = state;
 return {
  user,
  img
 }
}

export default connect(mapStateToProps )(HomeNav)