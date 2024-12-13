import React, { useState } from 'react';
import axios from 'axios';

const UpdateLogo = ({ corp_id }) => {
  const [logo, setLogo] = useState(null); // State to hold the selected logo file
  const [logoMessage, setLogoMessage] = useState(''); // For logo update message

  // Handle logo file input change
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file); // Set the selected logo file
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
      return;
    }

    try {
      const base64Image = await convertToBase64(logo);

      // Send the logo update API request
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/dashboard/updateLogo',
        {
          corp_id: corp_id,
          file: base64Image,
        },
        {
          headers: {
            Authorization: 'Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz', // Replace with your actual Bearer token
          },
        }
      );

      if (response.data.code === 1000) {
        setLogoMessage('Logo updated successfully!');
      } else {
        setLogoMessage('Failed to update logo');
      }
    } catch (error) {
      console.error('Error updating logo:', error);
      setLogoMessage('An error occurred while updating the logo');
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
