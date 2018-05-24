import React from 'react'
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';

export default {

 register : (props) => { 
  let error_phone = <p id="alert"> Sorry, that number exists already. Please use another one. <br/> </p>
  let error_email = <p id="alert"> Sorry, that email exists already. Please use another one. <br/> </p>
  return (
  <div id="registrationInput">
   <input id="first_name" type="text" name="firstname" maxLength="40" onChange={(e) => props.updateValue("first_name", e.target.value)} placeholder="First Name" value={props.first_name} autoComplete="firstname"/>
   <p id="first_name_sub">First Name</p> <br/>

   <input id="last_name" type="text" name="lastname" maxLength="40" onChange={(e) => props.updateValue("last_name", e.target.value)} placeholder="Last Name" value={props.last_name} autoComplete="lastname"/>
   <p id="last_name_sub">Last Name</p> <br/>

   <input id="work_phone" type="text" name="workphone" maxLength="10" onChange={(e) => props.updateValue("work_phone", e.target.value)} placeholder="Work Phone" value={props.work_phone} autoComplete="workphone"/>
   {!props.work_phone_dupe ? <p id="work_phone_sub">Work Phone<br/></p> : error_phone}

   <input id="personal_phone" type="text" name="personalphone" maxLength="10" onChange={(e) => props.updateValue("personal_phone", e.target.value)} placeholder="Personal Phone" value={props.personal_phone}autoComplete="personalphone" />
   {!props.personal_phone_dupe ? <p id="personal_phone_sub">Personal Phone<br/></p> : error_phone} 

   <input id="work_email" type="text" name="workemail" maxLength="256" onChange={(e) => props.updateValue("work_email", e.target.value)} placeholder="Work Email"value={props.work_email} autoComplete="workemail"/>
   {!props.work_email_dupe ? <p id="work_email_sub">Work Email<br/></p>  : error_email}

   <input id="personal_email" type="text" name="personalemail" maxLength="256" onChange={(e) => props.updateValue("personal_email", e.target.value)} placeholder="Personal Email"value={props.personal_email}autoComplete="personalemail" />
   {!props.personal_email_dupe ? <p id="personal_email_sub">Personal Email<br/></p>  : error_email}

   <input id="address" type="text" name="address" maxLength="100" onChange={(e) => props.updateValue("address", e.target.value)} placeholder="Street Address"value={props.address} autoComplete="address"/>
   <p id="address_sub">Address</p> <br />

   <input id="city" type="text" name="city" maxLength="100" onChange={(e) => props.updateValue("city", e.target.value)} placeholder="City"value={props.city} autoComplete="city"/>
   <p id="city_sub">City</p> <br />

   <input id="state" type="text" name="state" maxLength="2" onChange={(e) => props.updateValue("state", e.target.value)} placeholder="State"value={props.state} autoComplete="state"/>
   <p id="state_sub">State</p> <br />

   <input id="zip" type="text" name="zip" maxLength="10" onChange={(e) => props.updateValue("zip", e.target.value)} placeholder="Postal Code"value={props.zip} autoComplete="zip"/>
   <p id="zip_sub">Postal Code</p> <br /> 
   
   <br/> <br/> <br/>
   <div className="modal-footer">
   <p id="alert">Please fill out all forms. </p>
    {(!props.emptyFields && !props.work_phone_dupe && !props.personal_phone_dupe &&
      !props.work_email_dupe && !props.personal_email_dupe) ?
      <RaisedButton label="Submit Registration Request" onClick={() => {props.requestRegistration()}}></RaisedButton>
     :
     <RaisedButton label="Submit Registration Request" disabled={true}/>
      }
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
    Your request has been sent to Human Resources, <br/> they'll reach out to you with further instructions once your account has been activated.

     <div className="modal-footer">
      <button onClick={() => props.closeModal()} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
     </div>
   </div>
  )
 },
 error: () => {
   return (
    <div id="alert">We're sorry, an error occurred. <br/> Most likely duplicate input wasn't caught. Please try again.</div>
   )
 }
}