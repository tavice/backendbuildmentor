const express = require("express");
const router = express.Router();
const Course = require("../models/courses.js");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "build-mentr",
      allowedFormats: ["jpeg", "png", "jpg"],
    },
  });

const upload = multer({ storage: storage });

//Index
router.get("/", (req, res) => {
  Course.find({}, (error, allCourses) => {
    res.json(allCourses);
  });
});

//Create
router.post("/", upload.single("image"), (req, res) => {
  req.body.image = req.file.path;
  req.body.alt = req.file.filename;
  Course.create(req.body, (error, createdCourse) => {
    res.json(createdCourse);
  });
});

//Delete
router.delete("/:id", (req, res) => {
  Course.findByIdAndRemove(req.params.id, (error, deletedCourse) => {
    res.json(deletedCourse);
  });
});

//Update
router.put("/:id", upload.single("image"), (req, res) => {
  req.body.image = req.file.path;
  req.body.alt = req.file.filename;
  Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedCourse) => {
      res.json(updatedCourse);
    }
  );
});

module.exports = router;

