import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use react-router for navigation

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); 

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      const { access_token } = response.data;
      
      // Store the token in localStorage
      localStorage.setItem('access_token', access_token);
      
      // Update token in the parent component's state
      setToken(access_token);
      
      navigate('/');
    } catch (err) {
      setError('Invalid credentials, please try again.');
      console.error(err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      {/* Error message */}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default Login;
