import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.css';



const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    // Check if the user is already logged in
    const username = localStorage.getItem('username');
    if (username) {
      navigate(`/Welcome?name=${username}`);
    }
  }, [navigate]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const data = new FormData(form);

    const spinner = document.getElementById('loading-spinner');
    const spinners = document.getElementById('loading-spinners');
    spinner.style.display = 'block';
    spinners.style.display = 'block';

    fetch("https://script.google.com/macros/s/AKfycbzoASWgBHMhk9kxEWjsQ36pu21D1g5oX0vpL8X5EGyACJhNuwid54Zr_cGMGt0alp5FCw/exec", {
      method: "POST",
      body: data
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      if (json.success) {
        localStorage.setItem('username', json.name);
        localStorage.setItem('email', json.email);
        navigate(`/Welcome?name=${json.name}`);
      } else {
        
        document.getElementById("error-message").innerHTML = json.message;
        document.getElementById("error-message").classList.remove("hidden");
        setTimeout(() => {
            document.getElementById("error-message").classList.add("hidden");
        }, 3000);
      }
      form.reset();
      setLoading(false);
      spinner.style.display = 'none';
      spinners.style.display = 'none';
    })
    .catch(error => {
      console.error(error);
      setLoading(false);
      spinner.style.display = 'none';
      spinners.style.display = 'none';
    });
  };

  const togglePasswordVisibility = () =>{
    setShowPassword(!showPassword);
  };



  return (
    <div>
      <style>
        {`
          #loading-spinner {
            display: block;
            position: fixed;
            z-index: 8888;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.678);
          }

          #loading-spinner:before {
            content: '';
            display: block;
            position: absolute;
            left: 50%;
            top: 50%;
            width: 70px;
            height: 70px;
            margin: -30px 0 0 -30px;
            border-radius: 50%;
            border: 10px solid #ffffff00;
            border-top-color: #008cf0;
            border-bottom-color: #0088f0;
            animation: spin 2s linear infinite;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          #loading-spinners {
            display: block;
            position: fixed;
            z-index: 8888;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(253, 253, 253, 0);
          }

          #loading-spinners:before {
            content: '';
            display: block;
            position: absolute;
            left: 50%;
            top: 50%;
            width: 50px;
            height: 50px;
            margin: -20px 0 0 -20px;
            border-radius: 50%;
            border: 10px solid #ffffff00;
            border-top-color: #008cf0;
            border-bottom-color: #0088f0;
            animation: spins 2s linear infinite;
          }

          @keyframes spins {
            to {
              transform: rotate(-360deg);
            }
          }

          #loading-spinner h1 {
            z-index: 9999;
            position: relative;
            left: 49%;
            top: 49%;
            font-size: 15px;
            font-weight: 700;
            color: #000;
          }
        `}
      </style>
      <div id="error-message" className="message hidden error-message"><FontAwesomeIcon icon={faTimes} /> <span id="error-message-text"></span></div>
      <div id="success-message" className="message hidden success-message"> <FontAwesomeIcon icon={faCheck} /> Your message has been sent. Thank you!</div>
      <div id="loading-spinner" style={{ display: 'none' }}></div>
      <div id="loading-spinners" style={{ display: 'none' }}></div>
      <div className="login-container">
      <form id="login-form" onSubmit={handleFormSubmit} className="login-form">
        <h1>Login</h1>
        <input type="email" name="email" placeholder="Email Id" required />
        <div className="password-container">
          <input type={showPassword ? "text" : "password"}  name="password"  placeholder="Password" required />
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility} className="password-toggle-icon" />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p><Link to="/Register">Don't You Have An Account</Link></p>
        <p><Link to="/ForgotPassword">ForgotPassword</Link></p>
      </form>
    
    </div>
     
    </div>
  );
};

export default Login;
