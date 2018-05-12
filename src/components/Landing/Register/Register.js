import React from 'react'
import { Link } from 'react-router-dom'
import { updateCompany } from '../../../ducks/reducer'
import RegisterModal from './RegisterModal/RegisterModal'
import axios from 'axios'
import { connect } from 'react-redux'
import './register.css'
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'

class Register extends React.Component {

  state = {
    companyID: '',
    activeModal: 'register',
  }
  updateCompanyInput(value) {

    if (this.state.companyID.length === 5) {
      document.getElementById('companyinput').style['boxShadow'] = "0 0 10px 2px green";
      document.getElementById("alert").innerHTML = '';
    }
    else {
      document.getElementById('companyinput').style['boxShadow'] = "0 0 10px 2px red";
      document.getElementById("alert").innerHTML = "Company ID must be 6 digits long."
    }

    this.setState({ companyID: value })
  }

  updateValue = (field, value) => {
    this.setState({ [`${field}`]: value });
  }

  checkForNull = () => {
    let counter = 0;
    for (let key in this.state) {
      if (key) {
        counter++;
      }
    }
    if (counter < 12) {
      document.getElementById("alert").innerHTML = "One or more fields were left blank."
      console.log(counter);
      return false;
    }
    else {
      for (let key in this.state) {
        if (!this.state[key].replace(/\s/g, '').length) {
          // string only contained whitespace (ie. spaces, tabs or line breaks
          document.getElementById("alert").innerHTML = 'Please finish filling out the form.'
          return false;
        }
        else {
          return true;
        }
      }
    }
  }

  retrieveCompany = () => {
    if (this.state.companyID.length === 6) {
      let { companyID } = this.state;

      axios.post('user/getcompany', { companyID }).then(res => {
        this.props.updateCompany(res.data)
        document.getElementsByClassName("modal")[0].style.display = "block";
      }).catch(error => {
        if (+error.response.status === 404) {
          document.getElementById("alert").innerHTML = error.response.data;
        }
        else {
          document.getElementById("alert").innerHTML = "Something went wrong, please try again."
        }
      })
    }
  }

  generateEmployeeKey = () => {
    let newArr = []
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < 20; i++) {
      if (i < 5) {
        newArr.push(possible.charAt(Math.floor(Math.random() * possible.length)));
      }
      else {
        newArr.push(Math.floor(Math.random() * 10))
      }
    }

    return newArr.join('');
  }

  requestRegistration = () => {
    console.log('running');
   let isNull = this.checkForNull();
    if (!isNull) {
      return;
    }
    this.setState({ activeModal: 'loading' })
    let newKey = this.generateEmployeeKey();
    let { first_name, last_name, work_email, personal_email, work_phone, personal_phone, address, city, state, zip } = this.state;
    let newObj = {
      first_name: first_name,
      last_name: last_name,
      work_email: work_email,
      personal_email: personal_email,
      work_phone: work_phone,
      personal_phone: personal_phone,
      address: address,
      city: city,
      state: state,
      zip: zip
    }
    let { company } = this.props;
    axios.post('/user/request', { newKey, newObj, company }).then(res => {
      this.setState({ activeModal: 'success' })
    }).catch((error) => {
      console.log(error);
      this.setState({ activeModal: 'error' })
    })
  }


  closeModal = () => {
    document.getElementsByClassName("modal")[0].style.display = "none";
    this.props.updateCompany({});
    this.setState({ companyID: '' })
    this.setState({ activeModal: 'register' })
  }

  render() {
    const style = {
      height: 400,
      width: 600,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block'
    };
    const toolStyle = {
      alignItems: 'center'
    }
    return (
      <div id="landing">
        {!this.props.company[0]
          ?
          <div id="login-wrapper">
            <Paper style={style} zDepth={5}>
              <Toolbar style={toolStyle}>
                <ToolbarTitle text="Register" />
             <div className="login-nav">
                <Link to="/login"> <FlatButton label="Login" /></Link>
                <Link style={{textDecoration: "none"}} to="/"><h1 className="close-paper">&times;</h1></Link>
             </div>
              </Toolbar>
              <h1 style={{color: "black"}} >Enter your company's ID:</h1>
              <input id="companyinput" type="text" onChange={(e) => this.updateCompanyInput(e.target.value)} placeholder="companyid" value={this.state.companyID} /><br />
              <div id="alert" ></div>
              <button id="next-button" onClick={() => this.retrieveCompany()}>Next</button>
            </Paper>
          </div>


          :
          <div>
            <RegisterModal company={this.props.company[0]}
              closeModal={this.closeModal}
              updateValue={this.updateValue}
              requestRegistration={this.requestRegistration}
              activeModal={this.state.activeModal}
            />
          </div>
        }

      </div>
    )
  }
}
function mapStateToProps(state) {
  let { company } = state;
  return {
    company,
  }
}
export default connect(mapStateToProps, { updateCompany })(Register)