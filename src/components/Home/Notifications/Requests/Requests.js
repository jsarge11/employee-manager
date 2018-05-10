import React from 'react'
import './requests.css'
import ManagerForm from './ManagerForm/ManagerForm'
import modals from './modals'

export default function Requests(props) {
  
  let requests = props.requests.map((item, i) => {
    return (
      <div key={item + i}>
        <span>Name: <strong>{item.first_name} {item.last_name}</strong> Email: <strong>{item.work_email}</strong> Phone: <strong>{item.work_phone}</strong> From: <strong>{item.city}, {item.state}</strong></span>
        <button onClick={() => props.finishForm(item.id)}>Finish Employee Approval</button><button onClick={() => props.deny(item.id)}>Deny Request</button>
        <hr />
      </div>
    )
  })

  return (
    <div id="request-modal" tabIndex="1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          {!props.formCompleted ? modals.requests(props, requests) : modals.form(props, ManagerForm)}
        </div>
      </div>
    </div>
  );
}