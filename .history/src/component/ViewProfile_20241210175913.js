import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Footer from "./Footer";

const ViewProfile = () => {
  const { corp_id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // State for image preview
  const [imageUrl, setImageUrl] = useState(""); // State for the image URL from the server

  useEffect(() => {
    // Fetch the profile data (including image) on page load
    axios
      .post(
        "http://103.35.121.219:4000/corp/dashboard/fetchProfile",
        {
          corp_id: corp_id,
        },
        {
          headers: {
            Authorization: `Bearer YOUR_TOKEN_HERE`,
          },
        }
      )
      .then((response) => {
        if (response.data.code === 1000) {
          setProfile(response.data.profile);
          // Set the image URL from the server (if available)
          setImageUrl(response.data.profile.logo); // Assuming 'logo' holds the image URL
        } else {
          setError("Profile data not found");
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setError("Error fetching profile data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [corp_id]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a FormData object to send the image file
      const formData = new FormData();
      formData.append("image", file);
      formData.append("corp_id", corp_id); // Send corp_id to associate the image with the profile

      // Upload the image to the server via API
      axios
        .post(
          "http://103.35.121.219:4000/corp/uploadImage", // Replace with the correct API endpoint for image upload
          formData,
          {
            headers: {
              Authorization: `Bearer YOUR_TOKEN_HERE`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          if (response.data.code === 1000) {
            // Image upload successful, update the profile image URL
            setImageUrl(response.data.imageUrl); // Assuming the response contains the image URL
          } else {
            setError("Error uploading image");
          }
        })
        .catch((err) => {
          console.error("Error uploading image:", err);
          setError("Error uploading image");
        });
    }
  };

  if (loading) return <div>Loading...</div>;
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

                                <div className="userEditForm">
                                  <form action="#" id="editUserPicForm">
                                    <input
                                      type="file"
                                      id="editUserPic"
                                      className="form-control-file"
                                      onChange={handleImageChange} // Handle image change
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
                        {/* Remaining content */}
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
