import React from 'react'
import {Switch, Route} from 'react-router-dom'
import './main.css'

import Landing from './Landing/Landing'
import Home from './Home/Home'
import Login from './Landing/Login/Login'
import CreateCompany from './Landing/CreateCompany/CreateCompany'
import Register from './Landing/Register/Register'
import Failure from './Landing/Failure/Failure'
import About from './Landing/About/About';

export default (
 <div className="main">
   <Switch>
    <Route exact path="/" component={Landing}/>
    <Route path="/home" component={Home}/>
    <Route path="/login" component={Login}/>
    <Route path="/register" component={Register}/>
    <Route path="/create" component={CreateCompany}/>
    <Route path="/failure" component={Failure}/>
    <Route path="/about" component={About}/>
   </Switch>
 </div>
)