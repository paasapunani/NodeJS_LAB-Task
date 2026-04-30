const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();

// DB connection
mongoose.connect("mongodb://localhost:27017/labexam");

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));

app.set("view engine", "ejs");

// Routes
app.use("/", require("./routes/authRoutes"));
app.use("/courses", require("./routes/courseRoutes"));

app.listen(3000, () => {
    console.log("Server running on port 3000");
});