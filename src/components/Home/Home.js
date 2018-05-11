import React from 'react'
import { updateUser, changeImage, logOut } from '../../ducks/reducer'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import OrgChart from '@latticehr/react-org-chart/src_spread/react/org-chart'
import HomeNav from './HomeNav/HomeNav';
import Personal from './Personal/Personal'
import loading from '../../img/loading.svg'
import './home.css'

class Home extends React.Component {

  state = {
    orgchart: [],
    active: false,
    employeesloaded: false,
    status: 'Loading',
    isWhite: true,
    data: {},
    company_name: ''
   }
 
 componentDidMount() {
  axios.get('/user/auth').then ( res => {
    this.props.updateUser(res.data.user);
    let { company_id } = res.data.user[0];

    axios.get('/employees?id=' + company_id).then ( res => {
      console.log(res.data);
      let treeJson = this.toJson(res.data.employees)
      let reactOrgChart = this.createNestedObject(treeJson);

      this.setState({ 
        data : reactOrgChart,
        employeesloaded : true,
        company_name: res.data.obj[0].company_name
      })
  
    }).catch(() => {
      alert('Something went wrong, we apologize');
      this.setState({ status: 'fail' })
    })
  }).catch((error) => {
    console.log(error);
    console.log('user failed')
    this.setState({ status: 'fail'}) 
    }
  )
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

 render() {

  if (this.state.status !== 'fail') {
  return (
   <div id="home-wrapper">
    <div className="home">  
      {this.props.user.displayName ? 
      <div> 
        <HomeNav togglePersonal={this.togglePersonal}
                 logOutStatus={this.logOutStatus}
                 company_name={this.state.company_name}
        
        /> 
        
        <Personal active={this.state.active} 
                  togglePersonal={this.togglePersonal}
                  user={this.props.user}
        />
        <br/>
        {this.state.employeesloaded ? 
        <div className = "tree">
          <OrgChart tree={this.state.data} nodeHeight={180}/>
        </div>
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
export default connect(mapStateToProps, { updateUser, changeImage, logOut })(Home)