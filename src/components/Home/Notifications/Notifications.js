import React from 'react'
import axios from 'axios'
import Requests from './Requests/Requests'
import './Requests/requests.css'
import { connect } from 'react-redux' 
import { getRequestNumber } from '../../../ducks/reducer'

class Notifications extends React.Component {

 state = {
  requests: [],
  current_request: [],
  formCompleted: false
 }
 componentDidMount() {
  this.getRequests();
 }

 updateFormCompleted = (value) => {
  this.setState({ formCompleted: value})
  this.getRequests();
 }
 getRequests = () => {
  axios.get('/manager/notifications').then (res => {
    this.props.getRequestNumber(res.data.length)
    this.setState({ 
    requests: res.data
   })

  }).catch((error) => console.log(error))
 }
 finishForm = (id) => {
  this.setState({ formCompleted: true })
  axios.get('/user/request?id=' + id).then (res => {
   console.log(res.data)
   this.setState({ current_request: res.data }) ;
  }).catch((error)=>console.log(error))
 }

 deny = (id) => {
  axios.delete('/user/request?id=' + id).then( res => {
  this.getRequests();
  }).catch((error)=>console.log(error))
 }
 closeModal = () => {
  document.getElementsByClassName("request-modal-fade")[0].style.opacity = 0;
  //waiting for the .5 second transition
  setTimeout(() => document.getElementsByClassName("request-modal-fade")[0].style.visibility = "hidden", 500);
  setTimeout(() => this.setState({ formCompleted: false }), 500)
 }
 render() {
  return (
   <div> 
    <Requests requests={this.state.requests} 
              finishForm={this.finishForm}
              deny={this.deny}
              formCompleted={this.state.formCompleted}
              current_request={this.state.current_request}
              closeModal={this.closeModal}
              updateFormCompleted={this.updateFormCompleted}
    
    />
    
   </div>
  )
 }
}
export default connect(null, {getRequestNumber})(Notifications)