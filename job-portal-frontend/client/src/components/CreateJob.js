import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateJob = () => {
  const [job, setJob] = useState({ title: "", company: "", description: "" });
  const [isLoading, setIsLoading] = useState(false); // To track loading state
  const navigate = useNavigate(); 

  // Handle form input changes
  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!job.title || !job.company || !job.description) {
      alert("Please fill in all fields.");
      return;
    }

    // Get the JWT token from localStorage
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      alert("You must be logged in to create a job.");
      navigate("/login");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      // Make the POST request with the JWT token
      const response = await axios.post(" http://192.168.0.34:5000/jobs", job, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      
      if (response.status === 201) {
        alert("Job Created Successfully!");
        setJob({ title: "", company: "", description: "" }); // Clear form fields
        navigate("/"); // Redirect to job list after successful job creation
      }
    } catch (error) {
      console.error("Error creating job:", error);
      alert("Error creating job. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <h2>Create Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Job Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            placeholder="Job Title"
            value={job.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="company" className="form-label">Company</label>
          <input
            type="text"
            name="company"
            id="company"
            className="form-control"
            placeholder="Company"
            value={job.company}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Job Description</label>
          <textarea
            name="description"
            id="description"
            className="form-control"
            placeholder="Job Description"
            value={job.description}
            onChange={handleChange}
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Job"}
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
