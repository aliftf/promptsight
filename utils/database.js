import mongoose from "mongoose";

let isConnected = false; // This is to check if the connection is already open or not

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('using existing database connection');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'promptsight',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log('mongodb connected');
  } catch (error) {
    console.log('error connecting to database');
    console.log(error);
  }
}