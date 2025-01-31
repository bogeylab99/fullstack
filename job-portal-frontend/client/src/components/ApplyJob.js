import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ApplyJob = () => {
  const { id } = useParams();
  const [studentId, setStudentId] = useState("");

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5000/applications", {
        student_id: studentId,
        job_id: id,
      });
      alert("Application Submitted!");
      setStudentId("");
    } catch (error) {
      console.error("Error applying:", error);
    }
  };

  return (
    <div>
      <h2>Apply for Job</h2>
      <form onSubmit={handleApply}>
        <input
          type="number"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyJob;
