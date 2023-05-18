const mongoose = require("mongoose");

const DB = "mongodb+srv://bharatahuja:skillvalley@cluster0.atz7e6q.mongodb.net/?retryWrites=true&w=majority";


async function connectDB() {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1); 
  }
}
module.exports = connectDB;
