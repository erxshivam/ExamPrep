const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_CONNECT)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.error("MongoDB Connection Error:");
    console.error(err);
});

// Routes
app.use("/api/examinee", require("./routes/examineeRoute"));
app.use("/api/admin", require("./routes/adminRoute"));
app.use("/api/session", require("./routes/sessionRoute"));
app.use("/api/subject", require("./routes/subjectRoute"));
app.use("/api/question", require("./routes/questionRoute"));
app.use("/api/exams", require("./routes/examinationRoute"));
app.use("/api/message", require("./routes/messageRoute"));
app.use("/api/dashboard", require("./routes/dashboardRoute"));

// Default Route
app.get("/", (req, res) => {
    res.send("API Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});