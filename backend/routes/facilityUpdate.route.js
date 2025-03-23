const router = require("express").Router();
const { Facility } = require("../models/facility.model");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
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

router.put("/", upload.fields([{ name: "logo", maxCount: 1 }, { name: "images", maxCount: 5 }]), async (req, res) => {
  const { id } = req.query;
  console.log(id);

  // Validate the ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid facility ID" });
  }

  const updates = req.body;

  // Parse complex fields from form data
  if (updates.services) {
    updates.services = JSON.parse(updates.services);
  }
  if (updates.working_hours) {
    updates.working_hours = JSON.parse(updates.working_hours);
  }
  if (updates.medical_covers) {
    updates.medical_covers = JSON.parse(updates.medical_covers);
  }

  // Validate updates object
  const allowedUpdates = [
    "facilityName",
    "email",
    "password",
    "address",
    "description",
    "location",
    "services",
    "contacts",
    "working_hours",
    "medical_covers",
    "images",
    "category",
    "logo"
  ];

  console.log(updates)
  const isValidOperation = Object.keys(updates).every((key) => allowedUpdates.includes(key));

  if (!isValidOperation) {
    return res.status(400).json({ message: "Invalid updates!" });
  }

  try {
    // Hash password if it's being updated
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    // Handle logo and images
    if (req.files.logo) {
      updates.logo = req.files.logo[0].path; // Save logo path
    }
    if (req.files.images) {
      updates.images = req.files.images.map((file) => file.path); // Save image paths
    }

    const updateFacility = await Facility.findByIdAndUpdate(id, updates, { new: true });

    if (!updateFacility) {
      return res.status(404).json({ message: "Facility not found" });
    }

    res.status(200).json({ message: "Facility updated successfully", facility: updateFacility });
  } catch (err) {
    console.error("Error updating facility:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;