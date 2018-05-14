import React from 'react'
import Paper from 'material-ui/Paper'
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';
import { Link } from 'react-router-dom'
import './about.css'

export default function About(props) {
 const style = {
  height: 500,
  width: 900,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  zIndex: 999,
};
const toolStyle = {
  alignItems: 'center'
}

 return (
  <div id="landing">
   <div id="about-wrapper">
    <Paper style={style} zDepth={5}>
     <Toolbar style={toolStyle}>
      <ToolbarTitle text="About" />
       <Link style={{textDecoration: "none"}} to="/"><h1 className="close-paper">&times;</h1></Link>
     </Toolbar>
     <div className="about-content"> <p>
      After being dissatisfied with the inefficiency of physical org-charts, the cost of functional virtual org-charts, and the lack of functionality and ugly look of free org-charts, Argos was born. Our goal is to create a cost-effective, seamless employee-lookup in a simple, easy to look at fashion. We provide only the necessary features, and provide the ability for you to connect your already loved tools for integration with Argos. <br/><br/>
  
       We're not looking to replace all of your business tools, just be the first step in managing your employees and your business. <br/><br/><br/>
      </p>
       <h2>Argos Visual® – Helping you see everything. </h2>
     </div>
    </Paper>
   </div>
  </div>
 )
}