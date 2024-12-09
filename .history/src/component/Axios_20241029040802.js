import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        emailId: '',
        phoneNo: '',
        address: '',
        userid: '',
        passwd: '',
        name: ''
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors
        setSuccess(null); // Clear previous success messages

        try {
            const response = await axios.post('YOUR_API_ENDPOINT', formData);
            console.log('Signup successful:', response.data);
            setSuccess('Signup successful!'); // Set success message
        } catch (error) {
            console.error('Error during signup:', error);
            setError('Signup failed. Please try again.'); // Set error message
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Company Name:</label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email ID:</label>
                    <input
                        type="email"
                        name="emailId"
                        value={formData.emailId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone No:</label>
                    <input
                        type="tel"
                        name="phoneNo"
                        value={formData.phoneNo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>User ID:</label>
                    <input
                        type="text"
                        name="userid"
                        value={formData.userid}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="passwd"
                        value={formData.passwd}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default SignupForm;
