import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; // Ensure your CSS file is properly set up


const Signup = () => {
  
  return (
    

      <div className='row credential'>
        <div className='col-lg-6 bg-primary text-white bg-icons'>
          <br />
          <br />
          <div className='imageicon'>
            <img src='logo1.png' alt='logo' id='logo' className='demo_sec' />
            <img src='pen-scale.svg' alt='' />
            <img src='boy.svg' alt='boy' />
            <img src='bulb1.svg' alt='bg-icon-3' />
            <img src='computer-person.svg' alt='bg-icon-8' />
          </div>
          <div className='wrapper-inner mt-5'>
           
            
              
                <form
                  className='bg-white signupForm'
                  style={{
                    maxWidth: '390px',
                    borderRadius: '20px',
                    margin: 'auto',
                    padding: '25px',
                    marginTop: '80px',
                    height:'513px'
                  }}
                >
                  <div className='row'>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <a href ="/LoginPage" className="btn-primary rounded-circle goBack">
                        <img src="arrow-left.svg" alt="go back" />
                      </a>
                      <h4 className="text-secondary text-end">Create <br /> <span className="text-primary">An Account</span></h4>
                    </div>

                    

                    {/* Corporate Name input */}
                    <div className='col-lg-10 mx-auto '>
                      <div className='form-floating mb-3'>
                        <input
                          type='text'
                          className='form-control'
                          id='corporateName'
                          name='corporateName'
                          placeholder=' '
                         
                        />
                        <label htmlFor='corporateName' className='label-with-icon'>
                          <span>
                            <img src='name.svg' alt='Icon' />
                          </span>
                           Corporate Name*
                        </label>
                       
                      </div>
                    </div>

                    {/* Email input */}
                    <div className='col-lg-10 mx-auto'>
                      <div className='form-floating mb-3'>
                        <input
                          type='email'
                          className='form-control'
                          id='email'
                          name='email'
                          placeholder=' '
                         
                        />
                        <label htmlFor='email' className='label-with-icon'>
                          <span>
                            <img src='email.svg' alt='Icon'  />
                          </span>
                           Email*
                        </label>
                        
                      </div>
                    </div>

                    {/* Mobile Number input */}
                    <div className='col-lg-10 mx-auto'>
                      <div className='form-floating mb-3'>
                        <input
                          type='text'
                          className='form-control'
                          id='mobileNumber'
                          name='mobileNumber'
                          placeholder=' '
                         
                        />
                        <label htmlFor='mobileNumber' className='label-with-icon'>
                          <span>
                            <img src='contact.svg' alt='Icon'  />
                          </span>
                           Corporate Mobile No*
                        </label>
                     
                      </div>
                    </div>

                    {/* Location input */}
                    <div className='col-lg-10 mx-auto '>
                      <div className='form-floating mb-3'>
                        <input
                          type='text'
                          className='form-control'
                          id='location'
                          name='location'
                          placeholder=' '
                         
                        />
                        <label htmlFor='location' className='label-with-icon'>
                          <span>
                            <img src='state.svg' alt='Icon'  />
                          </span>
                           Corporate Location*
                        </label>
                        
                      </div>
                    </div>

                    {/* User ID input */}
                    <div className='col-lg-10 mx-auto '>
                      <div className='form-floating mb-3'>
                        <input
                          type='text'
                          className='form-control'
                          id='userId'
                          name='userId'
                          placeholder=' '
                         
                        />
                        <label htmlFor='userId' className='label-with-icon'>
                          <span>
                            <img src='user.svg' alt='Icon'  />
                          </span>
                           Corporate User Id*
                        </label>
                        <ErrorMessage name='userId' component='div' className='error-message' />
                      </div>
                    </div>

                    {/* Password input */}
                    <div className='col-lg-10 mx-auto  '>
                      <div className='form-floating mb-3 '>
                        <input
                          type='password'
                          className='form-control'
                          id='password'
                          name='password'
                          placeholder=' '
                         
                        />
                        <label htmlFor='password' className='label-with-icon '>
                          <span>
                            <img src='password.svg' alt='Icon' className='icon ' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </span>
                           Password*
                        </label>
                        <ErrorMessage name='password' component='div' className='error-message' />
                      </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div class="col-lg-10 mx-auto mt-1">
                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input" id="mytc" name="myctc"/>
                                            <label for="mytc" class="form-label fs-6 text-dark text-lowercase " style={{width: "max-content",fontSize:"2px"}}>
                                                <span style={{fontSize:"13px",color:""}}>I Accept to the </span><a href="#terms-and-condition" class="text-dark text-decoration-underline" style={{fontSize:"13px",color:""}}>Terms &amp; Condition</a>
                                            </label>
                                            <ErrorMessage name='terms' component='div' className='error-message' />
                                        </div>
                                    </div>

                    {/* Submit Button */}
                    <div className='col-lg-10 mx-auto'>
                      <div className='form-floating mb-1'>
                        <button type='submit' className='btn btn-primary text-white rounded-pill w-100'>
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
            
          </div>
        </div>


        <div className='col-lg-6 bg-white bg-icons-right'>
          <h4>
            About <br /> <span className='fw-bold'>Pareekshan</span>
          </h4>
          <div className='imageicon signupFormIcons'>
            <img src='book.svg' alt='book' style={{ position: 'absolute', left: '85%', top: '-5%', width: '120px', height: '120px' }} />
            <img src='star-boy.svg' alt='star-boy' width='50px' height='50px' style={{ position: 'absolute', left: '40%', top: '0%' }} />
            <img src='support.svg' alt='support' style={{ position: 'absolute', left: '-0%', top: '32%', width: '80px', height: '80px' }} />
            <img src='gradutation-cap.svg' className='img-fluid' alt='graduation-cap' style={{ position: 'absolute', left: '0%', top: '70%', width: '120px', height: '120px' }} />
            <img src='puzzle.svg' alt='puzzle' style={{ position: 'absolute', left: '88%', width: '120px', height: '120px' }} />
          </div>

          <div id='carouselExample' className='carousel slide' data-bs-ride='carousel' style={{ width: '400px', margin: 'auto', top: '20%', borderRadius: '24px' }}>
            <div className='carousel-inner'>
              <div className='carousel-item active'>
                <img src='item-1.svg' className='d-block w-100' alt='First slide' />
                <div className='carousel-content text-center'>
                  <h5>First Slide Title</h5>
                  <p>This is some description for the first slide.</p>
                </div>
              </div>
              <div className='carousel-item'>
                <img src='item-2.svg' className='d-block w-100' alt='Second slide' />
                <div className='carousel-content text-center'>
                  <h5>Second Slide Title</h5>
                  <p>This is some description for the second slide.</p>
                </div>
              </div>
              <div className='carousel-item'>
                <img src='item-3.svg' className='d-block w-100' alt='Third slide' />
                <div className='carousel-content text-center'>
                  <h5>Third Slide Title</h5>
                  <p>This is some description for the third slide.</p>
                </div>
              </div>
            </div>

            <div className='carousel-buttons text-center mt-3'>
              <button className='btn btn-primary btn-sm' type='button' data-bs-target='#carouselExample' data-bs-slide='prev'>
                <i className='bi bi-chevron-left text-white fs-6'></i>
              </button>
              &nbsp;&nbsp;&nbsp;
              <button className='btn btn-primary btn-sm' type='button' data-bs-target='#carouselExample' data-bs-slide='next'>
                <i className='bi bi-chevron-right text-white fs-6'></i>
              </button>
            </div>
          </div>
        </div>
      </div>
  
  );
};

export default Signup;
