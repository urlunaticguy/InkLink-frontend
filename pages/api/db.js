import mongoose from "mongoose";

const DB = "mongodb+srv://bharatahuja:skillvalley@cluster0.atz7e6q.mongodb.net/?retryWrites=true&w=majority";


async function connectDB() {
  try {
    // Connect to MongoDB using the URL and database name
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1); // Exit with failure
  }
}

export default connectDB;
