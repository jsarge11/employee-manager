import React from 'react'
import axios from 'axios'
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
export default class CommentBox extends React.Component {
 state = {
  comment: '',
  email: '',
 }

 submitForm() {
  let payload = {
   comment: this.state.comment,
   email: this.state.email
  }
  axios.post('/comment/send', { payload } ).then( res => {
   console.log(res);
  })
  this.setState({ 
   comment: '',
   email: ''
  })
 }
 updateComment(comment) {
  this.setState({comment: comment})
 }
 updateEmail(email) {
  this.setState({email: email})
 }
 render() {

  return (
   <div>
    Comments? Let us know how we're doing. 
    <textarea onChange={e=>this.updateComment(e.target.value)} id="comment-box" rows="5" cols="50" placeholder="Questions ... Comments ... Let us know!" value={this.state.comment} />
    <input onChange={e=>this.updateEmail(e.target.value)}id="comment-email" type="email" placeholder="Put your email here to get a quick response!" value={this.state.email} />
    <RaisedButton onClick={()=>this.submitForm()} type="submit"> Submit </RaisedButton>
   </div>
  )
 }
}