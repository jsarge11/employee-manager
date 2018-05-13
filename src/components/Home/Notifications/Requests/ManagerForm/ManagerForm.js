import React, {Component} from 'react'
import axios from 'axios'
import './managerform.css'

export default class ManagerForm extends Component {
state = {
 job_title: '',
 job_description: '',
 salary: 0,
 is_salary: false,
 is_manager: false,
 is_hr: false,
 reports_to: 0
}

updateValue = (field, value) => {
 this.setState({ [`${field}`] : value });
}

registerEmployee = () => {
 let employee = {
  registration_key: this.props.current_request[0].registration_key,
  first_name: this.props.current_request[0].first_name,
  last_name: this.props.current_request[0].last_name,
  work_phone: this.props.current_request[0].work_phone,
  personal_phone: this.props.current_request[0].personal_phone,
  work_email: this.props.current_request[0].work_email,
  personal_email: this.props.current_request[0].personal_email,
  address: this.props.current_request[0].address,
  city: this.props.current_request[0].city,
  state: this.props.current_request[0].state,
  zip: this.props.current_request[0].zip,
  googleid: this.props.current_request[0].googleid,
  job_title: this.state.job_title,
  job_description: this.state.job_description,
  is_salary: this.state.is_salary,
  is_manager: this.state.is_manager,
  is_hr: this.state.is_hr, 
  salary: this.state.salary,
  reports_to: this.state.reports_to
 }
 axios.post('/employee/register', { employee }).then (res => {
  document.getElementById("request-modal").style.display = "none";
  this.props.updateFormCompleted(false); //this goes against natural logic, but it's purpose is to be able to handle another request upon completion
 }).catch((error)=>console.log(error))
}

render() {
 return (
  <div className="manager-form">
   <input onChange={(e)=>this.updateValue("job_title", e.target.value)} type="text" placeholder="job title ... " value={this.state.job_title}/>
   Job Title <br/>
   <input onChange={(e)=>this.updateValue("job_description", e.target.value)} type="text" placeholder="job description ... " value={this.state.job_description}/>
   Job Description<br/>
   <input onChange={(e)=>this.updateValue("salary", e.target.value)} type="text" placeholder="salary ... " value={this.state.salary}/>
   Salary Amount<br/>
   <input onChange={(e)=>this.updateValue("reports_to", e.target.value)} type="text" placeholder="reports to ... " value={this.state.salary}/>
   Reports to: <br/>


   Salary<br/>
   <div>
    Yes<input onChange={(e)=>this.updateValue("is_salary", e.target.value)} type="radio" name="salaryanswer" value={true}/>
    No<input onChange={(e)=>this.updateValue("is_salary", e.target.value)} type="radio" name="salaryanswer" value={false}/>
   </div>
   Manager <br/>
   <div>
    Yes<input onChange={(e)=>this.updateValue("is_manager", e.target.value)} type="radio" name="manageranswer" value={true}/>
    No<input onChange={(e)=>this.updateValue("is_manager", e.target.value)} type="radio" name="manageranswer" value={false}/>
   </div>
   Human Resources <br/>
  <div>
    Yes<input onChange={(e)=>this.updateValue("is_hr", e.target.value)} type="radio" name="hranswer" value={true}/>
    No<input onChange={(e)=>this.updateValue("is_hr", e.target.value)} type="radio" name="hranswer" value={false}/>
  </div>
   <br/>

   <div className="modal-footer">
    <button onClick={()=>this.registerEmployee()} type="button" className="btn btn-primary">Register</button> 
   </div>
  </div>
 )
}
}