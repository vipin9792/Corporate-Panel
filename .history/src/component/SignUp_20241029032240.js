import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'; // Importing axios

const SignUp = () => {
  const [formData, setFormData] = useState({
    corporateName: '',
    email: '',
    mobileNumber: '',
    corporateLocation: '',
    userId: '',
    password: '',
    mytc: false,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('YOUR_API_ENDPOINT_HERE', formData);
      setSuccess('Registration successful!');
      setError(null);
      console.log('Response:', response.data);
      // Reset the form if needed
      setFormData({
        corporateName: '',
        email: '',
        mobileNumber: '',
        corporateLocation: '',
        userId: '',
        password: '',
        mytc: false,
      });
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
      setSuccess(null);
      console.error('Error:', err);
    }
  };

  return (
    <>
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="corporateName"
            placeholder="Corporate Name"
            value={formData.corporateName}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        <div>
          <input
            type="tel"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        <div>
          <input
            type="text"
            name="corporateLocation"
            placeholder="Corporate Location"
            value={formData.corporateLocation}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        <div>
          <input
            type="text"
            name="userId"
            placeholder="User ID"
            value={formData.userId}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="mytc"
              checked={formData.mytc}
              onChange={handleChange}
              required
            />
            I accept the terms and conditions
          </label>
        </div>
        <button type="submit" style={{ width: '100%', marginTop: '10px' }}>
          Register
        </button>
      </form>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginTop: '10px' }}>{success}</div>}
    </div>
     



           

          <div className="col-lg-6 bg-white bg-icons-right">
            <h4>About <br /> <span className="fw-bold"> Pareekshan</span></h4>
            <div className="imageicon1 signupFormIcons">
              <img src="book.svg" alt="book" />
              <img src="star-boy.svg" alt="star-boy" />
              <img src="support.svg" alt="support" />
              <img src="gradutation-cap.svg" alt="gradutation-cap" />
              <img src="puzzle.svg" alt="puzzle" />
            </div>
            <div className="warapper-form-alert carouselWrapper" style={{ marginTop: "50px" }}>
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
       
      </section>
    </div>
    </>
  );
};

export default SignUp;
