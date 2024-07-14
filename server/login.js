import express from 'express';
import cors from 'cors';
import fs, { read } from 'fs';
import path from 'path';
const app = express();
const PORT = 5000;

// Middleware to handle CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

const usersFilePath = 'clientDetails/users.json';
const adminsFilePath = 'clientDetails/admins.json';

const readUsers = () => {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data).users;
  };

  const readAdmins = () => {
    const data = fs.readFileSync(adminsFilePath, 'utf8');
    return JSON.parse(data).admins;
  };


// Function to write users to the JSON file
const writeUsers = (users) => {
    const data = JSON.stringify({ users }, null, 2);
    fs.writeFileSync(usersFilePath, data, 'utf8');
  };

  const writeAdmins = (admins) => {
    const data = JSON.stringify({ admins }, null, 2);
    fs.writeFileSync(adminsFilePath, data, 'utf8');
  };


// Login route
app.post('/login', (req, res) => {
  const { username, email, password } = req.body;
  const users = readUsers();
  const admins = readAdmins();

  // Simple authentication check
  
  const user = users.find((u) => ((u.username === username || u.email === email) && u.password === password));
  const admin = admins.find((u) => ((u.username === username || u.email === email) && u.password === password));
  if (user || admin) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid login details' });
  }
});


// Sign Up as User route
app.post('/signup/user', (req, res) => {
    const { username, email, password } = req.body;
    const users = readUsers();
    const admins = readAdmins();
    const adminExists = admins.some((a) => (a.username === username || a.email === email));
    const userExists = users.some((u) => (u.username === username || u.email === email));

    if (userExists) {
        res.status(400).json({ message: 'A user with this username or email already exists'});
    } else if (adminExists) {
        res.status(402).json({ message: 'This username or email is linked to an admin account'})
    } else {
        users.push({ username, email, password });
        writeUsers(users);
        res.status(201).json({ message: 'User registered successfully' });
    }

});

// Sign Up as Admin route
app.post('/signup/admin', (req, res) => {
    const { username, email, password } = req.body;
    const users = readUsers();
    const admins = readAdmins();
    const userExists = users.some((u) => (u.username === username || u.email === email));
    const adminExists = admins.some((a) => (a.username === username || a.email === email));

    if (adminExists) {
        res.status(400).json({ message: 'An admin with this username or email already exists'});
    } else if (userExists) {
        res.status(402).json({ message: 'This username or email is  linked to a user account'})
    }
    else {
        admins.push({ username, email, password });
        writeAdmins(admins);
        res.status(201).json({ message: 'Admin registered successfully' });
    }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// import express from 'express';
// const app = express();
// const PORT = 5000;

// app.use(express.json());

// const user = {
//     username: 'testuser',
//     password: 'testpassword'
//   };
  
//   // Routes
//   app.post('/login', (req, res) => {
//     const { username, password } = req.body;
  
//     // Simple authentication check
//     if (username === user.username && password === user.password) {
//       res.status(200).json({ message: 'Login successful' });
//     } else {
//       res.status(401).json({ message: 'Invalid login details' });
//     }
//   });
  
//   app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//   });