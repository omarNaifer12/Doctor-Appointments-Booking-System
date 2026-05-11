const mongoose=require("mongoose");
const connectDB = async () => {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/prescripto');
      console.log('MongoDB connected successfully!');
    } catch (error) {
      console.error('MongoDB connection error:', error);
     
    }
  };
  
  module.exports = connectDB;