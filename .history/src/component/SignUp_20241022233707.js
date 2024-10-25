import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; // Ensure your CSS file is properly set up


const Signup = () => {
  
  return (
    

      <div className='row credential'>


       





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
