import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ProfileEditPage = () => {
  const { corpId } = useParams(); // Getting corpId from URL parameter
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch profile data when component mounts
    const fetchProfileData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`http://103.35.121.219:4000/corp/dashboard/fetchProfile?corp_id=${corpId}`);
        if (response.data.code === 1000) {
          setProfileData(response.data.profile);
        } else {
          setError("Failed to fetch profile data.");
        }
      } catch (err) {
        setError("Error fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [corpId]);

  // Validation schema for the profile form
  const validationSchema = Yup.object({
    companyName: Yup.string().required("Company Name is required"),
    phoneNo: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    name: Yup.string().required("Full Name is required"),
  });

  // Handle form submission to save changes
  const handleSubmit = async (values) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.put(
        `http://103.35.121.219:4000/corp/dashboard/updateProfile`,
        {
          corp_id: corpId,
          ...values,
        }
      );

      if (response.status === 200) {
        navigate("/profile"); // Navigate to a profile page or show success message
      } else {
        setError("Failed to save profile data.");
      }
    } catch (error) {
      setError("Error saving profile data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profileData) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Edit Profile</h2>
      {profileData && (
        <Formik
          initialValues={{
            companyName: profileData.company_name,
            phoneNo: profileData.phone_no,
            address: profileData.address,
            email: profileData.email,
            name: profileData.name,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur }) => (
            <Form>
              <div>
                <label htmlFor="companyName">Company Name</label>
                <Field
                  type="text"
                  id="companyName"
                  name="companyName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={profileData.company_name}
                />
                <ErrorMessage name="companyName" component="div" className="error-message" />
              </div>

              <div>
                <label htmlFor="phoneNo">Phone Number</label>
                <Field
                  type="tel"
                  id="phoneNo"
                  name="phoneNo"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={profileData.phone_no}
                />
                <ErrorMessage name="phoneNo" component="div" className="error-message" />
              </div>

              <div>
                <label htmlFor="address">Address</label>
                <Field
                  type="text"
                  id="address"
                  name="address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={profileData.address}
                />
                <ErrorMessage name="address" component="div" className="error-message" />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={profileData.email}
                />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>

              <div>
                <label htmlFor="name">Full Name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={profileData.name}
                />
                <ErrorMessage name="name" component="div" className="error-message" />
              </div>

              <div>
                <button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default ProfileEditPage;
