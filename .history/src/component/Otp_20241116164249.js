
import React, { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 


const Otp = () => {
   
    const [otp, setOtp] = useState(Array(4).fill('')); // Change to 4 inputs
    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value.slice(0, 1); // Get only the first character

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1].focus(); // Focus next input
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus(); // Focus previous input
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        alert(`OTP entered: ${otpValue}`); // Alert the OTP
        alert('OTP verification successful!'); // Alert for successful verification
    };

    const handleResendOtp = () => {
        setOtp(Array(4).fill('')); // Clear the input fields
        alert('OTP has been resent!'); // Replace with actual resend logic
    };
    
     
    
      return (
        <section>
          <div className="row credential">
            <div className="col-lg-6 bg-primary text-white bg-icons"><br/><br/>
              <div className="imageicon">
                <img src="logo1.png" alt="logo" id="logo" className='demo_sec'/>
                <img src="pen-scale.svg" alt="" />
                <img src="boy.svg" alt="boy" />
                <img src="bulb1.svg" alt="bg-icon-3" />
                <img src="computer-person.svg" alt="bg-icon-8" />
              </div>
              <div className="wrapper-inner mt-5">
                
                 
                
                
                    <form
                      className="bg-white signupForm"
                      style={{
                        maxWidth: '440px',
                        borderRadius: '60px',
                        height: '410px',
                        margin: 'auto',
                        padding: 'px',
                        marginTop: '104px',
                        overflow: 'hidden'
                      }}
                    >
                      <div className="row">
                   
                        
    
                     <div className="col-lg-10 mx-auto">
                         

                    
                     <Container className="mt-5">
            <h2 className="text-center text-primary fs-3 fw-bold">Verify OTP</h2>
            <h6 className="text-center text-secondary my-4 ">Enter Four Digit Code Sent To Your Email</h6>
            <Form onSubmit={handleSubmit} >
                <Row className="mb-3 justify-content-center">
                    {otp.map((digit, index) => (
                        <Col key={index} xs="auto">
                            <Form.Control
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                ref={(el) => (inputRefs.current[index] = el)}
                                style={{ width: '50px', height: '50px', textAlign: 'center' }}
                            />
                        </Col>
                    ))}
                </Row>
                <Button type="submit" className="w-100 mb-3 rounded-pill  text-white">Verify OTP</Button>
                <Button type="button" className="w-100 rounded-pill text-white" onClick={handleResendOtp}>Resend OTP</Button>
            </Form>
        </Container>

                     
                     
                     </div>
                   </div>
                 </form>
              
           </div>
         </div>
 
            <Slider/>
          </div>
        </section>
      );
    };
    
export default Otp
