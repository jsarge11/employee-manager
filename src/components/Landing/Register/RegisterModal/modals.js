import React from 'react'
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';

export default {

 register : (props) => { 
  
  return (
  <div id="registrationInput">
   <input type="text" maxLength="40" onChange={(e) => props.updateValue("first_name", e.target.value)} value={props.first_name} />
   First Name <br />
   <input type="text" maxLength="40" onChange={(e) => props.updateValue("last_name", e.target.value)} value={props.last_name} />
   Last Name <br />
   <input type="text" maxLength="10" onChange={(e) => props.updateValue("work_phone", e.target.value)} value={props.work_phone} />
   Work Phone <br />
   <input type="text" maxLength="10" onChange={(e) => props.updateValue("personal_phone", e.target.value)} value={props.personal_phone} />
   Personal Phone <br />
   <input type="text" maxLength="256" onChange={(e) => props.updateValue("work_email", e.target.value)} value={props.work_email} />
   Work Email <br />
   <input type="text" maxLength="256" onChange={(e) => props.updateValue("personal_email", e.target.value)} value={props.personal_email} />
   Personal Email <br />
   <input type="text" maxLength="100" onChange={(e) => props.updateValue("address", e.target.value)} value={props.address} />
   Address <br />
   <input type="text" maxLength="100" onChange={(e) => props.updateValue("city", e.target.value)} value={props.city} />
   City <br />
   <input type="text" maxLength="2" onChange={(e) => props.updateValue("state", e.target.value)} value={props.state} />
   State <br />
   <input type="text" maxLength="10" onChange={(e) => props.updateValue("zip", e.target.value)} value={props.zip} />
   Zip <br />
   <div className="modal-footer">

 

   <p id="alert">Please fill out all forms. </p>
    <RaisedButton label="Submit Registration Request" onClick={() => {props.requestRegistration()} 
  }
  label="Submit Register Request"></RaisedButton>
    <RaisedButton onClick={() => props.closeModal()} label="Close"></RaisedButton>
   </div>
  </div>
  )
 },

 loading: () => {
  return (
  <div>loading ... </div>
  )
 },

 success: (props) => {
  return (
   <div>
    Thank you!
    Your request has been sent to Human Resources, they'll reach out to you with further instructions once your account has been activated.

     <div className="modal-footer">
      <button onClick={() => props.closeModal()} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
     </div>
   </div>
  )
 },
 error: () => {
   return (
    <div id="alert">We're sorry, an error occurred. Please try again.</div>
   )
 }
}