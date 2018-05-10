import React from 'react'
import './company.css'

export default function Company(props) {
 return (
  <div>
    <h1 className="companyTitle"> {props.company.company_name}</h1>
    <span> {props.company.address} {props.company.city} {props.company.state} {props.company.zip} </span>
  </div>
 )
}