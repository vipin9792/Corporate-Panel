import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateLogo = () => {
  const { corp_id } = useParams();
  const [logo, setLogo] = useState(null);
  const [logoMessage, setLogoMessage] = useState('');

  // Handle logo file selection
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      console.log("Selected logo file:", file);
    }
  };

  // Convert image to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Update logo
  const updateLogo = async () => {
    if (!logo) {
      setLogoMessage('Please select a logo to upload.');
      alert('Please select a logo to upload.');
      return;
    }

    // Check file size and format before uploading
    const fileSizeLimit = 5 * 1024 * 1024; // 5MB limit
    if (logo.size > fileSizeLimit) {
      setLogoMessage('File size exceeds the 5MB limit.');
      alert('File size exceeds the 5MB limit.');
      return;
    }

    const validFormats = ['image/jpeg', 'image/png'];
    if (!validFormats.includes(logo.type)) {
      setLogoMessage('Invalid file format. Please upload a JPG or PNG image.');
      alert('Invalid file format. Please upload a JPG or PNG image.');
      return;
    }

    try {
      const base64Image = await convertToBase64(logo);
      console.log("Base64 image data:", base64Image);

      const response = await axios.post(
        'http://103.35.121.219:4000/corp/dashboard/updateLogo',
        {
          corp_id: corp_id,
          file: base64Image,
        },
        {
          headers: {
            Authorization: 'Bearer YOUR_AUTH_TOKEN_HERE', // Replace with your token
            'Content-Type': 'application/json', // Ensure correct content type
          },
        }
      );

      // Log response to see what the server returns
      console.log(response);

      if (response.data.code === 1000) {
        setLogoMessage('Logo updated successfully!');
        alert('Logo updated successfully!');
      } else {
        setLogoMessage(response.data.message || 'Failed to update logo');
        alert(response.data.message || 'Failed to update logo');
      }
    } catch (error) {
      console.error('Error updating logo:', error);
      setLogoMessage('An error occurred while updating the logo.');
      alert('An error occurred while updating the logo.');
    }
  };

  return (
    <div className="mt-5">
      <h5>Update Logo</h5>
      {logoMessage && <div className="alert alert-info">{logoMessage}</div>}
      <input
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleLogoChange}
        style={{ display: 'block', marginTop: '10px'}} // Make sure it's visible
      />
      <button
        type="button"
        className="btn btn-primary mt-3"
        onClick={updateLogo}
      >
        Update Logo
      </button>
    </div>
  );
};

export default UpdateLogo;
