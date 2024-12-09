import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { corpId } = useParams(); // Fetch corpId from URL params
  const history = useHistory();  // To redirect after successful save

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://103.35.121.219:4000/corp/dashboard/fetchProfile/${corpId}`, {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
          },
        });
        if (response.status === 200 && response.data) {
          setProfileData(response.data);
        } else {
          setError("Failed to fetch profile data.");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("An error occurred while fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    if (corpId) {
      fetchProfileData();
    } else {
      setError("No corpId provided.");
      setLoading(false);
    }
  }, [corpId]);

  const handleSubmit = async (values) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.put(
        `http://103.35.121.219:4000/corp/dashboard/updateProfile/${corpId}`,
        values,
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
          },
        }
      );

      if (response.status === 200) {
        alert("Profile updated successfully!");
        history.push(`/view-profile/${corpId}`); // Redirect to the view profile page after saving
      } else {
        setError("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("An error occurred while saving changes.");
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object({
    companyName: Yup.string().required("Company Name is required"),
    emailId: Yup.string().email("Invalid email format").required("Email is required"),
    phoneNo: Yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    userid: Yup.string().required("User ID is required"),
    passwd: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    name: Yup.string().required("Full Name is required"),
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Edit Profile</h2>
      {profileData && (
        <Formik
          initialValues={profileData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur }) => (
            <Form>
              <div>
                <label htmlFor="companyName">Company Name</label>
                <Field
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                />
                <ErrorMessage name="companyName" component="div" />
              </div>

              <div>
                <label htmlFor="emailId">Email</label>
                <Field
                  type="email"
                  name="emailId"
                  placeholder="Email"
                />
                <ErrorMessage name="emailId" component="div" />
              </div>

              <div>
                <label htmlFor="phoneNo">Phone</label>
                <Field
                  type="text"
                  name="phoneNo"
                  placeholder="Phone Number"
                />
                <ErrorMessage name="phoneNo" component="div" />
              </div>

              <div>
                <label htmlFor="address">Address</label>
                <Field
                  type="text"
                  name="address"
                  placeholder="Address"
                />
                <ErrorMessage name="address" component="div" />
              </div>

              <div>
                <label htmlFor="userid">User ID</label>
                <Field
                  type="text"
                  name="userid"
                  placeholder="User ID"
                />
                <ErrorMessage name="userid" component="div" />
              </div>

              <div>
                <label htmlFor="passwd">Password</label>
                <Field
                  type="password"
                  name="passwd"
                  placeholder="Password"
                />
                <ErrorMessage name="passwd" component="div" />
              </div>

              <div>
                <label htmlFor="name">Full Name</label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Full Name"
                />
                <ErrorMessage name="name" component="div" />
              </div>

              <button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default EditProfile;
