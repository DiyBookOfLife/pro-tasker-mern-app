import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // connect to MongoDB using my connection string from .env
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected!"); // confirms DB is connected
  } catch (err) {
    console.log(err);
    process.exit(1); // stop server if DB fails (app can't run without it)
  }
};

export default connectDB;
