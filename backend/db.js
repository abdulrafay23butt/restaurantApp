// db.js
import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect("mongodb+srv://muhammadkhuzaimarahman:t9W6C9cma0W8OXLL@restaurantapp.kgwqazn.mongodb.net/?retryWrites=true&w=majority&appName=restaurantApp");
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default db;
