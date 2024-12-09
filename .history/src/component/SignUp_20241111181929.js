import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Dummy slider data (Simulated API)
const dummySliderData = [
  {
    photo_url: 'https://via.placeholder.com/400x300?text=Slide+1',
    title: 'Welcome to Our Service',
    description: 'We provide the best service for your needs.',
  },
  {
    photo_url: 'https://via.placeholder.com/400x300?text=Slide+2',
    title: 'Great Offers Await You!',
    description: 'Check out our special offers and discounts.',
  },
];

const App = () => {
  const [sliderData, setSliderData] = useState([]);
  const [formSubmissionStatus, setFormSubmissionStatus] = useState(null);

  // Simulating GET API call (Fetch slider data)
  useEffect(() => {
    setSliderData(dummySliderData);  // Simulating GET request with static data
  }, []);

  // Formik initial values and validation schema
  const initialValues = {
    corporateName: '',
    email: '',
    mobileNumber: '',
    corporateLocation: '',
    userId: '',
    password: '',
    mytc: false,
  };

  const validationSchema = Yup.object({
    corporateName: Yup.string().required('Corporate Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    mobileNumber: Yup.string().required('Mobile Number is required'),
    corporateLocation: Yup.string().required('Corporate Location is required'),
    userId: Yup.string().required('User ID is required'),
    password: Yup.string().required('Password is required'),
    mytc: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  });

  // Simulate the form submission (POST API)
  const handleSubmit = (values) => {
    console.log('Form data:', values);
    // Simulate a POST request (No actual backend)
    setFormSubmissionStatus('Form submitted successfully!');
  };

  return (
    <div>
      <h1>Sign Up</h1>

      {/* Formik Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <Field type="text" name="corporateName" placeholder="Corporate Name" />
            <ErrorMessage name="corporateName" component="div" />
          </div>
          <div>
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <Field type="text" name="mobileNumber" placeholder="Mobile Number" />
            <ErrorMessage name="mobileNumber" component="div" />
          </div>
          <div>
            <Field type="text" name="corporateLocation" placeholder="Corporate Location" />
            <ErrorMessage name="corporateLocation" component="div" />
          </div>
          <div>
            <Field type="text" name="userId" placeholder="User ID" />
            <ErrorMessage name="userId" component="div" />
          </div>
          <div>
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <div>
            <Field type="checkbox" name="mytc" />
            <label>I accept the terms and conditions</label>
            <ErrorMessage name="mytc" component="div" />
          </div>
          <div>
            <button type="submit">Register</button>
          </div>
        </Form>
      </Formik>

      {formSubmissionStatus && <div>{formSubmissionStatus}</div>}

      <h2>Slider</h2>

      {/* Simulate GET request to fetch slider data */}
      {sliderData.length === 0 ? (
        <p>Loading slider data...</p>
      ) : (
        <div>
          {sliderData.map((slide, index) => (
            <div key={index}>
              <img src={slide.photo_url} alt={`Slide ${index + 1}`} />
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
