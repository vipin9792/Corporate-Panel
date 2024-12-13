import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateLogo = () => {
  const { corp_id } = useParams();
  const [logo, setLogo] = useState(null);
  const [logoMessage, setLogoMessage] = useState('');
  const [logoPreview, setLogoPreview] = useState(null); // New state for image preview

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      console.log("Selected logo file:", file);

      // Create a preview URL for the selected logo
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result); // Set the preview state to the file's base64 URL
      };
      reader.readAsDataURL(file);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const updateLogo = async () => {
    if (!logo) {
      setLogoMessage('Please select a logo to upload.');
      alert('Please select a logo to upload.');
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
            Authorization: 'Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz', 
          },
        }
      );
      console.log(response); // Check the response here

      if (response.data.code === 1000) {
        setLogoMessage('Logo updated successfully!');
        alert('Logo updated successfully!');
      } else {
        setLogoMessage('Failed to update logo');
        alert('Failed to update logo');
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
      <input
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleLogoChange} 
        style={{ display: 'block', marginTop: '10px'}} // Make sure it's visible
      />
      {logoPreview && (
        <div>
          <h6>Logo Preview:</h6>
          <img src={logoPreview} alt="Logo Preview" style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '10px' }} />
        </div>
      )}
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
