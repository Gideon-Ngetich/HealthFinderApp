const express = require("express");
const router = express.Router();
const { Facility } = require("../models/facility.model");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Add facility route
router.post("/register-facility", async (req, res) => {
  try {
    const {
      facilityName,
      email,
      password,
      address,
      longitude,
      latitude,
      services,
      contacts,
      working_hours,
      medical_covers,
      images,
      category,
      description,
    } = req.body;

    if (!facilityName || !longitude || !latitude || !address || !contacts) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const verifyEmail = await Facility.findOne({ email });

    if (verifyEmail) {
      return res.status(400).json("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const facility = new Facility({
      facilityName,
      email,
      password: hashedPassword,
      address,
      location: { type: "Point", coordinates: [longitude, latitude] },
      services,
      contacts,
      working_hours,
      medical_covers,
      images,
      category,
      description,
    });

    await facility.save();

    res.status(201).json("Facility added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
});

// Upload logo
router.post("/:id/upload-logo", upload.single("logo"), async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json("Facility not found");
    }

    facility.logo = req.file.path; // Save the file path to the logo field
    await facility.save();

    res.status(200).json({ message: "Logo uploaded successfully", logo: req.file.path });
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
});

// Upload facility images
router.post("/:id/upload-images", upload.array("images", 5), async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json("Facility not found");
    }

    const imagePaths = req.files.map((file) => file.path); // Save file paths to the images array
    facility.images = [...facility.images, ...imagePaths];
    await facility.save();

    res.status(200).json({ message: "Images uploaded successfully", images: imagePaths });
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
});

module.exports = router;