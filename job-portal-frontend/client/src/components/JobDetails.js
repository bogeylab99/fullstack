import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);  // Track loading state

  useEffect(() => {
    // Fetch job details from the API
    axios
      .get(`http://127.0.0.1:5000/jobs/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }  // Add JWT token
      })
      .then((response) => {
        setJob(response.data);
        setError(null);  // Reset error if request is successful
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
        setError("Error fetching job details. Please try again later.");
        setJob(null);  // Optionally reset job state on error
      })
      .finally(() => setIsLoading(false));  // Stop loading once the request finishes
  }, [id]);

  return (
    <div>
      <h2>Job Details</h2>
      {/* Show a loading spinner while fetching data */}
      {isLoading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : error ? (
        <p className="text-danger">{error}</p>  // Display error message if there's an issue
      ) : (
        job && (
          <div>
            <h3>{job.title}</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Description:</strong> {job.description}</p>
            {/* Add more job details here */}
          </div>
        )
      )}
    </div>
  );
};

export default JobDetails;
