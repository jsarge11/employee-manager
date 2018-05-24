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
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';

class Register extends React.Component {

  state = {
    companyID: '',
    activeModal: 'register',
    findCompanyButton: false,
    work_phone_dupe: false,
    personal_phone_dupe: false,
    work_email_dupe: false,
    personal_email_dupe: false,
    emptyFields: true,
    loginMethod: '',
    status: 'register',
    employees: []
  }
  updateCompanyInput = (value) => {
    this.setState({ companyID: value }, () => {
      if (this.state.companyID.length === 6) {
        document.getElementById('companyinput').classList.remove('input-error');
        document.getElementById("alert").innerHTML = '';
        this.setState({ findCompanyButton: true })
      }
      else if (this.state.companyID.length === 0) {
        document.getElementById('companyinput').classList.remove('input-error');
        document.getElementById("alert").innerHTML = '';
      }
      else {
        document.getElementById('companyinput').classList.add('input-error');
        document.getElementById("alert").innerHTML = "Company ID must be 6 digits long."
        this.setState({ findCompanyButton: false })
      }
      
    })
  }

  checkForDuplicates = (field, arr) => {
  
    if (arr.includes(this.state[`${field}`])) {
      console.log([`${field}_dupe`]);
      this.setState({ [`${field}_dupe`] : true })
    }
    else {
      this.setState({ [`${field}_dupe`] : false })
    }
  }

  updateValue = (field, value) => {
    this.setState({ [`${field}`]: value }, () => {
      this.checkForNull();
      switch (field) {
        case "work_phone":
          this.checkForDuplicates(field, this.state.workPhones);
          break;
        case "personal_phone":
        this.checkForDuplicates(field, this.state.personalPhones);
          break;
        case "work_email":
          this.checkForDuplicates(field, this.state.workEmails);
          break;
        case "personal_email":
          this.checkForDuplicates(field, this.state.personalEmails);
          break;
        default:
          break;
      }
    }); 
  }

  checkForNull = () => {
    if (this.state.first_name && 
        this.state.last_name &&
        this.state.work_phone &&
        this.state.personal_phone &&
        this.state.work_email &&
        this.state.personal_email &&
        this.state.address &&
        this.state.city &&
        this.state.state &&
        this.state.zip) {
          console.log('setting')
          this.setState({ emptyFields : false })
        }
        else {
          this.setState({ emptyFields : true })
        }
  }

  retrieveCompany = () => {
    if (this.state.companyID.length === 6) {
      this.setState({ status: 'loading'})
      let { companyID } = this.state;

      axios.post('user/getcompany', { companyID }).then(res => {
        this.setState({status: 'register'})
        this.props.updateCompany(res.data.company)

        let workPhones = res.data.employees.map(item => item.work_phone);
        let personalPhones = res.data.employees.map(item => item.personal_phone);
        let workEmails = res.data.employees.map(item => item.work_email.toLowerCase());
        let personalEmails = res.data.employees.map(item => item.personal_email ? item.personal_email.toLowerCase() : item.personal_email);

        axios.get('/user/allRequests').then (res => {
          let reqWorkPhones = res.data.map(item => item.work_phone);
          let reqPersonalPhones = res.data.map(item => item.personal_phone);
          let reqWorkEmails = res.data.map(item => item.work_email);
          let reqPersonalEmails = res.data.map(item => item.personal_email);

          this.setState({ 
            workPhones: workPhones.concat(reqWorkPhones),
            personalPhones: personalPhones.concat(reqPersonalPhones),
            workEmails: workEmails.concat(reqWorkEmails),
            personalEmails: personalEmails.concat(reqPersonalEmails)
          })
      })

        document.getElementsByClassName("modal")[0].style.display = "block";
      }).catch(error => {
        this.setState({status: 'register'})
        if (+error.response.status === 404) {
          document.getElementById("alert").innerHTML = error.response.data;
        }
        else {
          document.getElementById("alert").innerHTML = "Something went wrong, please try again."
        }
      })
    }
  }

  requestRegistration = (loginMethod) => {
   let isNull = this.checkForNull();
    if (isNull) {
      return;
    }
    this.setState({ activeModal: 'loading' })
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
    axios.post('/user/noduplicate', { newObj }).then (res => {
      let { company } = this.props;
      axios.post('/user/request', { newObj, company }).then(res => {
        this.setState({ activeModal: 'success' })
      }).catch((error) => {
        this.setState({ activeModal: 'error' })
      })

    }).catch(error => {
      document.getElementById("alert").innerHTML = error.response.data;
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
       {this.state.status === 'loading' ? <div className="grey"></div> : ''}
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
              <h1 style={{color: "black"}} >Enter Company ID:</h1>
              <input id="companyinput" type="text" onChange={(e) => this.updateCompanyInput(e.target.value)} placeholder="Company ID" value={this.state.companyID} /><br />
              {this.state.status === 'loading' ? <div className="loader"></div> : ''}
              <div id="alert" ></div><br/>
              {this.state.findCompanyButton ? 
                <RaisedButton label="Next" onClick={() => this.retrieveCompany()}/> :
                <RaisedButton label="Next" disabled={true}/>}
            </Paper>
          </div>
          :
          <div>
            <RegisterModal 
              company={this.props.company[0]}
              closeModal={this.closeModal}
              updateValue={this.updateValue}
              requestRegistration={this.requestRegistration}
              activeModal={this.state.activeModal}
              work_phone_dupe={this.state.work_phone_dupe}
              personal_phone_dupe={this.state.personal_phone_dupe}
              work_email_dupe={this.state.work_email_dupe}
              personal_email_dupe={this.state.personal_email_dupe}
              emptyFields={this.state.emptyFields}
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