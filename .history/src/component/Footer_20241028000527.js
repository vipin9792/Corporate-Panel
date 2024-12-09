import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div>
       <footer className="footer  text-white text-center p-3" style={{ background: "#1C4481",position: "absolute", bottom: 0, left: 0, right: 0, borderTop: "1px solid #fff" }}>
    <div className="container">
        <p>&copy; {new Date().getFullYear()} SP Institute of Workforce Development Pvt Ltd (SPIWD). All rights reserved.</p>
         <div className='m'>
            <Link to="/about" style={{ color: "white", margin: "0 15px" }} className='text-decoration-none'>About</Link>
            <Link to="/privacy" style={{ color: "white", margin: "0 15px" }} className='text-decoration-none'>Privacy Policy</Link>
            <Link to="/terms" style={{ color: "white", margin: "0 15px" }} className='text-decoration-none'>Terms of Service</Link>
        </div>
    </div>
</footer> 





    </div>
  )
}

export default Footer
