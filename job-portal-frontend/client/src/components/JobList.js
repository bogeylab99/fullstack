import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch jobs from the backend
    axios
      .get("http://127.0.0.1:5000/jobs")
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

  const handleDeleteJob = (id) => {
    // Send DELETE request to backend
    axios
      .delete(`http://127.0.0.1:5000/jobs/${id}`)
      .then((response) => {
        alert("Job deleted successfully!");
        setJobs(jobs.filter((job) => job.id !== id)); // Remove job from state
      })
      .catch((error) => {
        console.error("Error deleting job:", error);
      });
  };

  return (
    <div>
      <h2>Job List</h2>
      <Link to="/create-job">
        <button>Create New Job</button>
      </Link>

      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.description}</p>
            <Link to={`/job/${job.id}`}>View Details</Link> | 
            <Link to={`/apply-job/${job.id}`}> Apply</Link>
            <button onClick={() => handleDeleteJob(job.id)}>Delete Job</button> {/* Delete button */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
