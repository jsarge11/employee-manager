import React from 'react'
import {Link} from 'react-router-dom'
import Nav from './Nav/Nav'
import { connect } from 'react-redux'
import './header.css'

class Header extends React.Component {

 state = {
  scrollHeight: 0,
  headerActive: false,
 }
 componentDidMount() {
  window.addEventListener('scroll', this.scroll);
}
componentWillUnmount() {
  window.removeEventListener('scroll', this.scroll);
}
scroll = (e) => {
  let scrollTop = e.srcElement.body.scrollTop;
  this.setState({ scrollHeight: scrollTop })

  if (scrollTop > 300) {
   this.setState({headerActive: true})
  }
  else {
   this.setState({headerActive: false})
  }
}
 render() {
 
  return (
   <header onScroll={e=>this.scroll(e)} className={!this.state.headerActive ? 'header' : 'headerOpen'}> 
    <Link to="/"><img className="logo-img" height="50px" src={this.props.img} alt="logo" /></Link>
    <Nav 
      toggleMenu={this.toggleMenu}
      menuOpen={this.state.menuOpen}
    />
   </header>
  )
 }
}
  function mapStateToProps(state) {
   let { user, img } = state;
   return {
    user,
    img
   }
  }
export default connect(mapStateToProps)(Header)