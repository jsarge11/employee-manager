import React from 'react'
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';

export default {

 register : (props) => { 
  
  return (
  <div id="registrationInput">
   <input type="text" name="firstname" maxLength="40" onChange={(e) => props.updateValue("first_name", e.target.value)} placeholder="First Name" value={props.first_name} autoComplete="firstname"/>
   First Name <br />
   <input type="text" name="lastname" maxLength="40" onChange={(e) => props.updateValue("last_name", e.target.value)} placeholder="Last Name" value={props.last_name} autoComplete="lastname"/>
   Last Name <br />
   <input type="text" name="workphone" maxLength="10" onChange={(e) => props.updateValue("work_phone", e.target.value)} placeholder="Work Phone" value={props.work_phone} autoComplete="workphone"/>
   Work Phone <br />
   <input type="text" name="personalphone" maxLength="10" onChange={(e) => props.updateValue("personal_phone", e.target.value)} placeholder="Personal Phone" value={props.personal_phone}autoComplete="personalphone" />
   Personal Phone <br />
   <input type="text" name="workemail" maxLength="256" onChange={(e) => props.updateValue("work_email", e.target.value)} placeholder="Work Email"value={props.work_email} autoComplete="workemail"/>
   Work Email <br />
   <input type="text" name="personalemail" maxLength="256" onChange={(e) => props.updateValue("personal_email", e.target.value)} placeholder="Personal Email"value={props.personal_email}autoComplete="personalemail" />
   Personal Email <br />
   <input type="text" name="address" maxLength="100" onChange={(e) => props.updateValue("address", e.target.value)} placeholder="Street Address"value={props.address} autoComplete="address"/>
   Address <br />
   <input type="text" name="city" maxLength="100" onChange={(e) => props.updateValue("city", e.target.value)} placeholder="City"value={props.city} autoComplete="city"/>
   City <br />
   <input type="text" name="state" maxLength="2" onChange={(e) => props.updateValue("state", e.target.value)} placeholder="State"value={props.state} autoComplete="state"/>
   State <br />
   <input type="text" name="zip" maxLength="10" onChange={(e) => props.updateValue("zip", e.target.value)} placeholder="Postal Code"value={props.zip} autoComplete="zip"/>
   Postal Code <br /> <br/> <br/> <br/>
   <div className="modal-footer">
   <p id="alert">Please fill out all forms. </p>
    <RaisedButton label="Submit Registration Request" onClick={() => {props.requestRegistration()}}></RaisedButton>
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