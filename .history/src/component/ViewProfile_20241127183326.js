import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewProfile = () => {
    const { corp_id } = useParams(); // Retrieving corp_id from URL

    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        // Example API call to fetch profile data using corp_id
        axios.get(`/api/profile/${corp_id}`)
            .then(response => {
                setProfileData(response.data);
            })
            .catch(error => {
                console.error("Error fetching profile data", error);
            });
    }, [corp_id]);

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profile for Corp ID: {corp_id}</h1>
            <div>
                <h2>{profileData.name}</h2>
                <p>{profileData.email}</p>
                <p>{profileData.role}</p>
                {/* Add more profile fields as needed */}
            </div>
        </div>
    );
};

export default ViewProfile;
