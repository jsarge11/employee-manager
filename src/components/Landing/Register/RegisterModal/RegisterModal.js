import React from 'react'
import Company from '../Company/Company'
import './registermodal.css'
import modal from './modals'

export default function ConfirmationModal(props) {
  let display = '';
  switch(props.activeModal) {
    case('register'):
      display = modal.register(props);
      break;
    case('loading'):
      display = modal.loading();
      break;
    case('success'):
      display = modal.success(props);
      break;
    case('error'):
      display = modal.error();
      break;
    default: 
      break;
  }
  
 return (
  <div className="modal" tabIndex="1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <img height="50px" src={props.company.img} alt='company-logo'/>
          <h5 className="modal-title"> Registration Form </h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span onClick={()=>props.closeModal()} aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
         <Company company={props.company}/>
         <hr/>
          {display}
        </div>
      </div>
    </div>
  </div>
  );
}