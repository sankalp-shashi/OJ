/*
This file needs
    passwordRef
    onLoginClick
*/

import { passwordRef } from '../refs.jsx';
import React from 'react';
import { onLoginClick } from './onClick.js';

export const handleUsernameKeyDown = (e) => {
    if (e.key === 'Enter') {
        passwordRef.current.focus(); // Move focus to the password input using ref
    }
};
  
export const handlePasswordKeyDown = (e) => {
    if (e.key === 'Enter') {
        onLoginClick(); // Trigger login on Enter key press
    }
};