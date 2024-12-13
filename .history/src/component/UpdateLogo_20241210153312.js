import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // To get `corp_id` from the URL
import axios from 'axios';

const UpdateLogo = () => {
  const { corp_id } = useParams(); // Extract `corp_id` from URL params
  const [logo, setLogo] = useState(null); // State to hold the selected logo file
  const [logoMessage, setLogoMessage] = useState('');

  // Handle logo file input change
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      console.log("Selected logo file:", file); // Debugging log
    }
  };

  // Convert image to base64 format
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle logo update
  const updateLogo = async () => {
    if (!logo) {
      setLogoMessage('Please select a logo to upload.');
      alert('Please select a logo to upload.');
      return;
    }

    try {
      const base64Image = await convertToBase64(logo);
      console.log("Base64 image data:", base64Image); // Debugging log

      const response = await axios.post(
        'http://103.35.121.219:4000/corp/dashboard/updateLogo',
        {
          corp_id: corp_id, // Using the extracted `corp_id` from URL
          file: base64Image,
        },
        {
          headers: {
            Authorization: 'Bearer your-token', // Replace with actual token
          },
        }
      );

      if (response.data.code === 1000) {
        setLogoMessage('Logo updated successfully!');
        alert('Logo updated successfully!');
        console.log("Logo updated successfully!");
      } else {
        setLogoMessage('Failed to update logo');
        alert('Failed to update logo');
        console.log("Failed to update logo");
      }
    } catch (error) {
      console.error('Error updating logo:', error);
      setLogoMessage('An error occurred while updating the logo');
      alert('An error occurred while updating the logo');
    }
  };

  return (
    <div className="mt-5">
      <h5>Update Logo</h5>
      {logoMessage && <div className="alert alert-info">{logoMessage}</div>}
      
      {/* Input field to select the logo */}
      <input
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleLogoChange} // Handle file selection
      />
      
      {/* Button to trigger logo update */}
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
