import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UsernameLoginBox from './UsernameLoginBox';
import { handleError } from '../eventHandlers/errorHandler';
import EmailLoginBox from './EmailLoginBox.jsx';
import RegisterBox from './RegisterBox.jsx';

const BACKEND_API_URL = 'http://localhost:5000';

const LoginBox = () => {
  let navigate = useNavigate();
  
  const passwordRef = useRef(null); // Create a ref for the password input
  const emailRef = useRef(null); // Create a ref for the email input
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showUsernameLoginBox, setShowUsernameLoginBox] = useState(false);
  const [showEmailLoginBox, setShowEmailLoginBox] = useState(false);
  const [showRegisterBox, setShowRegisterBox] = useState(false);

  const onUsernameLoginClick = () => {
    setShowEmailLoginBox(false);
    setShowRegisterBox(false);
    setShowUsernameLoginBox(true);
  };

  const onEmailLoginClick = () => {
    setShowUsernameLoginBox(false);
    setShowRegisterBox(false);
    setShowEmailLoginBox(true);
  };
  
  const onRegisterClick = () => {
    setShowUsernameLoginBox(false);
    setShowEmailLoginBox(false);
    setShowRegisterBox(true);
  };

  const onLoginClick = async () => {
    try {
      const response = await axios.post(BACKEND_API_URL+'/auth/login', {
        username,
        email,
        password,
      });
      console.log(response.data);
      
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      handleError({error, setError});
    }
  };
  
  const onRegisterButtonClick = async (isAdmin) => {
    try {
      const response = await axios.post(BACKEND_API_URL+'/auth/register', {
        username,
        email,
        password,
        isAdmin,
      });
      console.log(response.data);
      navigate('/dashboard');
    }
    catch(error) {
      console.error('Error registering:', error);
      handleError({error, setError});
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
      <button className = "bg-black text-gray-500 hover:underline focus:underline p-6 ml-10 focus:text-white" onClick = {onRegisterClick}> 
      Register
      </button>

     {
      showUsernameLoginBox && <UsernameLoginBox 
      username={username}
      password={password}
      error={error}
      passwordRef={passwordRef}
      setUsername={setUsername}
      setPassword={setPassword}
      onLoginClick={onLoginClick}/>
    }

    {
      showEmailLoginBox && <EmailLoginBox
      email={email}
      password={password}
      error={error}
      passwordRef = {passwordRef}
      setEmail={setEmail}
      setPassword={setPassword}
      onLoginClick={onLoginClick}/>
    }

    {
      showRegisterBox && <RegisterBox
      username={username}
      email={email}
      password={password}
      error={error}
      passwordRef={passwordRef}
      emailRef={emailRef}
      setUsername={setUsername}
      setEmail={setEmail}
      setPassword={setPassword}
      onRegisterButtonClick={onRegisterButtonClick}/>
    }
    </div>
  );
};
export default LoginBox;