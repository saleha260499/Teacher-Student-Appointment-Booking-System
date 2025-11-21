// models/teacher.js
const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    // pic: { type: String, default: "" }, // URL or path to profile picture
    degree: { type: String, required: true },
    about: { type: String, required: true },
    experience: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: Number, required: true },
    password: { type: String, required: true },
    available: { type: Boolean, default: true }
});

module.exports = mongoose.model("Teacher", teacherSchema);
