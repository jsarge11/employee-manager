import React from 'react'
import './requests.css'
import ManagerForm from './ManagerForm/ManagerForm'
import RaisedButton from 'material-ui/RaisedButton'
import modals from './modals'

export default function Requests(props) {
  const style = {
    padding: 5,
    marginLeft: 5,
    fill: 'grey'
  }
  let requests = props.requests.map((item, i) => {
    return (
      <div key={item + i}>
        <span>Name: <strong>{item.first_name} {item.last_name}</strong> Email: <strong>{item.work_email}</strong> Phone: <strong>{item.work_phone}</strong> From: <strong>{item.city}, {item.state}</strong></span>
        <RaisedButton style={style} onClick={() => props.finishForm(item.id)}>Finish Employee Approval</RaisedButton><RaisedButton style={style}onClick={() => props.deny(item.id)}>Deny Request</RaisedButton>
        <hr />
      </div>
    )
  })

  return (
  <div className="request-modal-fade">
    <div id="request-modal" tabIndex="1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            {!props.formCompleted ? modals.requests(props, requests) : modals.form(props, ManagerForm)}
          </div>
        </div>
      </div>
   </div>
  );
}