import React from 'react'
import './footer.css'
import CommentBox from './CommentBox/CommentBox'

export default function Footer(props) {
  return (
    <div className="footerWrapper">
      <div className="footer">
        <div id="section-one" className="footer-section"><p>Career</p> <p>Press</p> <p>Contact</p> <p>Image</p> <p>Database</p></div>
        <div id="section-two" className="footer-section"><p>Facebook</p> <p>Twitter</p> <p>LinkedIn</p> <p>Glassdoor</p></div>
        <div id="section-three" className="footer-section">
          <CommentBox />
        </div>
      </div>
      <div id="copyright">
        Copyright © 2018 Argos Visual. All Rights Reserved.
   </div>
    </div>
  )
}