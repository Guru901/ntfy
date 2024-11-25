import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGO_URI as string);
  } catch (error) {
    console.error(error);
  }
};

export default connectToDb;
