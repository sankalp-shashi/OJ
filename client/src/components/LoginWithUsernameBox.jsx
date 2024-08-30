import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const BACKEND_API_URL = 'http://localhost:5000';

const LoginWithUsernameBox = ({ username, password }) => {
    return (
        <div id = "usernameLoginBox" className = "p-19 justify-center items-center flex flex-col space-y-4">
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
        </div>
    )
}

export default LoginWithUsernameBox;