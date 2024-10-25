import React from 'react';

import './ConfirmationPage.css'; 

const ConfirmationPage = () => {
    return (
        <div className="confirmation-container text-center mt-5">
            <i className="fas fa-check-circle check-icon"></i>
            <h1 className="display-4">Thank You!</h1>
            <p className="lead">Your account has been successfully created.</p>
            <hr className="my-4" />
            <p>Click the button below to continue to the homepage.</p>
            <a className="btn btn-success btn-lg" href="index.html" role="button">Go to Homepage</a>
        </div>
    );
};

export default ConfirmationPage;
