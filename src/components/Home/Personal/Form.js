import React from 'react'
import { connect } from 'react-redux'
import { changeUserInfo } from '../../../ducks/reducer'
import axios from 'axios'

class Form extends React.Component {

 state = {
  edit_address: false,
  edit_work_phone: false,
  edit_personal_phone: false,
  edit_work_email: false,
  edit_personal_email: false
 }

 editForm = (type) => {
  let edit = "edit_" + type;
  this.setState({ [`${edit}`]: !this.state[edit] })
 }

 updateField = (field, value) => {
  this.setState({ [`${field}`]: value});
 }

 saveForm = (type) => {
  this.editForm(type);

  if (type === "address") {
   let arrType = [];
   let arr = []; 

   let { address, city, state, zip } = this.state;
   arrType.push("address", "city", "state", "zip");
   arr.push(address, city, state, zip);

   let db_object = {
    employee_id: this.props.user[0].employee_id,
    arrType: arrType,
    arr: arr,
   }
   console.log(db_object);
   for (let i = 0; i < 4; i++) {
     this.props.changeUserInfo(arrType[i], arr[i]);
    } 

   axios.put('user/update', {db_object}).then(res => {
      
   }).catch(error=>(console.log(error)))
 }
 else {
  let value = this.state[type];

  let db_object = {
   employee_id: this.props.user[0].employee_id,
   type: type,
   value: value
  }
  this.props.changeUserInfo(type, value);
  
  axios.put('user/update', {db_object}).then (res => {
  }).catch(error=>(console.log(error)))
 }
}

 render() {
  console.log(this.state);
  return (
   <div>
    <h1 style={{color: "black"}}> Welcome, {this.props.user[0].first_name}</h1>
    <div className="subtitle"> Edit your information here.</div>
   <b> Address:</b> {!this.state.edit_address ? 
    <div>{this.props.user[0].address} {this.props.user[0].city} {this.props.user[0].state} {this.props.user[0].zip} 
    <button onClick={()=>this.editForm("address")}>edit</button></div>
     :
     <div>
      <input type="text" onChange={(e)=>this.updateField("address",e.target.value)} placeholder="address"/>
      <input type="text" onChange={(e)=>this.updateField("city",e.target.value)} placeholder="city"/>
      <input type="text" onChange={(e)=>this.updateField("state",e.target.value)} placeholder="state"/>
      <input type="text" onChange={(e)=>this.updateField("zip",e.target.value)} placeholder="zip"/>
      <button onClick={()=>this.saveForm("address")}>save</button>
     </div>
    } 
    <br/>
    <b>Work Phone:</b> {!this.state.edit_work_phone ?
    <div>{this.props.user[0].work_phone} <button onClick={()=>this.editForm("work_phone")}>edit</button>  <br/> </div>
    :
    <div>
     <input type="text" onChange={(e)=>this.updateField("work_phone",e.target.value)} placeholder="work phone"/>
     <button onClick={()=>this.saveForm("work_phone")}>save</button>
    </div>
    }
    <b>Personal Phone:</b> {!this.state.edit_personal_phone ?
    <div>{this.props.user[0].personal_phone} <button onClick={()=>this.editForm("personal_phone")}>edit</button><br/> </div> 
    :
    <div>
     <input type="text" onChange={(e)=>this.updateField("personal_phone",e.target.value)} placeholder="personal phone"/>
     <button onClick={()=>this.saveForm("personal_phone")}>save</button>
    </div>}
   <b> Work Email:</b> {!this.state.edit_work_email ?
    <div>{this.props.user[0].work_email} <button onClick={()=>this.editForm("work_email")}>edit</button> <br/></div>
    :
    <div>
     <input type="text" onChange={(e)=>this.updateField("work_email",e.target.value)} placeholder="work email"/>
     <button onClick={()=>this.saveForm("work_email")}>save</button>
    </div>}
    <b>Personal Email:</b> {!this.state.edit_personal_email ?
    <div>{this.props.user[0].personal_email} <button onClick={()=>this.editForm("personal_email")}>edit</button> <br/></div>
    :
    <div>
     <input type="text" onChange={(e)=>this.updateField("personal_email",e.target.value)} placeholder="personal email"/>
     <button onClick={()=>this.saveForm("personal_email")}>save</button>
    </div>}
   <b> Salary:</b> {this.props.user[0].salary} <br/>
   </div>
  )
 }
}
function mapStateToProps(state) {
 let { user } = state;
 return {
  user
 }
}
export default connect(mapStateToProps, {changeUserInfo})(Form)


