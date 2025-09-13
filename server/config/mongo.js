// import mongoose from 'mongoose';
// import dotenv from 'dotenv'

// dotenv.config()


// let result = await mongoose.connect("mongodb+srv://PingMe:4XccZI2Ewf7EZaGf@chayan.hcdzlqy.mongodb.net");
// console.log(result)




import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {

    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
