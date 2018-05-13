import React, {Component} from 'react'
import axios from 'axios'
import './managerform.css'
import { connect } from 'react-redux'

class ManagerForm extends Component {
state = {
 employees: [],
 job_title: '',
 job_description: '',
 salary: 0,
 is_salary: false,
 is_manager: false,
 is_hr: false,
 reports_to_search: '',
 reports_to_num: '',
 searchArr: [],
}

componentDidMount() {
  axios.get("/employees?id=" + this.props.company).then(res => {
    console.log(res.data)
    this.setState({ employees: res.data.employees })
  })
}
updateValue = (field, value) => {
 this.setState({ [`${field}`] : value });
}
autoSearch = (value) => {
  this.setState({reports_to_search: value.toLowerCase()}, () => {
    let newArr = this.state.employees.filter((item) => {
      let fullName = item.first_name + ' ' + item.last_name;
      if (fullName.toLowerCase().includes(this.state.reports_to_search)) {
        return fullName;
      }
    })
    this.setState({searchArr: newArr});
  })
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
  company_id: this.props.current_request[0].company_id,
  job_title: this.state.job_title,
  job_description: this.state.job_description,
  is_salary: this.state.is_salary,
  is_manager: this.state.is_manager,
  is_hr: this.state.is_hr, 
  salary: this.state.salary,
  reports_to: this.state.reports_to_num
 }
 axios.post('/employee/register', { employee }).then (res => {
  document.getElementById("request-modal").style.display = "none";
  this.props.updateFormCompleted(false); //this goes against natural logic, but it's purpose is to be able to handle another request upon completion
 }).catch((error)=>console.log(error))
}

showDropdown = () => {
  document.getElementById("dropdown").style.display = "block";
  document.getElementById("dropdown").style.height = null;
  document.getElementById("dropdown").style.minHeight = "10%";
}
hideDropdown = () => {
  this.setState({ searchArr: [] })
  document.getElementById("dropdown").style.display = "none";
  document.getElementById("dropdown").style.minHeight = "0";
  document.getElementById("dropdown").style.height = "0";
}

render() {
  let searchResults = this.state.searchArr.map((item, i)=> {
    return (
      <div onClick={()=>this.setState({reports_to: `${item.first_name} ${item.last_name}`, reports_to_num: item.employee_id})} className="search-item" key={item + i}>
        {item.first_name}&nbsp;{item.last_name}
      </div>
    )
  })

 return (
  <div className="manager-form">
   <input onChange={(e)=>this.updateValue("job_title", e.target.value)} type="text" placeholder="job title ... " value={this.state.job_title}/>
   Job Title <br/>
   <input onChange={(e)=>this.updateValue("job_description", e.target.value)} type="text" placeholder="job description ... " value={this.state.job_description}/>
   Job Description<br/>
   <input onChange={(e)=>this.updateValue("salary", e.target.value)} type="text" placeholder="salary ... " value={this.state.salary}/>
   Salary Amount<br/>
   <div id="search-wrapper">
     <input onFocus={()=>this.showDropdown()} onBlur={()=>setTimeout(()=>this.hideDropdown(), 200)} onChange={(e)=>this.autoSearch(e.target.value)} type="text" placeholder="search company ... "/>
     <div id="dropdown">{searchResults}</div>
   </div>
   Reports to: {this.state.reports_to}<br/>
   Employee ID: {this.state.reports_to_num}
   <br/>
   <br/>


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
function mapStateToProps(state) {
  let { company } = state;
  return {
    company
  }
}
export default connect(mapStateToProps)(ManagerForm)