import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';

const ConfirmationPage = () => {
    return (
        <div className="confirmation-container text-center mt-5">
            <i className="fas fa-check-circle check-icon" style={checkIconStyle}></i>
            <h1 className="display-4">Thank You!</h1>
            <p className="lead">Your account has been successfully created.</p>
            <hr className="my-4" />
            <p>Click the button below to continue to the homepage.</p>
            <a className="btn btn-success btn-lg" href="index.html" role="button">Go to Homepage</a>
        </div>
    );
};

const checkIconStyle = {
    fontSize: '100px',
    color: '#28a745',
    animation: 'bounce 1s infinite',
};

const styles = {
    container: {
        animation: 'fadeIn 1s ease-in-out',
        maxWidth: '600px',
        margin: 'auto',
        padding: '40px',
        borderRadius: '8px',
        background: 'white',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    },
};

export default ConfirmationPage;

// Add the following CSS to your styles (e.g., App.css)
const globalStyles = `
    body {
        background-color: #f8f9fa;
    }
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
`;

// Append the global styles to the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);
