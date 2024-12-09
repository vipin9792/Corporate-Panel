
import React, { useState } from 'react';
import axios from 'axios';

const Regis= () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://103.35.121.219:4000/corp/register', {
                username: formData.username,
                password: formData.password,
                email: formData.email,
            });
            console.log(response.data);
            // Handle successful registration (e.g., redirect to login)
        } catch (error) {
            console.error('Registration error:', error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Register</button>
                <p>
                    Already have an account? <a href="/">Login here</a>
                </p>
            </form>
        </div>
    );
};

export default Axios1;