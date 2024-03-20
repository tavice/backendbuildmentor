const express = require("express");
const router = express.Router();
const Testimony = require("../models/testimonies.js");
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
  Testimony.find({}, (error, allTestimonies) => {
    res.json(allTestimonies);
  });
});

//Create
router.post("/", upload.single("image"), (req, res) => {
  req.body.image = req.file.path;
  req.body.alt = req.file.filename;
  Testimony.create(req.body, (error, createdTestimony) => {
    res.json(createdTestimony);
  });
});

//Delete
router.delete("/:id", (req, res) => {
  Testimony.findByIdAndRemove(req.params.id, (error, deletedTestimony) => {
    res.json(deletedTestimony);
  });
});

//Update
router.put("/:id", upload.single("image"), (req, res) => {
  req.body.image = req.file.path;
  req.body.alt = req.file.filename;
  Testimony.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedTestimony) => {
      res.json(updatedTestimony);
    }
  );
});

module.exports = router;
