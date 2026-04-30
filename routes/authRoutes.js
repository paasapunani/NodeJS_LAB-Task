const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register page
router.get("/register", (req, res) => {
    res.render("register");
});

// Register
router.post("/register", async (req, res) => {
    const hashed = await bcrypt.hash(req.body.password, 10);
    await User.create({
        username: req.body.username,
        password: hashed
    });
    res.redirect("/login");
});

// Login page
router.get("/login", (req, res) => {
    res.render("login");
});

// Login
router.post("/login", async (req, res) => {
    const user = await User.findOne({ username: req.body.username });

    if (user && await bcrypt.compare(req.body.password, user.password)) {
        req.session.user = user;
        res.redirect("/courses");
    } else {
        res.send("Invalid login");
    }
});

// Logout
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});

module.exports = router;