const mongoose = require('mongoose');

const PeonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  duty: String,
  shift: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Peon', PeonSchema);
