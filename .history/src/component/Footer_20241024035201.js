import React from 'react'
import 
const Footer = () => {
  return (
    <div>
      <footer style={{ background: "#343a40", color: "white", padding: "20px 0", textAlign: "center" }}>
    <div className="container">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        <div>
            <Link to="/about" style={{ color: "white", margin: "0 15px" }}>About</Link>
            <Link to="/privacy" style={{ color: "white", margin: "0 15px" }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: "white", margin: "0 15px" }}>Terms of Service</Link>
        </div>
    </div>
</footer>
    </div>
  )
}

export default Footer
