import React from 'react'
import axios from 'axios'
import Requests from './Requests/Requests'
import './Requests/requests.css'

export default class Notifications extends React.Component {

 state = {
  number_of_requests: 0,
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
   this.setState({ 
    number_of_requests: res.data.length,
    requests: res.data
   })

  }).catch((error) => console.log(error))
 }

 handleRequests = () => {
  document.getElementById("request-modal").style.display = "block";
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
  document.getElementById("request-modal").style.display = "none";
  this.setState({ formCompleted: false })
 }

 render() {
  return (
   <div> 
    requests: {this.state.number_of_requests} <br/>
    <button onClick={()=>this.handleRequests()}>handle requests</button>

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