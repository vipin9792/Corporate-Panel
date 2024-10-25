import React from 'react'
import '../App.css'; 
const SignUp = () => {
  return (
    <div>

<section class="">
        <div class="">
		
		
		
		
		
             <div class="row credential">
                 <div class="col-lg-6 bg-primary text-white bg-icons">
                    <div class="imageicon">
                        <img src="logo1.png" alt="logo" id="logo"/>
                        <img src="pen-scale.svg" alt=""/>
                        <img src="boy.svg" alt="boy"/>
                        <img src="bulb1.svg" alt="bg-icon-3"/>
                        <img src="computer-person.svg" alt="bg-icon-8"/>
                    </div>
			
                     <div class="warapper-form ">
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <a href="index.html" className="btn-primary rounded-circle goBack">
                                <img src="arrow-left.svg" alt="go back"/>
                            </a>
                            <h4 class="text-secondary text-end">Create <br/> <span class="text-primary">An Account</span></h4>
                        </div>
                        <div class="wrapper-inner signupForm overflow-y-scroll overflow-hidden">
                            <form action="index.html" class="bg-white">
                                <div class="row">
								
                                    <div class="col-lg-10 mx-auto">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" required/>
                                            <label for="floatingInput"><span><img src="name.svg" alt=""/></span> Corporate Name</label>
                                        </div>
                                    </div>
                                    <div class="col-lg-10 mx-auto">
                                        <div class="form-floating mb-3 forgot">
                                            <input type="email" class="form-control" id="floatingInput" placeholder="email" required/>
                                            <label for="email"><img src="email.svg" alt="date" class="img-fluid"/> Email*</label>
                                        </div>
                                    </div>
                                    <div class="col-lg-10 mx-auto">
                                        <div class="form-floating mb-3 forgot">
                                            <input type="tel" class="form-control" id="floatingInput" placeholder="tel" required/>
                                            <label for="tel"><img src="contact.svg" alt="date" class="img-fluid"/> Corporate Mobile Number*</label>
                                        </div>
                                    </div>
                                    <div class="col-lg-10 mx-auto">
                                        <div class="form-floating mb-3 pass forgot">
                                            <input type="text" class="form-control" id="floatingInput" placeholder="Uname" required/>
                                            <label for="Uname"><img src="state.svg" alt="user"/> Corporate Location*</label>
                                        </div>
                                    </div>
                                    <div class="col-lg-10 mx-auto">
                                        <div class="form-floating mb-3 pass forgot">
                                            <input type="text" class="form-control" id="floatingInput" placeholder="Uname" required/>
                                            <label for="Uname"><img src="user.svg" alt="user"/> Corporate User ID*</label>
                                        </div>
                                    </div>
                                    <div class="col-lg-10 mx-auto">
                                        <div class="form-floating pass forgot">
                                            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" required/>
                                            <label for="floatingPassword"><img src="password.svg" alt=""/> Password</label>
                                        </div>
                                    </div>
                                    <div class="col-lg-10 mx-auto mt-3">
                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input bg-primary" id="mytc" name="myctc"/>
                                            <label for="mytc" class="form-label fs-6 text-dark">
                                                I Accept to the <a href="#terms-and-condition" class="text-dark">Terms &amp; Condition</a>
                                            </label>
                                        </div>
                                    </div>

                                    <div class="col-lg-10 mx-auto">
                                        <div class="form-floating pass forgot">
                                            <button type="submit" class="btn btn-primary rounded-pill w-100" value="Login">Register</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                     </div>
                 </div>
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
                 <div class="col-lg-6 bg-white bg-icons-right">
                    <h4>About <br/> <span class="fw-bold"> Pareekshan</span></h4>
                     <div class="imageicon1 signupFormIcons">
                         <img src="book.svg" alt="book"/>
                        <img src="star-boy.svg" alt="star-boy"/>
                        <img src="support.svg" alt="support"/>
                        <img src="gradutation-cap.svg" alt="gradutation-cap"/>
                        <img src="puzzle.svg" alt="puzzle"/>
                     </div>


                     <div class="warapper-form-alert carouselWrapper" style={{marginTop:"50px"}}>
                        
                        


                     <div id='carouselExample' className='carousel slide' data-bs-ride='carousel' style={{ width: '400px', margin: 'auto', borderRadius: '24px' }}>
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
             </div>
        </div>
		
		
		
		
		
		
		
		
		
		
		
		
		
     </section>



      
    </div>
  )
}

export default SignUp
