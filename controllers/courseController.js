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


// Index
router.get("/", (req, res) => {
    Course.find({})
      .then(allCourses => {
        res.json(allCourses);
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  });

// Create
router.post("/", upload.single("image"), (req, res) => {
    req.body.image = req.file.path;
    req.body.alt = req.file.filename;
    Course.create(req.body)
      .then(createdCourse => {
        res.json(createdCourse);
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  });
  
  // Delete
  router.delete("/:id", (req, res) => {
    Course.findByIdAndRemove(req.params.id)
      .then(deletedCourse => {
        res.json(deletedCourse);
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  });
  
  // Update
  router.put("/:id", upload.single("image"), (req, res) => {
    req.body.image = req.file.path;
    req.body.alt = req.file.filename;
    Course.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedCourse => {
        res.json(updatedCourse);
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  });
  

module.exports = router;

