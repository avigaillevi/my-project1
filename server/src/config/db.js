import mongoose from 'mongoose';
const mongouri = process.env.MONGO_URI || "mongodb://localhost:27017/my-project-db";


const connectToDB = async () => {
  try {
    await mongoose.connect(mongouri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};



export default connectToDB;