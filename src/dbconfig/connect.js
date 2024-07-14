import mongoose from "mongoose";

export default async function connect() {
  try {
    const conncetion = await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
