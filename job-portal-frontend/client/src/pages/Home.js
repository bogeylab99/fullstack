import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Job Portal</h1>
      <Link to="/jobs">View Jobs</Link> | <Link to="/create-job">Create Job</Link>
    </div>
  );
};

export default Home;
