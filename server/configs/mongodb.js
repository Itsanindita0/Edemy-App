import mongoose from "mongoose";

// connect to the MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/lms`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.on("connected", () => {
      console.log("✅ Database Connected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
