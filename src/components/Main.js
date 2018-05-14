import React, {Component} from 'react'
import axios from 'axios'
import routes from './routes'
import { updateUser, changeBackground, changeImage } from '../ducks/reducer'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Header from './Top-Level/Header/Header'
import Footer from './Top-Level/Footer/Footer'
import loading from '../img/loading.svg'

class Main extends Component {
  state = {
    isLoaded: false,
    backgroundpages: ['/','/register','/login'],
    x: 0,
    y: 0,
  }

  componentDidMount() {
    axios.post('/user/auth').then ( res => {
      this.props.updateUser(res.data.user);
      setTimeout(()=> this.setState({ isLoaded: true }), 3000);
     
    }).catch(() => {
      this.setState({ isLoaded: true })
    }
    )

  }
 
  moveMouse = (e) => {
    if (this.props.location.pathname === '/') {
      this.setState({ x: e.screenX / 100, y: e.screenY / 100 });
      document.getElementById("landing").style.transform = `matrix(1.02,0,0,1.02,${-this.state.x},${-this.state.y})`
    }
  }

  render() { 
    if (this.state.isLoaded) {
    if (!this.state.backgroundpages.includes(this.props.location.pathname)) {
      this.props.changeBackground('home-page');
    }
    else {
      this.props.changeBackground('main-page')
    }
    return (
     <div onMouseMove={e=>this.moveMouse(e)} className={this.props.backgroundClass}>
        {this.props.location.pathname !== '/home' ? <Header /> : ''}
           {routes}
        <Footer />
     </div>
  )
 }
 else {
   return (
     <div id="loading"><img height="500px" src={loading} alt="loading"/></div>
   )
 }
}
} 
function mapStateToProps(state) {
  let { user, backgroundClass } = state;
  return {
    user,
    backgroundClass
  }  
}
export default withRouter(connect(mapStateToProps, { updateUser, changeBackground, changeImage })(Main))
