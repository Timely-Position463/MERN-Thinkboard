import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully Connected to DB");
  } catch (error) {
    console.error("Error connecting DB", error);
  }
};