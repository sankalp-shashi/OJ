// This file needs:
/*
    setShowEmailLoginBox
    setShowUsernameLoginBox
    setShowRegisterBox
    BACKEND_API_URL
    navigate
    username email password
    axios
*/
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { handleError } from './errorHandler.js';



export const onUsernameLoginClick = () => {
    setShowEmailLoginBox(false);
    setShowRegisterBox(false);
    setShowUsernameLoginBox(true);
};

export const onEmailLoginClick = () => {
    setShowUsernameLoginBox(false);
    setShowRegisterBox(false);
    setShowEmailLoginBox(true);
};

export const onRegisterClick = () => {
    setShowUsernameLoginBox(false);
    setShowEmailLoginBox(false);
    setShowRegisterBox(true);
};

export const handleRegisterButtonClick = async (isAdmin) => {
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
      handleError(error);
    }
  }

export const onLoginClick = async () => {
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
        handleError(error);
    }
};