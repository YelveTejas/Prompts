import mongoose from "mongoose";
let isConnted = false;

export const connectDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnted) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "prompts",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnted = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
