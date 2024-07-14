import React, { useState, useRef } from 'react';
import axios from 'axios';
const BACKEND_API_URL = 'http://localhost:5000';

const LoginBox = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccessMessage] = useState('');
  const passwordRef = useRef(null); // Create a ref for the password input
  const [showUsernameLoginBox, setShowUsernameLoginBox] = useState(false);
  const [showEmailLoginBox, setShowEmailLoginBox] = useState(false);
  const [showSignUpBox, setShowSignupBox] = useState(false);

  const onLoginClick = async () => {
    try {
      const response = await axios.post(BACKEND_API_URL+'/login', {
        username,
        email,
        password,
      });
      // Handle response data
      console.log(response.data);
      setError(''); // Clear any previous error
      setSuccessMessage('Login successful'); // Set the success message
    } catch (error) {
      setSuccessMessage(''); // Clear any previous success message
      console.error('Error logging in:', error);
      switch(error.response.status) {
        case 401:
          setError('Invalid login details');
          break;
        case 404:
          setError('The requested resource was not found.');
          break;
        case 500:
          setError('Server error. Please try again later.');
          break;
        default:
          setError('An unexpected error occurred. Please try again.');
      }
      // setError('Login failed. Please try again.'); // Set the error message
    }
  };



  const onUsernameLoginClick = () => {
    setShowEmailLoginBox(false);
    setShowSignupBox(false);
    setShowUsernameLoginBox(true);
  };

  const onEmailLoginClick = () => {
    setShowUsernameLoginBox(false);
    setShowSignupBox(false);
    setShowEmailLoginBox(true);
  };

  const onSignUpClick = () => {
    setShowUsernameLoginBox(false);
    setShowEmailLoginBox(false);
    setShowSignupBox(true);
  };


  const onSignUpUserClick = async () => {
    try {
      const response = await axios.post(BACKEND_API_URL+'/signup/user', {
        username,
        email,
        password,
      });
      console.log(response.data);
      setError('');
      setSuccessMessage('User registered successfully');
    }
    catch(error) {
      setSuccessMessage('');
      console.error('Error signing up as a user:', error);
      switch(error.response.status) {
        case 400:
          setError('A user with this username or email already exists');
          break;
        case 402:
          setError('This username or email is linked to an admin account');
          break;
        case 404:
          setError('The requested resource was not found.');
          break;
        case 500:
          setError('Server error. Please try again later.');
          break;
        default:
          setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  const onSignUpAdminClick = async () => {
    try {
      const response = await axios.post(BACKEND_API_URL+'/signup/admin', {
        username,
        email,
        password,
      });
      console.log(response.data);
      setError('');
      setSuccessMessage('Admin registered successfully');
    }
    catch(error) {
      setSuccessMessage('');
      console.error('Error signing up as an admin:', error);
      switch(error.response.status) {
        case 400:
          setError('An admin with this username or email already exists');
          break;
        case 402:
          setError('This username or email is linked to a user account');
        case 404:
          setError('The requested resource was not found.');
          break;
        case 500:
          setError('Server error. Please try again later.');
          break;
        default:
          setError('An unexpected error occurred. Please try again.');
      }
    }
  };
  // Handlers for keyboard events
  const handleUsernameKeyDown = (e) => {
    if (e.key === 'Enter') {
      passwordRef.current.focus(); // Move focus to the password input using ref
    }
  };

  const handlePasswordKeyDown = (e) => {
    if (e.key === 'Enter') {
      onLoginClick(); // Trigger login on Enter key press
    }
  };


  return (
    <div className="bg-black rounded-lg w-[700px] h-[400px] p-5">
      <button className = "bg-black text-gray-500 hover:underline focus:underline p-7 mr-12 focus:text-white" onClick = {onUsernameLoginClick}> 
      Login with Username
      </button>
      <button className = "bg-black text-gray-500 hover:underline focus:underline p-7 mr-12 focus:text-white" onClick = {onEmailLoginClick}>
      Login with Email
      </button>
      <button className = "bg-black text-gray-500 hover:underline focus:underline p-6 ml-10 focus:text-white" onClick = {onSignUpClick}> 
      Sign Up
      </button>

     {
      showUsernameLoginBox && <div id = "usernameLoginBox" className = "p-19 justify-center items-center flex flex-col space-y-4">
      <input
        type="text"
        className="bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleUsernameKeyDown} // Handle Enter key for username input
      />
      <input
        ref={passwordRef} // Attach ref to the password input
        type="password"
        className="bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handlePasswordKeyDown} // Handle Enter key for password input
      />
      <button
        className="bg-indigo-600 text-white rounded-md px-4 py-2 mt-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        onClick={onLoginClick}
      >
        Login
      </button>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {success && <div className="text-green-500 mt-4">{success}</div>}
    </div>
    }


    {
      showEmailLoginBox && <div id = "EmailLoginBox" className = "p-19 justify-center items-center flex flex-col space-y-4">
      <input
        type="email"
        className="bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleUsernameKeyDown} // Handle Enter key for email input
      />
      <input
        ref={passwordRef} // Attach ref to the password input
        type="password"
        className="bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handlePasswordKeyDown} // Handle Enter key for password input
      />
      <button
        className="bg-indigo-600 text-white rounded-md px-4 py-2 mt-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        onClick={onLoginClick}
      >
        Login
      </button>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {success && <div className="text-green-500 mt-4">{success}</div>}
      </div>
    }


    {
      showSignUpBox && <div id = "signUpBox" className = "p-19 justify-center items-center flex flex-col space-y-4">
      <input
        type="text"
        className="bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleUsernameKeyDown} // Handle Enter key for username input
      />
      <input
        type="email"
        className="bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleUsernameKeyDown} // Handle Enter key for email input
      />
      <input
        ref={passwordRef} // Attach ref to the password input
        type="password"
        className="bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handlePasswordKeyDown} // Handle Enter key for password input
      />
      <div>
        <button
          className="mx-5 bg-indigo-600 text-white rounded-md px-4 py-2 mt-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onClick={onSignUpUserClick}
        >
          Sign Up as a User
        </button>
        <button
          className="ml-5 bg-indigo-600 text-white rounded-md px-4 py-2 mt-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onClick={onSignUpAdminClick}
        >
          Sign Up as an Admin
        </button>
      </div>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {success && <div className="text-green-500 mt-4">{success}</div>}
    </div>
  }
    </div>
  );
};

export default LoginBox;