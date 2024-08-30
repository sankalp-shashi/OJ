import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routers/authRouter.js';
import DBconnection from './database/connect.js';
dotenv.config();

const app = express();
const PORT = 5000;


// Middleware to handle CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

app.use('/auth', authRouter);
app.get('/', (req,res) => {
  res.send('Welcome to the Home Page. Go to /auth to login or register');
});

DBconnection().then(() => {
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })
}).catch((error) => {
  console.error('Could not connect to database:', error);
});