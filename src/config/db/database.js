const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "smart_inventory",
    });
    console.log("MongoDB connection successful ✅");
  } catch (error) {
    console.log("MongoDB connection error:", error.message);
  }
};

module.exports = connectDb;