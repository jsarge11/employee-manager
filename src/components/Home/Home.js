import React from 'react'
import { updateUser, changeImage, logOut, updateCompany } from '../../ducks/reducer'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import OrgChart from '@latticehr/react-org-chart/src_spread/react/org-chart'
import HomeNav from './HomeNav/HomeNav';
import Personal from './Personal/Personal'
import loading from '../../img/loading.svg'
import { dateFormatter } from '../Landing/Login/helper'
import Notifications from './Notifications/Notifications'
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper'
import { Toolbar, ToolbarTitle, ToolbarSeparator } from 'material-ui/Toolbar'
import {Card, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';

import './home.css'

class Home extends React.Component {

  state = {
    orgchart: [],
    announcements: [],
    active: false,
    employeesloaded: false,
    status: 'Loading',
    isWhite: true,
    data: {},
    announceTitle: '',
    announceBody: ''
   }
 
 componentDidMount() {
  let { user } = this.props;
  axios.post('/user/auth', { user }).then ( res => {
    this.props.updateUser(res.data.user);
    let { company_id } = res.data.user[0];
    axios.get('/company/announcements?id=' + company_id).then (res => {
      this.setState({announcements: res.data})
    })
    axios.get('/employees?id=' + company_id).then ( res => {
      console.log(res.data);
      let treeJson = this.toJson(res.data.employees)
      let reactOrgChart = this.createNestedObject(treeJson);

      this.setState({ 
        data : reactOrgChart,
        employeesloaded : true,
        company: company_id
      })
  
    }).catch(error => {console.log(error)})
  }).catch((error) => {
    console.log(error);
    console.log('user failed')
    this.setState({ status: 'fail'}) 
    }
  )
}

updateValue = (field, value) => {
  this.setState({ [`${field}`]: value });
}
//takes the format returned from the database call and lets react-org-chart work with it
toJson = (data) => {
  let objArr = [];
  data.forEach(item => {
    
    let obj = {
      id: item.employee_id,
      person: {
        name: `${item.first_name} ${item.last_name}`,
        department: item.work_phone,
        title: item.job_title,
        link: item.work_email,
        totalReports: 0
      },
      children: [],
      reports_to: item.reports_to
    }
    objArr.push(obj);
  })
  return objArr;
}
//adds the children appropriately
createNestedObject = (arr) => {
  let newArr = arr.slice();

  let length = newArr.length;
  for(let i = 0; i < length; i++) { 
    if (newArr[i].reports_to) {
      let reports_to = newArr[i].reports_to;
      let arrItem = newArr.find((item) => +item.id === +reports_to);
      if (arrItem) {
        arrItem.children.push(newArr[i]);
        arrItem.person.totalReports += 1;
      }
    }
  }
  let object = newArr.find((item)=> +item.id === 1) 
  return object;
}

logOutStatus = () => {
  this.props.logOut()
  this.setState({ status: "fail"})
}
togglePersonal = () => {
  this.setState({active: !this.state.active})
}
changeBackgroundImage = (value) => { 
  this.setState({isWhite: value})
}
post = () => {

  let { announceTitle, announceBody } = this.state;
  let { employee_id, job_title, first_name, last_name, company_id } = this.props.user[0];

  let postInfo = {
    title: announceTitle,
    body: announceBody,
    name: first_name + ' ' + last_name,
    job_title: job_title,
    date: new Date(),
    company_id: company_id,
    id: employee_id,
  }
  axios.post('/company/post', postInfo).then (res => {
    this.setState({ announcements: res.data,
                    announceTitle: '',
                    announceBody: ''
              })
  }).catch(error=>console.log(error))
}
 render() {

  if (this.state.status !== 'fail') {
  this.props.updateCompany(this.state.company);
  console.log(this.state.announcements);
  let announcements = this.state.announcements.map((item, i) => {
    let newData = dateFormatter(item.date);
    console.log(newData);
    return (
      <div>
        <Card key={item + i} className="announcement-item">
          <CardHeader title={`${item.title}`} subtitle={`${item.name} | ${item.job_title} | ${item.date}`}/>
          <CardText>
          {item.body}
          </CardText>
        </Card>
        <br/>
      </div>
    )
  })

  let tabStyles = {
    backgroundColor: 'white',
    borderBottom: '.5px solid black',
    color: 'black',
  }
  let inkBar = {
    backgroundColor: 'blue'
  }
  return (
   <div id="home-wrapper">
    <div className="home">  
      {this.props.user[0] ? 
      
      <div> 
        <Notifications />
        
        <HomeNav togglePersonal={this.togglePersonal}
                 logOutStatus={this.logOutStatus}
        /> 
        
        <Personal active={this.state.active} 
                  togglePersonal={this.togglePersonal}
                  user={this.props.user}
        />
        {this.state.employeesloaded ? 
          <Tabs inkBarStyle={inkBar}>
          <Tab style={tabStyles} label="Org Chart" >
          <div className = "tree">
            <OrgChart tree={this.state.data} nodeHeight={180}/>
          </div>
          </Tab>
          <Tab style={tabStyles}label="Company Announcements" >
          <Paper zDepth={5}>
      <Toolbar>
        <ToolbarTitle text="Company Announcements" />
          <ToolbarSeparator style={{height: "100%"}} />
          {/* <ToolbarTitle text="New Hires" /> */}
      </Toolbar>
        <div className="announcement-wrapper">
          <div className="company-announcements"> 
            {announcements[0] ? announcements : <div><h2>No announcements posted, check back soon.</h2><br/><br/></div>}
          </div>
        
         {this.props.user[0].is_hr || this.props.user[0].is_manager ? 
          <div> 
          <TextField className="announcement-text" onChange={(e)=>this.updateValue("announceTitle", e.target.value)}  value={this.state.announceTitle} hintText="Announcement Title" />
            <TextField className="announcement-text" onChange={(e)=>this.updateValue("announceBody", e.target.value)} value={this.state.announceBody} fullWidth="true" hintText="Keep your announcements sweet and short :)" />
            <RaisedButton onClick={()=>this.post()}label="submit"/>
          </div>
        
          : ''
        
        }
          
          <br/>
        </div>
      </Paper>
          </Tab>
          </Tabs>
        
          : 
        <div className="loading">
          <img src={loading} alt="loading"/>
        </div>} 
      </div> 
      : 
      <div className="loading">
        <img src={loading} alt="loading"/>
      </div>
    }
    </div>

   </div>
  )
}
else {
 
  return (
   <Redirect push to="/" />
  )
}

 }
}
function mapStateToProps(state) {
 let { user } = state;
 return {
  user,
 }
}
export default connect(mapStateToProps, { updateUser, changeImage, logOut, updateCompany })(Home)