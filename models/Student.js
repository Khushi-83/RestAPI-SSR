const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    rollNo: {type: String, required: true, unique: true},
    age: {type: Number},
    class: {type: String},
    section: {type: String},
    createdAt: {type: Date, default: Date.now},
});
module.exports = mongoose.model('Student', studentSchema);
