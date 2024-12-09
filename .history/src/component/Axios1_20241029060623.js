// src/Auth.js
import React, { useState } from 'react';


const Axios = () => {
    const [isLogin, setIsLogin] = useState(true);
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
        const apiUrl = isLogin
            ? 'http://103.35.121.219:4000/corp/login'
            : 'http://103.35.121.219:4000/corp/register';

        try {
            const response = await axios.post(apiUrl, {
                username: formData.username,
                password: formData.password,
                ...(isLogin ? {} : { email: formData.email }), // Add email only for registration
            });
            console.log(response.data);
            // Handle success (e.g., save token, redirect, etc.)
        } catch (error) {
            console.error('Error during API call:', error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
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
                {!isLogin && (
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
                )}
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                <button type="button" onClick={() => setIsLogin(!isLogin)}>
                    Switch to {isLogin ? 'Register' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Axios;
