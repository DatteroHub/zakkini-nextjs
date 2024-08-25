import mongoose, { Connection } from "mongoose";

const MONGO_URI = process.env.MONGO_DATTERO_URI!;
const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // millisec
let currentConnection: Connection | null = null;

const connectDB = async (retries = 0) => {
  try {
    if (currentConnection && currentConnection.readyState >= 1) {
      // If already connected, return existing connection
      return currentConnection;
    }

    // create new connection
    currentConnection = await mongoose.createConnection(MONGO_URI).asPromise();
    console.log("MongoDB connected successfully");
    return currentConnection;
  } catch (error: any) {
    console.error(`DB Error: ${error.message}`);

    // Connection error, check and retry
    if (retries < MAX_RETRIES) {
      console.log(`Retrying connection... (${retries + 1}/${MAX_RETRIES})`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      await connectDB(retries + 1);
    } else {
      console.error("Max retries reached. Exiting process.");
      process.exit(1); // Terminate the process
    }
  }
};

export default connectDB;
