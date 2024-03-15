import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs'; // Import eye icons from Bootstrap Icons

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.email.trim() === '' || values.password.trim() === '') {
      alert('Please fill in both email and password fields.');
      return;
    }

    if (!isChecked) {
      alert('Please agree to the terms & conditions.');
      return;
    }

    if (!isPasswordStrong(values.password)) {
      setErrorMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    } else {
      setErrorMessage(''); // Clear error message if password is strong
    }

    axios.post('http://localhost:3000/auth/adminlogin', values)
      .then(result => {
        navigate('/dashboard');
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Function to check password strength
  const isPasswordStrong = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
      <div className='p-5 rounded w-25 border loginForm'>
        <h2><center>Welcome To The Login Page</center></h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'><strong>Email:</strong></label>
            <input type="email" name='email' autoComplete='off' placeholder='Enter Your Email'
              onChange={(e) => setValues({ ...values, email: e.target.value })} className='form-control rounded-4' />
          </div>

          <div className='mab-3 position-relative'>
            <label htmlFor='password'><strong>Password:</strong></label>
            <input type={showPassword ? "text" : "password"} name='password' placeholder='Enter Your Password'
              value={values.password}
              onChange={(e) => setValues({ ...values, password: e.target.value })} className='form-control rounded-4' />
            {/* Toggle password visibility icon */}
            <div className="toggle-password-icon position-absolute top-50 end-0 translate-middle-y" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <BsEyeSlash className="eye-icon" /> : <BsEye className="eye-icon" />}
            </div>
          </div>

          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <br></br>

          <button className='btn btn-success w-100 rounded-4 mb-2'>Log In</button>

          <br></br>
          <br></br>

          <div className='mb-1'>
            <center>
              <input type="checkbox" name="tick" id="tick" onChange={() => setIsChecked(!isChecked)} />
              You agree with terms & conditions
            </center>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
