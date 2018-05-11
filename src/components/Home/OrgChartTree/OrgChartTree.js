// import React from 'react'
// import './orgcharttree.css'
// import 'react-orgchart/index.css'
// import { Card, CardHeader, CardText } from 'material-ui/Card'

// export default class OrgChartTree extends React.Component {
//   // document.getElementsByClassName("reactOrgChart")[0].style.height = document.getElementsByClassName("tree")[0].style.height;
//     collapse = (arr) => {   
//     if (!arr) {
//       return;
//     }
//     else {
//       arr.forEach((item, i, arr)=> {
//         document.getElementsByClassName(item.employee_id)[0].style.display === "none" ? document.getElementsByClassName(item.employee_id)[0].style.display = "block" :
//         document.getElementsByClassName(item.employee_id)[0].style.display = "none";
//         let classArray = document.getElementsByClassName("card" + item.employee_id);
//         for (let i = 0; i < classArray.length; i++) {
//           if (classArray[i].style.visibility !== "hidden") {
//             console.log('here')
//             classArray[i].style.visibility = "hidden";
//           }
//           else {
//             console.log('here21')
//             classArray[i].style.visibility = "visible";
//           }
          
//         }
//         // classArray.forEach(item=> {
//         //   item.style.display = "none";
//         // })
//         this.collapse(arr[i].children);
//       })
//     }
//   }
//   render() {
//     return (
//       <div className="initechNode">
//         <div className={this.props.node.employee_id}>
//           <Card>
//             <CardHeader
//               title={`${this.props.node.first_name} ${this.props.node.last_name}`}
//               subtitle={this.props.node.job_title}
//               actAsExpander={true}
//               showExpandableButton={true}
//             />
//             <CardText expandable={true}>
//               Job Description: {this.props.node.job_description} <br />
//               Phone: {this.props.node.work_phone} <br />
//               Email: {this.props.node.work_email}  <br />
//             </CardText>
//             <button id="individual-card" onClick={()=>this.collapse(this.props.node.children)}>collapse</button>
//           </Card>
//         </div>
//       </div>
//     )
//   }
// }