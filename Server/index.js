// index.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Appointment = require("./models/appointment");  // path must match your file
const Teacher = require("./models/teacher");
const Student = require("./models/student");

console.log("Appointment model:", Appointment);




const app = express();

// --- Middleware ---
app.use(express.json());
app.use(cors());

// --- MongoDB Connection ---
const MONGO_URI = "mongodb://localhost:27017";

mongoose
    .connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB error:", err));

// --- Routes ---
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    Student.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("success");
                } else {
                    res.json("password incorrect!");
                }
            } else {
                res.json("User doesn't exist");
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json("Server error");
        });
});

app.post("/register", async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/teachers", async (req, res) => {
    try {
        const teacher = await Teacher.create(req.body);
        res.json(teacher);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.get("/allteachers", async (req, res) => {
    try {
        const teachers = await Teacher.find(); // fetch all teacher documents
        res.json(teachers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// ✅ FIXED: using Student model

app.get("/api/user/:email", async (req, res) => {
    try {
        const email = req.params.email; // get from URL param
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(student);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/teacher/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const teacher = await Teacher.findById(id);  // ✅ _id query

        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        res.json(teacher);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
// POST /appointments
// Create appointment (unique by teacher + student + same day)
app.post("/appointments", async (req, res) => {
    try {
        const { teacherId, studentEmail, dateTime, message } = req.body;

        if (!teacherId || !studentEmail || !dateTime) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const date = new Date(dateTime);
        if (isNaN(date)) return res.status(400).json({ message: "Invalid date" });

        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        // Check if teacher already has an appointment at this exact date & time
        const conflict = await Appointment.findOne({
            dateTime: dateTime
        });

        if (conflict) {
            return res.status(400).json({ message: "You have another appointment at same time." });
        }


        // Check existing appointment
        const existing = await Appointment.findOne({
            teacherId,
            studentEmail,
            dateTime: { $gte: startOfDay, $lte: endOfDay }
        });

        if (existing) {
            return res.status(400).json({ message: "You already booked with this teacher today." });
        }
        // Fetch student (optional)
        const student = await Student.findOne({ email: studentEmail });
        console.log(Appointment.findOne); // should log: [Function: findOne]


        // Fetch teacher first
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) return res.status(404).json({ message: "Teacher not found" });

        // Create appointment safely
        const appointment = new Appointment({
            teacherId: teacher._id,             // correct id
            teacherName: teacher.name,          // correct name
            teacherEmail: teacher.email,
            studentEmail,
            studentId: student ? student._id : null,
            studentName: student ? student.name : null,
            dateTime: date,
            message
        });

        console.log(Appointment.findOne); // should log: [Function: findOne]


        await appointment.save();

        res.json({ message: "Appointment booked successfully!", appointment });

    } catch (err) {
        console.error("❌ Error booking appointment:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// GET /appointments?studentEmail=example@mail.com
app.get("/appointments", async (req, res) => {
    try {
        const { studentEmail } = req.query;

        if (!studentEmail) {
            return res.status(400).json({ message: "Missing studentEmail" });
        }

        const appointments = await Appointment.find({ studentEmail }).sort({ dateTime: 1 });
        res.json(appointments);

    } catch (err) {
        console.error("❌ Error fetching appointments:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE /appointments/:id
app.delete("/appointments/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Appointment ID required" });
        }

        const deleted = await Appointment.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.json({ message: "Appointment cancelled successfully!" });

    } catch (err) {
        console.error("❌ Error deleting appointment:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// PUT /appointments/:id
// Reschedule appointment by updating dateTime
app.put("/appointments/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { dateTime } = req.body;

        if (!dateTime) {
            return res.status(400).json({ message: "New dateTime is required" });
        }

        const newDate = new Date(dateTime);
        if (isNaN(newDate.getTime())) {
            return res.status(400).json({ message: "Invalid dateTime format" });
        }

        // Find the current appointment
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        // Check for conflicts: same teacher, same exact hour, excluding current appointment
        const conflict = await Appointment.findOne({
            teacherId: appointment.teacherId,
            dateTime: newDate,
            _id: { $ne: id } // exclude current appointment
        });

        if (conflict) {
            return res.status(400).json({ message: "This time slot is already booked with this teacher." });
        }

        // Update appointment
        appointment.dateTime = newDate;
        await appointment.save();

        res.json({ message: "Appointment rescheduled successfully!", appointment });

    } catch (err) {
        console.error("❌ Error rescheduling appointment:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// GET /viewteacherappointment?teacherEmail=xyz
app.get("/viewteacherappointment", async (req, res) => {
    try {
        const { teacherEmail } = req.query;

        if (!teacherEmail) {
            return res.status(400).json({ message: "Missing teacherEmail" });
        }

        const appointments = await Appointment.find({ teacherEmail }).sort({ dateTime: 1 });

        res.json(appointments);
    } catch (err) {
        console.error("❌ Error fetching appointments:", err);
        res.status(500).json({ message: "Server error" });
    }
});
// PUT /teacher/:email/availability
app.put("/teacher/:email/availability", async (req, res) => {
    try {
        const { available } = req.body;
        const teacher = await Teacher.findOneAndUpdate(
            { email: req.params.email },
            { available },
            { new: true }
        );
        if (!teacher) return res.status(404).json({ message: "Teacher not found" });
        res.json({ message: "Availability updated", teacher });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


// PUT /appointments/:id
app.put("/viewteacherappointment/:id", async (req, res) => {
    const { id } = req.params;
    const { status, dateTime } = req.body;

    try {
        const updateData = {};
        if (status) updateData.status = status;
        if (dateTime) updateData.dateTime = dateTime;

        const updated = await Appointment.findByIdAndUpdate(id, updateData, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Error updating appointment" });
    }
});

// DELETE /appointments/:id
app.delete("/viewteacherappointment/:id", async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: "Appointment cancelled" });
    } catch (err) {
        res.status(500).json({ error: "Error cancelling appointment" });
    }
});

// GET /teachers (Admin: get all teachers)
app.get("/admin/teachers", async (req, res) => {
    try {
        const teachers = await Teacher.find(); // get all teachers
        res.json(teachers);
    } catch (err) {
        console.error("Error fetching teachers:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// GET all students (admin)
app.get("/admin/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


// GET /admin/appointments => return all appointments
app.get("/admin/appointments", async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ dateTime: 1 });
        res.json(appointments);
    } catch (err) {
        console.error("Error fetching all appointments:", err);
        res.status(500).json({ message: "Server error" });
    }
});


// POST /teacher-login
app.post("/teacher-login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const teacher = await Teacher.findOne({ email });

        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        if (teacher.password !== password) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // Login successful
        res.json({
            message: "success",
            teacher: {
                _id: teacher._id,
                name: teacher.name,
                email: teacher.email,
                subject: teacher.subject,
                degree: teacher.degree,
                experience: teacher.experience,
                available: teacher.available
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
// --- Start Server ---
const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
