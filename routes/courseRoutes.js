const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// Auth middleware
function isLoggedIn(req, res, next) {
    if (req.session.user) return next();
    res.redirect("/login");
}

// SHOW all courses
router.get("/", isLoggedIn, async (req, res) => {
    const courses = await Course.find();
    res.render("index", { courses });
});

// NEW form
router.get("/new", isLoggedIn, (req, res) => {
    res.render("new");
});

// CREATE
router.post("/", async (req, res) => {
    await Course.create(req.body);
    res.redirect("/courses");
});

// EDIT form
router.get("/:id/edit", async (req, res) => {
    const course = await Course.findById(req.params.id);
    res.render("edit", { course });
});

// UPDATE (courseName cannot change)
router.post("/:id", async (req, res) => {
    const old = await Course.findById(req.params.id);

    await Course.findByIdAndUpdate(req.params.id, {
        courseName: old.courseName, // not change
        duration: req.body.duration,
        fee: req.body.fee
    });

    res.redirect("/courses");
});

// DELETE
router.get("/:id/delete", async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.redirect("/courses");
});

module.exports = router;