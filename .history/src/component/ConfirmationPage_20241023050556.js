import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './ConfirmationPage.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const ConfirmationPage = () => {
    return (
        
        <div className="confirmation-container text-center mt-5 ">
            <FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
            <h1 className="display-4">Thank You!</h1>
            <p className="lead">Your account has been successfully created.</p>
            <hr className="my-4" />
            <p>Click the button below to continue to the homepage.</p>
            <Link to= className="btn btn-success btn-lg" role="button">Go to Homepage</Li>
        </div>
   
    );
};

export default ConfirmationPage;
