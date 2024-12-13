import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Footer from "./Footer";

const ViewProfile = () => {
  const { corp_id } = useParams(); // Get the corp_id from URL params
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // To handle any errors
  const [selectedImage, setSelectedImage] = useState(null); // State for image preview
  const [imageUrl, setImageUrl] = useState(""); // To store the image URL from API

  // Fetch profile data when the component mounts
  useEffect(() => {
    axios
      .post(
        "http://103.35.121.219:4000/corp/dashboard/fetchProfile", // Endpoint to fetch the profile
        {
          corp_id: corp_id, // Pass the corp_id to fetch specific profile
        },
        {
          headers: {
            Authorization: `Bearer YOUR_TOKEN_HERE`, // Replace with actual token
          },
        }
      )
      .then((response) => {
        if (response.data.code === 1000) {
          setProfile(response.data.profile);
          setImageUrl(response.data.profile.logo); // Assuming logo is part of the profile data
        } else {
          setError("Profile data not found");
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setError("Error fetching profile data");
      })
      .finally(() => {
        setLoading(false); // Set loading to false after data is fetched
      });
  }, [corp_id]);

  // Handle image change (when a user selects a new image)
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Preview the selected image immediately
      uploadImage(file); // Call the function to upload the image
    }
  };

  // Function to upload the image to the server
  const uploadImage = (file) => {
    const formData = new FormData();
    formData.append("image", file); // Append the image to the form data
    formData.append("corp_id", corp_id); // Append the corp_id to associate the image with the profile

    axios
      .post(
        "http://103.35.121.219:4000/corp/dashboard/updateLogo", // Endpoint to upload the image
        formData,
        {
          headers: {
            Authorization: `Bearer YOUR_TOKEN_HERE`, // Replace with actual token
            "Content-Type": "multipart/form-data", // Ensure this is set to handle file uploads
          },
        }
      )
      .then((response) => {
        if (response.data.code === 1000) {
          setImageUrl(response.data.imageUrl); // Assuming the server returns the image URL
        } else {
          setError("Error uploading image");
        }
      })
      .catch((err) => {
        console.error("Error uploading image:", err);
        setError("Error uploading image");
      });
  };

  // If loading, show loading state
  if (loading) return <div>Loading...</div>;

  // If there's an error, display it
  if (error) return <div>{error}</div>;

  return (
    <div>
      {profile ? (
        <div className="d-flex flex-column min-vh-100 position-relative">
          <div className="container mt-1">
            <div className="row">
              <div className="container-fluid h-85vh">
                <div className="content-wrapper h-100">
                  <div className="position-relative h-100 skyblue rounded p-3 mt-3">
                    <div className="hackthonProfile overflow-auto pe-2 h-100">
                      <div className="bg-white">
                        <div className="row m-1">
                          <div className="col-lg-12 d-flex justify-content-between align-items-start rounded p-3">
                            <div className="w-max">
                              <div className="userEditWrapper">
                                {/* Image preview */}
                                <img
                                  src={selectedImage || imageUrl || "defaultImagePath"} // Display the selected image or fetched image from API
                                  alt="Company Logo"
                                  style={{
                                    width: "200px",
                                    height: "80px",
                                    objectFit: "cover",
                                    borderRadius: "12px",
                                  }}
                                />

                                {/* Image upload form */}
                                <div className="userEditForm">
                                  <form action="#" id="editUserPicForm">
                                    <input
                                      type="file"
                                      id="editUserPic"
                                      className="form-control-file"
                                      onChange={handleImageChange} // Trigger the image change handler
                                    />
                                  </form>
                                </div>
                              </div>
                            </div>

                            <Link
                              to={`/EditProfile1/${corp_id}`}
                              className="btn btn-primary m-0 rounded-pill text-white"
                            >
                              <img src="../edit.svg" alt="edit" /> Edit
                            </Link>
                          </div>
                        </div>
                        {/* Additional profile content */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  );
};

export default ViewProfile;
