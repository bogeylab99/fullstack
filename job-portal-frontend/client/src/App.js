import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import JobList from "./components/JobList";
import JobDetails from "./components/JobDetails";
import CreateJob from "./components/CreateJob";
import ApplyJob from "./components/ApplyJob";
import Login from "./components/Login";
import RegisterForm from "./components/RegisterForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem("access_token") || "");

  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Hustle Kenya</Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Jobs</Link>
                </li>
                {token ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/create-job">Post a Job</Link>
                    </li>
                    <li className="nav-item">
                      <LogoutButton setToken={setToken} />
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link btn btn-outline-primary" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link btn btn-outline-success" to="/register">Register</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <div className="job-list">
          <Routes>
            <Route path="/" element={<JobList />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/create-job" element={<CreateJob />} />
            <Route path="/apply-job/:id" element={<ApplyJob />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="text-center mt-4 p-3 bg-dark text-light">
          <p>&copy; {new Date().getFullYear()} Hustle Kenya</p>
        </footer>
      </div>
    </Router>
  );
}

const LogoutButton = ({ setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setToken("");
    navigate("/login");  
  };

  return (
    <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
  );
}

export default App;
