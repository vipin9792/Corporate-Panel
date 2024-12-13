import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SecureComponent = () => {
    const { corp_id } = useParams(); // Get the URL parameter
    const navigate = useNavigate();
    const [corpData, setCorpData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // Validate and sanitize corp_id
        if (!corp_id || !/^\d+$/.test(corp_id)) {
            setError("Invalid corp_id");
            navigate("/error"); // Redirect to error page if invalid
            return;
        }

        // Fetch data securely (assumes an authenticated request)
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/corp/${corp_id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token for authorization
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Unauthorized or data not found");
                }

                const data = await response.json();
                setCorpData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [corp_id, navigate]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Corporate Data</h1>
            <p>Corp ID: {corpData?.id}</p>
            <p>Corp Name: {corpData?.name}</p>
        </div>
    );
};

export default SecureComponent;
