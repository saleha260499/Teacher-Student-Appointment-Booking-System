const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "teachers", required: true },
    teacherName: { type: String, required: true },
    teacherEmail: { type: String, required: true },
    studentEmail: { type: String, required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "students" },
    studentName: { type: String },
    dateTime: { type: Date, required: true },
    status: { type: String, default: "Pending.." },
    message: { type: String }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
