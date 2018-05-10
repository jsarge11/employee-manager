import React from 'react'
import './personal.css'
import { connect } from 'react-redux'
import { changeUserInfo } from '../../../ducks/reducer'
import Form from './Form'

class Personal extends React.Component {


 render() {

  let activeClass = this.props.active ? 'open' : 'closed'
  return (
   <div>
    <div className={["personalWrapper", activeClass].join(" ")}>
     <Form />
     <div> <span onClick={() => this.props.togglePersonal()} id="personalClose" >&times;</span> </div>
    </div>
   </div>
  )
 }
}

export default connect(null, { changeUserInfo })(Personal)