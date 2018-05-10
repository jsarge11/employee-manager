import React from 'react'

export default class Company extends React.Component {
 render() {
  return (
   <div> 
    <input type="text" placeholder="Company Name"/><br/>
    <input type="text" placeholder="Type of Business"/><br/>
    <input type="text" placeholder="Annual Revenue"/><br/>
    <input type="text" placeholder="Number of Employees"/><br/>
    <input type="text" placeholder="Address"/><br/>
    <input type="text" placeholder="City"/><br/>
    <input type="text" placeholder="State"/><br/>
    <input type="text" placeholder="ZIP"/><br/>
    <button>Next</button>
   </div>
  )
 }
}