import React from 'react'
import './landing.css'
import { changeImage, updateUser } from '../../ducks/reducer'
import { connect } from 'react-redux';
import rocket from '../../img/rocket.png'
import papers from '../../img/papers.png'
import badge from '../../img/badge.png'
import video from '../../video/typing.mp4'

class Landing extends React.Component {

  render() {

    return (
      <div className="landingWrapper">
        <div id="landing">
          <h2 id='bottom-left-title' className='title-text'>Helping you see everything.</h2>
          <h2 id='top-right-title' className='title-text'>A Visual Guide to Your Business</h2>
        </div>
        <div id="section-two-header">
          <h2 id="section-title"><b>Our Solutions</b></h2>
        </div>
        <div id="landing-section-two">
          <div className="icon-container"><img className="icon" src={rocket} alt="rocket" /><h3 id="picture-text">Proven Integration</h3></div> <hr />
          <div className="icon-container"> <img className="icon" src={papers} alt="papers" /><h3 id="picture-text">Effective and Efficient</h3></div> <hr />
          <div className="icon-container"> <img id="picture-badge" className="icon" src={badge} alt="badge" /><h3 id="picture-text">Award Winning Layout</h3></div>
        </div>
        <div id="landing-section-three">
          <div className="section-picture"></div>
        </div>
        <div id="landing-section-four">
          <ul className="section-description">
            <li><em className="section-three-header-text">Simple Setup.</em><br/><blockquote>No hassle, or lengthy setups, just provide us a list of your employees and we'll do the rest.</blockquote> </li>
            <li><em className="section-three-header-text">Scalable.</em><br/><blockquote>Companies of <b>all</b> sizes can effectively manage and interact with data.</blockquote></li>
            <li><em className="section-three-header-text">Roles</em><br/><blockquote>From CEO to new-hire, this tool provides appropriate users with the appropriate information.</blockquote></li>
          </ul>
          <div className="section-description">
            <video id="section-video" nocontrols="true" muted autoPlay loop>
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
             </video>
          </div>
        </div>

      </div>
    )
  }
}
function mapStateToProps(state) {
  let { user } = state;
  return {
    user
  }
}
export default connect(mapStateToProps, { changeImage, updateUser })(Landing)