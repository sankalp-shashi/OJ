// Database connection configuration
import mongoose from "mongoose";
import dotenv from "dotenv";
// import path from "path";

dotenv.config();

const connection = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    await mongoose.connect(MONGO_URI);
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Error while connecting to the Database: ', error.message);
    process.exit(1);
  }
}

export default connection;