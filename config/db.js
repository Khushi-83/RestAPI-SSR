const mongoose = require('mongoose');
require('dotenv').config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected to Atlas");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = { connect };
