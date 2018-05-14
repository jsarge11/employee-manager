import React from 'react'
import {connect} from 'react-redux'
import './homenav.css'
import Nav from '../../Top-Level/Header/Nav/Nav'
import Badge from 'material-ui/Badge'
import RaisedButton from 'material-ui/RaisedButton'

class HomeNav extends React.Component{
  handleRequests = () => {
    document.getElementsByClassName("request-modal-fade")[0].style.visibility = "visible";
    document.getElementsByClassName("request-modal-fade")[0].style.opacity = 1;
   }

 render () {
   return (
     <div className="homenav">
   <div>
      <h4>{this.props.user[0].first_name}'s Dashboard</h4>
      <h4>Company: {this.props.company_name}</h4>
      <h4>Position: {this.props.user[0].job_title}</h4>

      <RaisedButton label="Profile" onClick={()=>this.props.togglePersonal()}></RaisedButton>
      
      {this.props.user[0].is_hr ? 

        this.props.requestNumber ?
        
          <Badge 
            badgeContent={this.props.requestNumber}
            primary={true}
          >
            <RaisedButton label="Requests" onClick={()=>this.handleRequests()}></RaisedButton> 
          </Badge>
        :
       <RaisedButton label="No Requests" disabled={true} ></RaisedButton>
      
      : ''}

      
   </div>
   <div> 
     <Nav />
   </div>

  </div>
 )
}
}
function mapStateToProps(state) {
 let { user, img, requestNumber } = state;
 return {
  user,
  img,
  requestNumber
 }
}

export default connect(mapStateToProps )(HomeNav)